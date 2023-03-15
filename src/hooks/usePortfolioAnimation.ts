import {
  cubicBezier,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, { RefObject, useEffect, useState } from "react";
import { timeOut } from "../helpers";
import {
  useAnimationAPIProvider,
  useAnimationDataProvider,
  useAnimationRefProvider,
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
  ref: RefObject<HTMLElement>;
};

export function usePortfolioAnimation({
  width,
  height,
  left,
  top,
  name,
}: Props) {
  const { reverseViewX, reverseViewY, animationType, motionX, motionY } =
    useAnimationDataProvider();
  const { portfolio } = usePortfolioProvider();
  const { contentRef } = useAnimationRefProvider();
  const { setIsAnimationSlideUpRunning } = useAnimationAPIProvider();
  const { previousPortfolio } = usePreviousPortfolioProvider();
  const animationControls = useAnimationControls();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (portfolio === name) {
      setOffset({
        x: motionX.get() * -1,
        y: motionY.get() * -1,
      });
    } else {
      setOffset({
        x: 0,
        y: 0,
      });
    }
  }, [name, portfolio, motionX, motionY]);

  useEffect(() => {
    if (portfolio === name && (offset.x > 0 || offset.y > 0)) {
      const x =
        (+left.slice(0, -1) * (contentRef?.current?.clientWidth || 0)) / 100 -
        offset.x;
      const y =
        (+top.slice(0, -1) * (contentRef?.current?.clientHeight || 0)) / 100 -
        offset.y;
      setTranslate({ x, y });
    }
  }, [contentRef, left, name, offset, portfolio, top]);

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
    // Must include translate state to update translate item
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
