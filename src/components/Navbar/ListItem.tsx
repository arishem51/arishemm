import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";

const Li = styled(motion.li)`
  padding: 0.8em 1.2em;

  color: var(--color-black);
  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;

  list-style-type: none;

  cursor: pointer;
`;

type Props = {
  children?: React.ReactNode;
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
};

const ListItem = ({ children }: Props) => {
  return (
    <Li variants={variants} initial="initial" whileHover="hover">
      {children}
    </Li>
  );
};

export default ListItem;
