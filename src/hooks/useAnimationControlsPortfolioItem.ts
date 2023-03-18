import {
  cubicBezier,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, { useEffect, useMemo } from "react";
import { timeOut } from "../helpers";
import {
  useAnimationAPIProvider,
  useAnimationDataProvider,
  useAnimationTypeProvider,
  usePortfolioProvider,
  usePreviousPortfolioProvider,
} from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";
import { useCalculatePortfolioItem } from "./useCalculatePortfolioItem";

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
  const { motionX, motionY } = useAnimationDataProvider();
  const { animationType } = useAnimationTypeProvider();
  const { portfolio } = usePortfolioProvider();
  const { setIsAnimationRunning } = useAnimationAPIProvider();
  const { previousPortfolio } = usePreviousPortfolioProvider();
  const animationControls = useAnimationControls();

  const calculateValue = useMemo(
    () => ({ name, left, top, width, height }),
    [height, left, name, top, width]
  );
  const { translate, percentageHeight, percentageWidth } =
    useCalculatePortfolioItem(calculateValue);

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
        overflow: "hidden",

        transition,
        scale: 1,
        transformOrigin: "center center",
      },
      initialWithOutZIndex: {
        top,
        left,

        x: 0,
        y: 0,

        width,
        height,
        padding: ".7em",

        background: "rgba(255,255,255,0)",
        overflow: "hidden",

        transition,
        scale: 1,
        transformOrigin: "center center",
      },
      expand: {
        x: portfolio === name ? -translate.x : 0,
        y: portfolio === name ? -translate.y : 0,
        zIndex: 3,

        width: percentageWidth,
        height: percentageHeight,

        background: "rgb(242,240,233)",
      },

      slideUp: {
        y: -window.innerHeight,
      },

      setBeforeSlideUp: {
        top: motionY.get() * -1 + window.innerHeight,
        left: motionX.get() * -1,
        zIndex: 4,

        width: window.innerWidth,
        height: window.innerHeight,

        background: "rgb(242,240,233)",

        overflow: "hidden",
      },

      setBeforeScaleDown: {
        overflow: "hidden",
        transformOrigin: "center bottom",
      },

      scaleDown: {
        zIndex: 2,
        scale: 0.85,
      },
      enableScroll: {
        overflow: "hidden scroll",
      },
      lowZIndex: {
        zIndex: 1,
      },
    };
  }, [
    height,
    left,
    motionX,
    motionY,
    name,
    percentageHeight,
    percentageWidth,
    portfolio,
    top,
    translate,
    width,
  ]);

  useEffect(() => {
    // Expand goes here
    if (animationType === "expand") {
      if (portfolio === name) {
        setIsAnimationRunning(true);
        animationControls.start("expand", transition).then(() => {
          animationControls.set("enableScroll");
          setIsAnimationRunning(false);
        });
      } else if (previousPortfolio === name) {
        setIsAnimationRunning(true);
        animationControls.start("initialWithOutZIndex", transition).then(() => {
          animationControls.set("lowZIndex");
          setIsAnimationRunning(false);
        });
      }
    }
  }, [
    animationControls,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    setIsAnimationRunning,
    translate,
  ]);

  useEffect(() => {
    // Slide Up goes here
    if (animationType === "slideUp") {
      if (portfolio === name && portfolio !== previousPortfolio) {
        animationControls.set("setBeforeSlideUp");
        animationControls
          .start("slideUp", {
            delay: TIME / 1000, // seconds,
            ...transition,
          })
          .then(() => {
            setIsAnimationRunning(false);
            animationControls.set("enableScroll");
          });
      } else if (
        previousPortfolio === name &&
        portfolio !== previousPortfolio
      ) {
        animationControls.set("setBeforeScaleDown");
        setIsAnimationRunning(true);
        animationControls.start("scaleDown", transition).then(async () => {
          await timeOut(TIME);
          animationControls.set("initial");
        });
      }
    }
  }, [
    animationControls,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    setIsAnimationRunning,
  ]);

  return {
    animationControls,
    variants,
  };
}
