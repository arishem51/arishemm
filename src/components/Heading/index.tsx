import {
  cubicBezier,
  motion,
  Transition,
  useMotionValue,
  useTransform,
  useAnimate,
  EasingFunction,
} from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  useAnimationRunningProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";
import { usePortfolioScrollDataProvider } from "../../Provider/PortfolioScrollProvider";

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

const animation = {
  initial: {
    top: "50%",
    zIndex: 3,
    transform: "translate(-50%, -50%)",
    fontSize: "7em",
    color: "var(--color-black)",
    cursor: "default",
  },
  animateWhenHavePortfolio: {
    opacity: 1,
    transform: "translate(-50%, calc(-50% - 40vh))",
    fontSize: "3.2em",
    color: "var(--color-white)",
    cursor: "pointer",
  },
};

const transformOptions: { ease: EasingFunction | EasingFunction[] } = {
  ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
};

const Heading = ({ children, ...props }: Props) => {
  const portfolio = usePortfolioProvider();
  const [scope, animate] = useAnimate();
  const { setAnimationType, setPortfolio, setIsAnimationRunning } =
    useAnimationAPIProvider();
  const isAnimationRunning = useAnimationRunningProvider();
  const { scrollMotion } = usePortfolioScrollDataProvider();
  const motion = useMotionValue(0);

  const transformMotionValue = scrollMotion ? scrollMotion : motion;

  const opacity = useTransform(
    transformMotionValue,
    [0, 0.1],
    [1, 0],
    transformOptions
  );

  const zIndex = useTransform(
    transformMotionValue,
    [0, 0.1],
    [3, 1],
    transformOptions
  );

  const handleClick = () => {
    if (scrollMotion?.get() || 0 > 0 || isAnimationRunning) {
      return;
    }
    setPortfolio(undefined);
    setAnimationType("expand");
    setIsAnimationRunning(true);
  };

  useEffect(() => {
    const element = scope.current;
    if (portfolio) {
      animate(element, animation.animateWhenHavePortfolio, transition);
    }
    return () => {
      animate(element, animation.initial, transition);
    };
  }, [animate, portfolio, scope]);

  const style = { opacity, zIndex };

  return (
    <Wrapper
      {...props}
      initial={animation.initial}
      onClick={handleClick}
      style={style}
      ref={scope}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
