import { MotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useViewMove } from "../hooks/useViewMove";
import { AnimationType, PortfolioType, ScrollType, SetState } from "../types";

type AnimationDataContextProps = {
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  reverseViewX: number;
  reverseViewY: number;
  animationType: AnimationType;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setScrollState: SetState<ScrollType>;
};

type PortfolioContextProps = {
  portfolio: PortfolioType | undefined;
  previousPortfolio: PortfolioType | undefined;
};

type ScrollContextProps = {
  scrollState: ScrollType;
};

type AnimationRefContextProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  viewRef: React.RefObject<HTMLDivElement>;
};

const AnimationDataContext = createContext<AnimationDataContextProps>(
  {} as AnimationDataContextProps
);

const AnimationAPIContext = createContext<AnimationAPIContextProps>(
  {} as AnimationAPIContextProps
);

const PortfolioContext = createContext<PortfolioContextProps>(
  {} as PortfolioContextProps
);

const ScrollContext = createContext<ScrollContextProps>(
  {} as ScrollContextProps
);

const AnimationRefContext = createContext<AnimationRefContextProps>(
  {} as AnimationRefContextProps
);

type Props = {
  children: React.ReactNode;
};

export const useAnimationDataProvider = () => useContext(AnimationDataContext);
export const useAnimationAPIProvider = () => useContext(AnimationAPIContext);
export const usePortfolioProvider = () => useContext(PortfolioContext);
export const useScrollProvider = () => useContext(ScrollContext);
export const useAnimationRefProvider = () => useContext(AnimationRefContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const previousPortfolio = usePrevious<PortfolioType | undefined>(portfolio);
  const [animationType, setAnimationType] = useState<AnimationType>("expand");
  const [scrollState, setScrollState] = useState<ScrollType>("initial");

  const {
    viewRef,
    viewX,
    viewY,
    contentRef,
    reverseViewX,
    reverseViewY,
    removeViewMoveEvent,
    addViewMoveEvent,
  } = useViewMove();

  useEffect(() => {
    if (portfolio) {
      removeViewMoveEvent();
      return;
    }
    addViewMoveEvent();
    return () => {
      removeViewMoveEvent();
    };
  }, [addViewMoveEvent, portfolio, removeViewMoveEvent]);

  const animationDataValue = useMemo<AnimationDataContextProps>(() => {
    return {
      viewX,
      viewY,
      reverseViewX,
      reverseViewY,
      animationType,
    };
  }, [animationType, reverseViewX, reverseViewY, viewX, viewY]);

  const animationAPIValue = useMemo<AnimationAPIContextProps>(() => {
    return {
      setAnimationType,
      setScrollState,
      setPortfolio,
    };
  }, []);

  const portfolioValue = useMemo<PortfolioContextProps>(() => {
    return {
      portfolio,
      previousPortfolio,
    };
  }, [portfolio, previousPortfolio]);

  const scrollValue = useMemo<ScrollContextProps>(() => {
    return {
      scrollState,
    };
  }, [scrollState]);

  const refValue = useMemo<AnimationRefContextProps>(() => {
    return {
      viewRef,
      contentRef,
    };
  }, [contentRef, viewRef]);

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <ScrollContext.Provider value={scrollValue}>
          <AnimationRefContext.Provider value={refValue}>
            <AnimationAPIContext.Provider value={animationAPIValue}>
              {children}
            </AnimationAPIContext.Provider>
          </AnimationRefContext.Provider>
        </ScrollContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
