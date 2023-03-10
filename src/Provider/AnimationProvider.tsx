import { MotionValue } from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import { createContext } from "react";
import { useViewMove } from "../hooks/useViewMove";
import { AnimationType, PortfolioType, SetState } from "../types";

type AnimationProviderProsp = {
  viewRef: React.RefObject<HTMLDivElement>;
  viewX: MotionValue<number>;
  viewY: MotionValue<number>;
  contentRef: React.RefObject<HTMLDivElement>;
  reverseViewX: number;
  reverseViewY: number;
  portfolio: PortfolioType | undefined;
  setPortfolio: SetState<PortfolioType | undefined>;
  animationType: AnimationType;
  setAnimationType: SetState<AnimationType>;
  previousPortfolio: PortfolioType | undefined;
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
  const previousPortfolio = usePrevious(portfolio);
  const [animationType, setAnimationType] =
    React.useState<AnimationType>("expand");

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

  const value = {
    viewRef,
    viewX,
    viewY,
    contentRef,
    reverseViewX,
    reverseViewY,
    portfolio,
    setPortfolio,
    animationType,
    setAnimationType,
    previousPortfolio,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

function usePrevious(value: PortfolioType | undefined) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<PortfolioType | undefined>();
  // Store current value in ref
  useEffect(() => {
    if (value) {
      ref.current = value;
    }
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
