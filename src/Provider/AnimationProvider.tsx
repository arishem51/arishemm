import { MotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useHandleViewMove } from "../hooks/useHandleViewMove";
import { AnimationType, PortfolioType, SetState } from "../types";

type AnimationDataContextProps = {
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  motionX: MotionValue<number>;
  motionY: MotionValue<number>;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setIsAnimationRunning: SetState<boolean>;
};

type PortfolioContextProps = {
  portfolio: PortfolioType | undefined;
};

type PreviousPortfolioContextProps = {
  previousPortfolio: PortfolioType | undefined;
};

type AnimationRefContextProps = {
  contentRef: React.RefObject<HTMLDivElement>;
  viewRef: React.RefObject<HTMLDivElement>;
};

type AnimationRunningContext = {
  isAnimationRunning: boolean;
};

type AnimationTypeContextProps = {
  animationType: AnimationType;
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

const AnimationRefContext = createContext<AnimationRefContextProps>(
  {} as AnimationRefContextProps
);

const AnimationRunningContext = createContext<AnimationRunningContext>(
  {} as AnimationRunningContext
);

const AnimationTypeContext = createContext<AnimationTypeContextProps>(
  {} as AnimationTypeContextProps
);

type Props = {
  children: React.ReactNode;
};

export const useAnimationDataProvider = () => useContext(AnimationDataContext);
export const useAnimationAPIProvider = () => useContext(AnimationAPIContext);
export const usePortfolioProvider = () => useContext(PortfolioContext);
export const usePreviousPortfolioProvider = () =>
  useContext(PreviousPortfolioContext);
export const useAnimationRefProvider = () => useContext(AnimationRefContext);
export const useAnimationRunningProvider = () =>
  useContext(AnimationRunningContext);
export const useAnimationTypeProvider = () => useContext(AnimationTypeContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const previousPortfolio = usePrevious<PortfolioType | undefined>(portfolio);
  const [animationType, setAnimationType] = useState<AnimationType>("expand");
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const handleViewMoveMemo = useMemo(() => ({ portfolio }), [portfolio]);

  useEffect(() => {
    console.log(isAnimationRunning);
  }, [isAnimationRunning]);

  const { viewRef, viewX, viewY, contentRef, motionX, motionY } =
    useHandleViewMove(handleViewMoveMemo);

  const animationDataValue = useMemo<AnimationDataContextProps>(() => {
    return {
      viewX,
      viewY,
      motionX,
      motionY,
    };
  }, [motionX, motionY, viewX, viewY]);

  const animationAPIValue = useMemo<AnimationAPIContextProps>(() => {
    return {
      setAnimationType,
      setPortfolio,
      setIsAnimationRunning,
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

  const refValue = useMemo<AnimationRefContextProps>(() => {
    return {
      viewRef,
      contentRef,
    };
  }, [contentRef, viewRef]);

  const animationRunningValue = useMemo(() => {
    return {
      isAnimationRunning,
    };
  }, [isAnimationRunning]);

  const animationTypeValue = useMemo(() => {
    return {
      animationType,
    };
  }, [animationType]);

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <PreviousPortfolioContext.Provider value={previousPortfolioValue}>
          <AnimationRefContext.Provider value={refValue}>
            <AnimationRunningContext.Provider value={animationRunningValue}>
              <AnimationTypeContext.Provider value={animationTypeValue}>
                <AnimationAPIContext.Provider value={animationAPIValue}>
                  {children}
                </AnimationAPIContext.Provider>
              </AnimationTypeContext.Provider>
            </AnimationRunningContext.Provider>
          </AnimationRefContext.Provider>
        </PreviousPortfolioContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
