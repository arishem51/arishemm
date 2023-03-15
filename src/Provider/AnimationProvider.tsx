import { MotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useViewMove } from "../hooks/useViewMove";
import { AnimationType, PortfolioType, ScrollType, SetState } from "../types";

type AnimationDataContextProps = {
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  motionX: MotionValue<number>;
  motionY: MotionValue<number>;
  reverseViewX: number;
  reverseViewY: number;
  animationType: AnimationType;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setScrollState: SetState<ScrollType>;
  setIsAnimationSlideUpRunning: SetState<boolean>;
};

type PortfolioContextProps = {
  portfolio: PortfolioType | undefined;
};

type PreviousPortfolioContextProps = {
  previousPortfolio: PortfolioType | undefined;
};

type ScrollContextProps = {
  scrollState: ScrollType;
};

type AnimationRefContextProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  viewRef: React.RefObject<HTMLDivElement>;
};

type AnimationSlideUpContext = {
  isAnimationSlideUpRunning: boolean;
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

const PreviousPortfolioContext = createContext<PreviousPortfolioContextProps>(
  {} as PreviousPortfolioContextProps
);

const ScrollContext = createContext<ScrollContextProps>(
  {} as ScrollContextProps
);

const AnimationRefContext = createContext<AnimationRefContextProps>(
  {} as AnimationRefContextProps
);

const AnimationSlideUpContext = createContext<AnimationSlideUpContext>(
  {} as AnimationSlideUpContext
);

type Props = {
  children: React.ReactNode;
};

export const useAnimationDataProvider = () => useContext(AnimationDataContext);
export const useAnimationAPIProvider = () => useContext(AnimationAPIContext);
export const usePortfolioProvider = () => useContext(PortfolioContext);
export const usePreviousPortfolioProvider = () =>
  useContext(PreviousPortfolioContext);
export const useScrollProvider = () => useContext(ScrollContext);
export const useAnimationRefProvider = () => useContext(AnimationRefContext);
export const useAnimationSlideUpProvider = () =>
  useContext(AnimationSlideUpContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const previousPortfolio = usePrevious<PortfolioType | undefined>(portfolio);
  const [animationType, setAnimationType] = useState<AnimationType>("expand");
  const [isAnimationSlideUpRunning, setIsAnimationSlideUpRunning] =
    useState(false);
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
    motionX,
    motionY,
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
      motionX,
      motionY,
    };
  }, [
    animationType,
    motionX,
    motionY,
    reverseViewX,
    reverseViewY,
    viewX,
    viewY,
  ]);

  const animationAPIValue = useMemo<AnimationAPIContextProps>(() => {
    return {
      setAnimationType,
      setScrollState,
      setPortfolio,
      setIsAnimationSlideUpRunning,
    };
  }, []);

  const portfolioValue = useMemo<PortfolioContextProps>(() => {
    return {
      portfolio,
    };
  }, [portfolio]);

  const previousPortfolioValue = useMemo<PreviousPortfolioContextProps>(() => {
    return {
      previousPortfolio,
    };
  }, [previousPortfolio]);

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

  const animationSlideUpValue = useMemo(() => {
    return {
      isAnimationSlideUpRunning,
    };
  }, [isAnimationSlideUpRunning]);

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <PreviousPortfolioContext.Provider value={previousPortfolioValue}>
          <ScrollContext.Provider value={scrollValue}>
            <AnimationRefContext.Provider value={refValue}>
              <AnimationSlideUpContext.Provider value={animationSlideUpValue}>
                <AnimationAPIContext.Provider value={animationAPIValue}>
                  {children}
                </AnimationAPIContext.Provider>
              </AnimationSlideUpContext.Provider>
            </AnimationRefContext.Provider>
          </ScrollContext.Provider>
        </PreviousPortfolioContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
