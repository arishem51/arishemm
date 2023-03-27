import { MotionValue } from "framer-motion";
import { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useHandleViewMove } from "../hooks/useHandleViewMove";
import { AnimationType, Dimensions, PortfolioType, SetState } from "../types";

type AnimationDataContextProps = {
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  motionX: MotionValue<number>;
  motionY: MotionValue<number>;
  contentRef: React.RefObject<HTMLDivElement>;
  viewRef: React.RefObject<HTMLDivElement>;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setIsAnimationRunning: SetState<boolean>;
};

type PortfolioContextProps = PortfolioType | undefined;

type PreviousPortfolioContextProps = {
  previousPortfolio: PortfolioType | undefined;
};

type AnimationRunningContext = {
  isAnimationRunning: boolean;
};

type AnimationTypeContextProps = {
  animationType: AnimationType;
};

type ContentTypeContextProps = {
  content: Dimensions;
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

const AnimationRunningContext = createContext<AnimationRunningContext>(
  {} as AnimationRunningContext
);

const AnimationTypeContext = createContext<AnimationTypeContextProps>(
  {} as AnimationTypeContextProps
);

const ContentContext = createContext<ContentTypeContextProps>(
  {} as ContentTypeContextProps
);

type Props = {
  children: React.ReactNode;
};

export const useAnimationDataProvider = () => useContext(AnimationDataContext);
export const useAnimationAPIProvider = () => useContext(AnimationAPIContext);
export const usePortfolioProvider = () => useContext(PortfolioContext);
export const usePreviousPortfolioProvider = () =>
  useContext(PreviousPortfolioContext);
export const useAnimationRunningProvider = () =>
  useContext(AnimationRunningContext);
export const useAnimationTypeProvider = () => useContext(AnimationTypeContext);
export const useContentProvider = () => useContext(ContentContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const previousPortfolio = usePrevious<PortfolioType | undefined>(portfolio);
  const [animationType, setAnimationType] = useState<AnimationType>("expand");
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const { viewRef, viewX, viewY, contentRef, motionX, motionY, content } =
    useHandleViewMove({ portfolio });

  const animationDataValue = useMemo<AnimationDataContextProps>(() => {
    return {
      viewX,
      viewY,
      motionX,
      motionY,
      viewRef,
      contentRef,
    };
  }, [contentRef, motionX, motionY, viewRef, viewX, viewY]);

  const animationAPIValue = useMemo<AnimationAPIContextProps>(() => {
    return {
      setAnimationType,
      setPortfolio,
      setIsAnimationRunning,
    };
  }, []);

  const previousPortfolioValue = useMemo<PreviousPortfolioContextProps>(() => {
    return {
      previousPortfolio,
    };
  }, [previousPortfolio]);

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

  const contentValue = useMemo(() => {
    return {
      content,
    };
  }, [content]);

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolio}>
        <PreviousPortfolioContext.Provider value={previousPortfolioValue}>
          <AnimationRunningContext.Provider value={animationRunningValue}>
            <AnimationTypeContext.Provider value={animationTypeValue}>
              <ContentContext.Provider value={contentValue}>
                <AnimationAPIContext.Provider value={animationAPIValue}>
                  {children}
                </AnimationAPIContext.Provider>
              </ContentContext.Provider>
            </AnimationTypeContext.Provider>
          </AnimationRunningContext.Provider>
        </PreviousPortfolioContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
