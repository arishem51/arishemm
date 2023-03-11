import {
  cubicBezier,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React from "react";
import { timeOut } from "../helpers";
import { useAnimationProvider } from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";

const transition: Transition = {
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

type Props = {
  width: string;
  height: string;
  left: string;
  top: string;
  name: PortfolioType;
};

export function usePortfolioAnimation({
  width,
  height,
  left,
  top,
  name,
}: Props) {
  const {
    portfolio,
    previousPortfolio,
    reverseViewX,
    reverseViewY,
    animationType,
  } = useAnimationProvider();
  const animationControls = useAnimationControls();

  const variants: Variants = React.useMemo(() => {
    return {
      initial: {
        top,
        left,
        zIndex: 1,

        width,
        height,
        padding: ".7em",

        background: "rgba(255,255,255,0)",
        overflow: "hidden scroll",

        transition,
        scale: 1,
        transformOrigin: "center center",
      },
      expand: {
        top: reverseViewY,
        left: reverseViewX,
        zIndex: 3,

        width: window.innerWidth,
        height: window.innerHeight,

        background: "rgb(242,240,233)",
      },

      slideUp: {
        top: reverseViewY,
        transition: {
          delay: 0.4,
          ease: cubicBezier(0.3, 0.7, 0.3, 0.8),
          duration: 0.4,
        },
      },

      setBeforeSlideUp: {
        top: reverseViewY + window.innerHeight,
        left: reverseViewX,
        zIndex: 4,

        width: window.innerWidth,
        height: window.innerHeight,
        background: "rgb(242,240,233)",
      },

      scaleDown: {
        zIndex: 2,

        scale: 0.85,
        transformOrigin: "center bottom",
        transition: {
          ease: cubicBezier(0.3, 0.7, 0.3, 0.8),
          duration: 0.4,
        },
      },
    };
  }, [height, left, reverseViewX, reverseViewY, top, width]);

  React.useEffect(() => {
    if (animationType === "expand") {
      if (portfolio === name) {
        animationControls.start("expand");
      } else if (previousPortfolio === name) {
        animationControls.start("initial");
      }
    } else if (animationType === "slideUp") {
      if (portfolio === name) {
        animationControls.stop();

        if (portfolio === "about") {
          console.log("setBeforeSlideUp");
        }

        animationControls.set("setBeforeSlideUp");
        animationControls.start("slideUp");
      } else if (previousPortfolio === name) {
        animationControls.start("scaleDown").then(async () => {
          await timeOut(500);
          animationControls.set("initial");
        });
      }
    }
  }, [animationControls, animationType, name, portfolio, previousPortfolio]);

  // useMotionValueEvent(animationControls, 'change', e => {

  // })

  return {
    animationControls,
    variants,
  };
}
