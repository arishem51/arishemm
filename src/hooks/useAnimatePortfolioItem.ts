import { cubicBezier, Transition, animate } from "framer-motion";
import React, { RefObject, useEffect, useMemo } from "react";
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
  ref: RefObject<HTMLDivElement>;
};

export function useAnimatePortfolioItem({
  width,
  height,
  left,
  top,
  name,
  ref,
}: Props) {
  const { motionX, motionY } = useAnimationDataProvider();
  const { animationType } = useAnimationTypeProvider();
  const { portfolio } = usePortfolioProvider();
  const { setIsAnimationRunning } = useAnimationAPIProvider();
  const { previousPortfolio } = usePreviousPortfolioProvider();
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

  const animation = React.useMemo(() => {
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
        zIndex: 4,
        y: -window.innerHeight,
      },

      setBeforeSlideUp: {
        top: motionY.get() * -1 + window.innerHeight,
        left: motionX.get() * -1,

        width: window.innerWidth,
        height: window.innerHeight,

        background: "rgb(242,240,233)",
        y: 0,

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
      fastDuration: {
        duration: 0.1,
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
    const element = ref.current;
    if (animationType === "expand" && portfolio === name && element) {
      const startExpandAnimation = async () => {
        await animate(element, animation.expand, transition);
        await animate(element, animation.enableScroll, animation.fastDuration);
        setIsAnimationRunning(false);
      };
      startExpandAnimation();
    }
  }, [
    animation,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    ref,
    setIsAnimationRunning,
  ]);

  useEffect(() => {
    const element = ref.current;
    if (animationType === "expand" && !portfolio && element) {
      const endExpandAnimation = async () => {
        await animate(element, animation.initialWithOutZIndex, transition);
        await animate(element, animation.lowZIndex, animation.fastDuration);
        setIsAnimationRunning(false);
      };
      endExpandAnimation();
    }
  }, [
    animation,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    ref,
    setIsAnimationRunning,
  ]);

  useEffect(() => {
    const element = ref.current;
    if (
      portfolio === name &&
      animationType === "slideUp" &&
      element &&
      portfolio !== previousPortfolio
    ) {
      const startSlideUpAnimation = async () => {
        // FIXME: infinite loop in onUpdate of setBeforeSlipdeUp animate
        await animate(
          element,
          animation.setBeforeSlideUp,
          animation.fastDuration
        );
        await animate(element, animation.slideUp, {
          delay: TIME / 1000,
          ...transition,
        });
        await animate(element, animation.enableScroll, animation.fastDuration);
        setIsAnimationRunning(false);
      };

      startSlideUpAnimation();
    }
  }, [
    animation,
    animationType,
    name,
    portfolio,
    previousPortfolio,
    ref,
    setIsAnimationRunning,
  ]);

  useEffect(() => {
    const element = ref.current;
    if (
      previousPortfolio === name &&
      portfolio !== previousPortfolio &&
      animationType === "slideUp" &&
      element
    ) {
      const endAnimationSlideUp = async () => {
        await animate(element, animation.setBeforeScaleDown, {
          duration: 0,
        });
        await animate(element, animation.scaleDown, transition);
        await timeOut(TIME);
        animate(element, animation.initial, animation.fastDuration);
      };

      endAnimationSlideUp();
    }
  }, [animation, animationType, name, portfolio, previousPortfolio, ref]);

  return {
    animation,
  };
}