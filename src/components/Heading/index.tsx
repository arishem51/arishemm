import { motion, Variants, Transition } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { PortfolioType } from "../../types";

const Wrapper = styled(motion.h1)`
  position: relative;
  left: 50%;

  display: inline-block;

  font-family: "Rampart One", cursive;

  cursor: pointer;
  mix-blend-mode: difference;
`;

type Props = {
  onClick?: () => void;
  portfolio: PortfolioType | undefined;
  children?: React.ReactNode;
  className?: string;
};

const variants: Variants = {
  initial: {
    top: "50%",
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    fontSize: "7em",
    color: "var(--color-black)",
  },
  animate: (custom: boolean) => {
    return custom
      ? {
          top: "1rem",
          zIndex: 3,
          transform: "translate(-50%, 0)",
          fontSize: "3.2em",
          color: "var(--color-white)",
        }
      : {};
  },
};

const transition: Transition = {
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

const Heading = ({ children, onClick, portfolio, ...props }: Props) => {
  return (
    <Wrapper
      {...props}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={transition}
      custom={!!portfolio}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
