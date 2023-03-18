import {
  cubicBezier,
  motion,
  Transition,
  useAnimationControls,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  useAnimationRunningProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";
import { usePorfolioScrollDataProvider } from "../../Provider/PortfolioScrollProvider";

const Wrapper = styled(motion.h1)`
  position: relative;
  left: 50%;

  display: inline-block;

  font-family: "Rampart One", cursive;
  font-weight: bolder;

  cursor: pointer;
  mix-blend-mode: difference;
`;

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const transition: Transition = {
  duration: 0.6,
  ease: "linear",
};

const variants: Variants = {
  initial: {
    top: "50%",
    zIndex: 3,
    transform: "translate(-50%, -50%)",
    fontSize: "7em",
    color: "var(--color-black)",
  },
  animateWhenHavePortfolio: {
    opacity: 1,
    transform: "translate(-50%, calc(-50% - 40vh))",
    fontSize: "3.2em",
    color: "var(--color-white)",
  },
};

const Heading = ({ children, ...props }: Props) => {
  const controls = useAnimationControls();
  const { portfolio } = usePortfolioProvider();
  const { setAnimationType, setPortfolio } = useAnimationAPIProvider();
  const { isAnimationRunning } = useAnimationRunningProvider();
  const { scrollMotion } = usePorfolioScrollDataProvider();
  const motion = useMotionValue(0);

  const opacity = useTransform(
    scrollMotion ? scrollMotion : motion,
    [0, 0.1],
    [1, 0],
    { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) }
  );

  const zIndex = useTransform(
    scrollMotion ? scrollMotion : motion,
    [0, 0.1],
    [3, 1],
    { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) }
  );

  const handleClick = useCallback(() => {
    if (scrollMotion?.get() || 0 > 0 || isAnimationRunning) {
      return;
    }
    setPortfolio(undefined);
    setAnimationType("expand");
  }, [isAnimationRunning, scrollMotion, setAnimationType, setPortfolio]);

  useEffect(() => {
    if (portfolio) {
      controls.start("animateWhenHavePortfolio");
    } else {
      controls.start("initial");
    }
  }, [controls, portfolio]);

  const style = useMemo(() => ({ opacity, zIndex }), [opacity, zIndex]);

  return (
    <Wrapper
      {...props}
      variants={variants}
      initial="initial"
      transition={transition}
      animate={controls}
      onClick={handleClick}
      style={style}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
