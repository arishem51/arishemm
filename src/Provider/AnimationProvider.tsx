import { MotionValue } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { useViewMove } from "../hooks/useViewMove";
import { AnimationType, PortfolioType, SetState } from "../types";

type AnimationDataContextProps = {
  viewRef: React.RefObject<HTMLDivElement>;
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  contentRef: React.RefObject<HTMLDivElement>;
  reverseViewX: number;
  reverseViewY: number;
  animationType: AnimationType;
  previousPortfolio: PortfolioType | undefined;
  isScrollUp: boolean;
};

type AnimationAPIContextProps = {
  setPortfolio: SetState<PortfolioType | undefined>;
  setAnimationType: SetState<AnimationType>;
  setIsScrollUp: SetState<boolean>;
};

type PortfolioContextProps = {
  portfolio: PortfolioType | undefined;
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

type Props = {
  children: React.ReactNode;
};

export const useAnimationData = () => useContext(AnimationDataContext);
export const useAnimationAPI = () => useContext(AnimationAPIContext);
export const usePortfolio = () => useContext(PortfolioContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = useState<PortfolioType>();
  const previousPortfolio = usePrevious<PortfolioType | undefined>(portfolio);
  const [animationType, setAnimationType] = useState<AnimationType>("expand");
  const [isScrollUp, setIsScrollUp] = useState(true);

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

  const animationDataValue = {
    viewRef,
    viewX,
    viewY,
    contentRef,
    reverseViewX,
    reverseViewY,
    animationType,
    previousPortfolio,
    isScrollUp,
  };

  const animationAPIValue = useMemo(() => {
    return {
      setAnimationType,
      setIsScrollUp,
      setPortfolio,
    };
  }, []);

  const portfolioValue = {
    portfolio,
  };

  return (
    <AnimationDataContext.Provider value={animationDataValue}>
      <PortfolioContext.Provider value={portfolioValue}>
        <AnimationAPIContext.Provider value={animationAPIValue}>
          {children}
        </AnimationAPIContext.Provider>
      </PortfolioContext.Provider>
    </AnimationDataContext.Provider>
  );
}
