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
  useAnimationRefProvider,
  useAnimationTypeProvider,
  usePortfolioProvider,
  usePreviousPortfolioProvider,
} from "../Provider/AnimationProvider";
import { PortfolioType } from "../types";

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
  const { contentRef } = useAnimationRefProvider();

  const {
    x: translateX,
    y: translateY,
    percentageHeight,
    percentageWidth,
  } = useMemo(() => {
    const offsetX = motionX.get() * -1;
    const offsetY = motionY.get() * -1;
    if (portfolio === name && (offsetX > 0 || offsetY > 0)) {
      // Get the offset  of the item related to the contentRef

      const x =
        (+left.slice(0, -1) * (contentRef?.current?.clientWidth || 0)) / 100 -
        offsetX;
      const y =
        (+top.slice(0, -1) * (contentRef?.current?.clientHeight || 0)) / 100 -
        offsetY;

      const percentageWidth =
        (window.innerWidth / (contentRef?.current?.clientWidth || 0)) * 100 +
        "%";
      const percentageHeight =
        (window.innerHeight / (contentRef?.current?.clientHeight || 0)) * 100 +
        "%";

      return {
        x,
        y,
        percentageWidth,
        percentageHeight,
      };
    }
    return {
      x: 0,
      y: 0,
      percentageWidth: width,
      percentageHeight: height,
    };
  }, [contentRef, height, left, motionX, motionY, name, portfolio, top, width]);

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
        x: portfolio === name ? -translateX : 0,
        y: portfolio === name ? -translateY : 0,
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
    translateX,
    translateY,
    width,
  ]);

  useEffect(() => {
    // Expand goes here
    if (animationType === "expand") {
      if (portfolio === name) {
        animationControls.start("expand", transition).then(() => {
          animationControls.set("enableScroll");
          setIsAnimationRunning(false);
        });
      } else if (previousPortfolio === name) {
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
            animationControls.set("enableScroll");
            setIsAnimationRunning(false);
          });
      } else if (
        previousPortfolio === name &&
        portfolio !== previousPortfolio
      ) {
        animationControls.set("setBeforeScaleDown");
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
