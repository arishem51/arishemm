import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const Text = styled(motion.h1)`
  position: fixed;

  bottom: 2em;
  right: 3em;

  color: var(--color-black);
  font-size: 2em;
`;

const textVariants: Variants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    y: "40%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: "-40%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

type Props = {
  children?: React.ReactNode;
};

export default function TextHover({ children }: Props) {
  return (
    <Text variants={textVariants} initial="hidden" animate="enter" exit="exit">
      {children}
    </Text>
  );
}
