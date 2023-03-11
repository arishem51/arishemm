import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { PortfolioType } from "../../types";

const Li = styled("li")`
  position: relative;

  padding: 0.8em 1.2em;
  border-radius: 2em;

  list-style-type: none;

  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: inherit;

  background: var(--color-background);
`;

const Text = styled(motion.h1)`
  position: relative;
  z-index: 2;

  color: var(--color-black);
  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;
`;

type Props = {
  children?: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

const variants: Variants = {
  hover: (custom) => {
    return {
      opacity: custom ? 1 : 0.6,
      transition: {
        duration: 0.3,
      },
    };
  },
  initial: {
    transition: {
      duration: 0.3,
    },
  },
  animate: (custom: boolean) => {
    return {
      color: custom ? "var(--color-white)" : "var(--color-black)",
    };
  },
};

const CHILDREN_COLORS: { [key in PortfolioType]: string } = {
  about: "var(--color-blue)",
  work: "var(--color-orange)",
  resume: "var(--color-brown-2)",
  experience: "var(--color-red)",
  contact: "var(--color-green)",
};

const ListItem = ({ children, active, onClick }: Props) => {
  const style = {
    "--color-background": CHILDREN_COLORS[children as PortfolioType],
  } as React.CSSProperties;

  return (
    <Li onClick={onClick}>
      <Text
        custom={active}
        animate="animate"
        variants={variants}
        initial="initial"
        whileHover="hover"
      >
        {children}
      </Text>
      {active && <Overlay layoutId="overlay" style={style} />}
    </Li>
  );
};

export default ListItem;
