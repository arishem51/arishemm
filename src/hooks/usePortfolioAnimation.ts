import { cubicBezier, Transition, useAnimationControls } from "framer-motion";
import React from "react";
import { timeOut } from "../helpers";
import { AnimationType, PortfolioType } from "../types";

const transition: Transition = {
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

type Props = {
  width: string;
  height: string;
  left: string;
  top: string;
  reverseViewX: number;
  reverseViewY: number;
  name: PortfolioType;
  animationType: AnimationType;
  portfolio: PortfolioType | undefined;
  previousPortfolio: PortfolioType | undefined;
};

export function usePortfolioAnimation({
  width,
  height,
  left,
  reverseViewX,
  reverseViewY,
  name,
  animationType,
  portfolio,
  previousPortfolio,
  top,
}: Props) {
  const animationControls = useAnimationControls();

  const initial = React.useMemo(() => {
    return {
      width,
      height,
      left,
      top,
      background: "rgba(255,255,255,0)",
      padding: ".7em",
      zIndex: 2,
      overflow: "hidden scroll",
      transition,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "center",
    };
  }, [height, left, top, width]);

  const animationExpand = React.useMemo(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      left: reverseViewX,
      top: reverseViewY,
      background: "rgb(242,240,233)",
      padding: ".7em",
      zIndex: 3,
      overflow: "hidden scroll",
      transition,
    };
  }, [reverseViewX, reverseViewY]);

  const animationSlideUp = React.useMemo(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      top: reverseViewY + window.innerHeight,
      left: reverseViewX,
      zIndex: 4,
      overflow: "hidden scroll",
      scaleX: 1,
      scaleY: 1,
      transition,
      transformOrigin: "center",
    };
  }, [reverseViewX, reverseViewY]);

  React.useEffect(() => {
    if (animationType === "expand") {
      if (portfolio === name) {
        // Portfolio is active will run this animation
        animationControls.start(animationExpand);
      } else if (previousPortfolio === name) {
        // Portfolio was active run this aniamtion
        animationControls.start(initial);
      }
    } else {
      // AnimationType === 'slideUp '

      if (portfolio === name) {
        // Portfolio is active will run this animation

        // Reset previous if click too fast
        animationControls.stop();

        animationControls.set({
          width: window.innerWidth,
          height: window.innerHeight,
          top: reverseViewY + window.innerHeight,
          left: reverseViewX,
          zIndex: 4,
          overflow: "hidden scroll",
          scaleX: 1,
          scaleY: 1,
          transition,
          transformOrigin: "center",
        });

        animationControls.start({
          width: window.innerWidth,
          height: window.innerHeight,
          left: reverseViewX,
          top: reverseViewY,
          background: "rgb(242,240,233)",
          padding: ".7em",
          overflow: "hidden scroll",
          zIndex: 4,
          transition: {
            delay: 0.4,
            duration: 0.4,
            ease: cubicBezier(0.3, 0.7, 0.3, 0.8),
          },
        });
      } else if (previousPortfolio === name) {
        // Portfolio was active run this aniamtion
        animationControls
          .start({
            ...animationExpand,
            scaleY: 0.9,
            scaleX: 0.95,
            transformOrigin: "bottom",
            transition: {
              ease: cubicBezier(0.3, 0.7, 0.3, 0.8),
              duration: 0.4,
            },
          })
          .then(async () => {
            await timeOut(500);
            animationControls.set(initial);
          });
      }
    }
  }, [
    animationControls,
    animationExpand,
    animationSlideUp,
    animationType,
    initial,
    name,
    portfolio,
    previousPortfolio,
    reverseViewX,
    reverseViewY,
  ]);
  return {
    initial,
    animationControls,
  };
}
