import { motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Text = styled(motion.h1)`
  white-space: nowrap;
  text-transform: capitalize;
  font-family: "Rampart One", cursive;
  color: black;
  font-size: 2em;
`;

const WrapperText = styled.div`
  position: absolute;
  bottom: 1em;
  left: 50%;
  z-index: 4;

  display: flex;
  justify-content: center;

  transform: translate(-50%, 0);
`;

const Side = styled.div`
  width: 26%;
  overflow: hidden;
`;

type Props = {
  isParentHover: boolean;
  children?: React.ReactNode;
};

const leftVariants: Variants = {
  initial: {
    transform: "translate(105%,0)",
  },
  animate: (custom: boolean) => {
    return custom
      ? {
          transform: "translate(0)",
          transition: {
            delay: 0.3,
          },
        }
      : {};
  },
};

const rightVariants: Variants = {
  initial: {
    transform: "translate(-200%,0)",
  },
  animate: (custom: boolean) => {
    return custom
      ? {
          transform: "translate(-100%, 0%)",
          transition: {
            delay: 0.3,
          },
        }
      : {};
  },
};

const Title = ({ isParentHover, children }: Props) => {
  return (
    <WrapperText>
      <Side>
        <Text
          variants={leftVariants}
          initial="initial"
          animate="animate"
          custom={isParentHover}
        >
          {children}
        </Text>
      </Side>
      <Side>
        <Text
          initial="initial"
          animate="animate"
          variants={rightVariants}
          custom={isParentHover}
        >
          {children}
        </Text>
      </Side>
    </WrapperText>
  );
};

export default Title;
