import {
  cubicBezier,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React from "react";
import { timeOut } from "../helpers";
import { useAnimationData, usePortfolio } from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";

const transition: Transition = {
  ease: cubicBezier(0.3, 0.7, 0.3, 0.8),
  duration: 0.4,
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
  const { previousPortfolio, reverseViewX, reverseViewY, animationType } =
    useAnimationData();
  const { portfolio } = usePortfolio();
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
      },

      setBeforeSlideUp: {
        top: reverseViewY + window.innerHeight,
        left: reverseViewX,
        zIndex: 4,

        width: window.innerWidth,
        height: window.innerHeight,
        background: "rgb(242,240,233)",
      },

      setBeforeScaleDown: {
        transformOrigin: "50% 100%",
      },

      scaleDown: {
        zIndex: 2,
        scale: 0.85,
      },
    };
  }, [height, left, reverseViewX, reverseViewY, top, width]);

  React.useEffect(() => {
    if (animationType === "expand") {
      if (portfolio === name) {
        animationControls.start("expand", transition);
      } else if (previousPortfolio === name) {
        animationControls.start("initial", transition);
      }
    } else if (animationType === "slideUp") {
      if (portfolio === name && portfolio !== previousPortfolio) {
        animationControls.set("setBeforeSlideUp");
        animationControls.start("slideUp", {
          delay: 0.4,
          ...transition,
        });
      } else if (
        previousPortfolio === name &&
        portfolio !== previousPortfolio
      ) {
        animationControls.set("setBeforeScaleDown");
        animationControls.start("scaleDown", transition).then(async () => {
          await timeOut(500);
          animationControls.set("initial");
        });
      }
    }
  }, [animationControls, animationType, name, portfolio, previousPortfolio]);

  return {
    animationControls,
    variants,
  };
}
