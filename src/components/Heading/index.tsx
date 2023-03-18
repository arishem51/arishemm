import {
  motion,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
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
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    fontSize: "7em",
    color: "var(--color-black)",
  },
  animateWhenHavePortfolio: {
    zIndex: 3,
    opacity: 1,
    transform: "translate(-50%, calc(-50% - 40vh))",
    fontSize: "3.2em",
    color: "var(--color-white)",
  },
  scrollDown: {
    opacity: 0,
  },
  setAfterScrollDown: {
    zIndex: 1,
  },
};

const Heading = ({ children, ...props }: Props) => {
  const controls = useAnimationControls();
  const { portfolio } = usePortfolioProvider();
  const { setAnimationType, setPortfolio } = useAnimationAPIProvider();
  const { isAnimationRunning } = useAnimationRunningProvider();
  const { scrollMotion } = usePorfolioScrollDataProvider();
  const [shouldVisible, setShouldVisible] = useState(true);

  useEffect(() => {
    // FIXME: Change portfolio will  cause this effect run 2 times need an solution
    if (scrollMotion && portfolio) {
      const unscribe = scrollMotion.on("change", (current) => {
        const previous = scrollMotion.getPrevious();
        if (current >= previous) {
          setShouldVisible(false);
        } else if (current === 0) {
          setShouldVisible(true);
        }
      });

      return () => {
        unscribe();
      };
    }
  }, [portfolio, scrollMotion]);

  const handleClick = useCallback(() => {
    if (!shouldVisible || isAnimationRunning) {
      return;
    }
    setPortfolio(undefined);
    setAnimationType("expand");
  }, [isAnimationRunning, setAnimationType, setPortfolio, shouldVisible]);

  React.useEffect(() => {
    if (portfolio) {
      if (shouldVisible) {
        controls.start("animateWhenHavePortfolio");
      } else {
        controls.start("scrollDown").then(() => {
          controls.set("setAfterScrollDown");
        });
      }
    } else {
      controls.start("initial");
    }
  }, [controls, portfolio, shouldVisible]);

  return (
    <Wrapper
      {...props}
      variants={variants}
      initial="initial"
      transition={transition}
      animate={controls}
      onClick={handleClick}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
