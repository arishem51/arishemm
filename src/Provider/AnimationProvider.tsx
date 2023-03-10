import { MotionValue } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useViewMove } from "../hooks/useViewMove";
import { PortfolioType, SetState } from "../types";

type AnimationProviderProsp = {
  viewRef: React.RefObject<HTMLDivElement>;
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  contentRef: React.RefObject<HTMLDivElement>;
  reverseViewX: MotionValue<number>;
  reverseViewY: MotionValue<number>;
  portfolio: PortfolioType | undefined;
  setPortfolio: SetState<PortfolioType | undefined>;
};

const AnimationContext = createContext<AnimationProviderProsp>(
  {} as AnimationProviderProsp
);

type Props = {
  children: React.ReactNode;
};

export const useAnimationProvider = () => useContext(AnimationContext);

export default function AnimationProvider({ children }: Props) {
  const [portfolio, setPortfolio] = React.useState<PortfolioType>();

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
  }, [portfolio]);

  const value = {
    viewRef,
    viewX,
    viewY,
    contentRef,
    reverseViewX,
    reverseViewY,
    portfolio,
    setPortfolio,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
