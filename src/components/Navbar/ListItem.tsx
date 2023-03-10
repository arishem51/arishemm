import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const Li = styled(motion.li)`
  padding: 0.8em 1.2em;
  border-radius: 2em;

  color: var(--color-black);
  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;

  list-style-type: none;

  cursor: pointer;
`;

type Props = {
  children?: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

const variants: Variants = {
  hover: {
    opacity: 0.6,
    transition: {
      duration: 0.3,
    },
  },
  initial: {
    transition: {
      duration: 0.3,
    },
  },
  animate: (custom: boolean) => {
    return {
      background: custom ? "red" : "transparent",
    };
  },
};

const ListItem = ({ children, active, onClick }: Props) => {
  return (
    <Li
      custom={active}
      animate="animate"
      variants={variants}
      initial="initial"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </Li>
  );
};

export default ListItem;
