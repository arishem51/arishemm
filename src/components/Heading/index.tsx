import {
  motion,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import React, { useCallback } from "react";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  usePortfolioProvider,
  useScrollProvider,
} from "../../Provider/AnimationProvider";

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
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

const variants: Variants = {
  initial: {
    top: "50%",
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    fontSize: "7em",
    color: "var(--color-black)",
  },
  portfolio: {
    top: "1rem",
    zIndex: 3,
    transform: "translate(-50%, 0)",
    fontSize: "3.2em",
    color: "var(--color-white)",
  },
  scrollUp: {
    opacity: 1,
  },
  scrollDown: {
    opacity: 0,
  },
  zIndexUp: {
    zIndex: 3,
  },
  zIndexDown: {
    zIndex: 1,
  },
};

const Heading = ({ children, ...props }: Props) => {
  const controls = useAnimationControls();
  const { portfolio } = usePortfolioProvider();
  const { setAnimationType, setPortfolio } = useAnimationAPIProvider();
  const { scrollState } = useScrollProvider();

  const handleClick = () => {
    if (scrollState !== "initial") {
      return;
    }
    setPortfolio(undefined);
    setAnimationType("expand");
  };

  React.useEffect(() => {
    if (portfolio) {
      controls.start("portfolio");
      if (scrollState === "initial") {
        controls.set("zIndexUp");
        controls.start("scrollUp");
      } else {
        controls.start("scrollDown").then(() => {
          controls.set("zIndexDown");
        });
      }
    } else {
      controls.start("initial");
    }
  }, [controls, portfolio, scrollState]);

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
