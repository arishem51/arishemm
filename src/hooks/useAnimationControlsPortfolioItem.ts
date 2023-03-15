import {
  cubicBezier,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, { useEffect } from "react";
import { timeOut } from "../helpers";
import {
  useAnimationAPIProvider,
  useAnimationDataProvider,
  usePortfolioProvider,
  usePreviousPortfolioProvider,
} from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";
import { useCalculatePortfolioItemTranslate } from "./useCalculatePortfolioItemTranslate";

const TIME = 750; // Miliseconds

const transition: Transition = {
  ease: cubicBezier(0.5, 0, 0.4, 1),
  duration: TIME / 1000, // Seconds,
};

type Props = {
  width: string;
  height: string;
  left: string;
  top: string;
  name: PortfolioType;
};

export function useAnimationControlsPortfolioItem({
  width,
  height,
  left,
  top,
  name,
}: Props) {
  const { reverseViewX, reverseViewY, animationType } =
    useAnimationDataProvider();
  const { portfolio } = usePortfolioProvider();
  const { setIsAnimationSlideUpRunning } = useAnimationAPIProvider();
  const { previousPortfolio } = usePreviousPortfolioProvider();
  const animationControls = useAnimationControls();

  const { translate } = useCalculatePortfolioItemTranslate({ name, left, top });

  const variants: Variants = React.useMemo(() => {
    return {
      initial: {
        top,
        left,
        zIndex: 1,

        x: 0,
        y: 0,

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
        x: portfolio === name ? -translate.x : 0,
        y: portfolio === name ? -translate.y : 0,
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
  }, [
    height,
    left,
    name,
    portfolio,
    reverseViewX,
    reverseViewY,
    top,
    translate.x,
    translate.y,
    width,
  ]);

  useEffect(() => {
    if (animationType === "expand") {
      if (portfolio === name) {
        animationControls.start("expand", transition);
      } else if (previousPortfolio === name) {
        animationControls.start("initial", transition);
      }
    }
  }, [
    animationControls,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    translate,
  ]);

  useEffect(() => {
    if (animationType === "slideUp") {
      if (portfolio === name && portfolio !== previousPortfolio) {
        animationControls.set("setBeforeSlideUp");
        animationControls.start("slideUp", {
          delay: TIME / 1000, // seconds,
          ...transition,
        });
      } else if (
        previousPortfolio === name &&
        portfolio !== previousPortfolio
      ) {
        animationControls.set("setBeforeScaleDown");
        animationControls.start("scaleDown", transition).then(async () => {
          await timeOut(TIME);
          animationControls.set("initial");
          setIsAnimationSlideUpRunning(false);
        });
      }
    }
  }, [
    animationControls,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    setIsAnimationSlideUpRunning,
  ]);

  return {
    animationControls,
    variants,
  };
}
