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
  animationType: AnimationType;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setScrollState: SetState<ScrollType>;
  setIsAnimationSlideUpRunning: SetState<boolean>;
  setShouldRenderOnboard: SetState<boolean>;
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

type OnboardContextProps = {
  shouldRenderOnboard: boolean;
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

const OnboardContext = createContext<OnboardContextProps>(
  {} as OnboardContextProps
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
export const useOnboardContextProvider = () => useContext(OnboardContext);

export default function AnimationProvider({ children }: Props) {
  const [shouldRenderOnboard, setShouldRenderOnboard] = useState(true);
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
    removeViewMoveEvent,
    addViewMoveEvent,
    motionX,
    motionY,
  } = useViewMove({ shouldRenderOnboard });

  useEffect(() => {
    if (portfolio) {
      removeViewMoveEvent();
      return;
    }
    addViewMoveEvent();
    return () => {
      removeViewMoveEvent();
    };
  }, [addViewMoveEvent, portfolio, removeViewMoveEvent, viewRef]);

  useEffect(() => {
    if (!shouldRenderOnboard) {
      addViewMoveEvent();
    }
  }, [addViewMoveEvent, shouldRenderOnboard]);

  const animationDataValue = useMemo<AnimationDataContextProps>(() => {
    return {
      viewX,
      viewY,
      animationType,
      motionX,
      motionY,
    };
  }, [animationType, motionX, motionY, viewX, viewY]);

  const animationAPIValue = useMemo<AnimationAPIContextProps>(() => {
    return {
      setAnimationType,
      setScrollState,
      setPortfolio,
      setIsAnimationSlideUpRunning,
      setShouldRenderOnboard,
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

  const onboardValue = useMemo(() => {
    return {
      shouldRenderOnboard,
    };
  }, [shouldRenderOnboard]);

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <PreviousPortfolioContext.Provider value={previousPortfolioValue}>
          <ScrollContext.Provider value={scrollValue}>
            <AnimationRefContext.Provider value={refValue}>
              <AnimationSlideUpContext.Provider value={animationSlideUpValue}>
                <OnboardContext.Provider value={onboardValue}>
                  <AnimationAPIContext.Provider value={animationAPIValue}>
                    {children}
                  </AnimationAPIContext.Provider>
                </OnboardContext.Provider>
              </AnimationSlideUpContext.Provider>
            </AnimationRefContext.Provider>
          </ScrollContext.Provider>
        </PreviousPortfolioContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
