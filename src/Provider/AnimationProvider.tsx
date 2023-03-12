import { MotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useViewMove } from "../hooks/useViewMove";
import { AnimationType, PortfolioType, ScrollType, SetState } from "../types";

type AnimationDataContextProps = {
  viewRef: React.RefObject<HTMLDivElement>;
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  contentRef: React.RefObject<HTMLDivElement>;
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

type Props = {
  children: React.ReactNode;
};

export const useAnimationData = () => useContext(AnimationDataContext);
export const useAnimationAPI = () => useContext(AnimationAPIContext);
export const usePortfolio = () => useContext(PortfolioContext);
export const useScrollProvider = () => useContext(ScrollContext);

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
      viewRef,
      viewX,
      viewY,
      contentRef,
      reverseViewX,
      reverseViewY,
      animationType,
    };
  }, [
    animationType,
    contentRef,
    reverseViewX,
    reverseViewY,
    viewRef,
    viewX,
    viewY,
  ]);

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

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <ScrollContext.Provider value={scrollValue}>
          <AnimationAPIContext.Provider value={animationAPIValue}>
            {children}
          </AnimationAPIContext.Provider>
        </ScrollContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
