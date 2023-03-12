import {
  motion,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
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

const variantsLeftText: Variants = {
  initial: {
    transform: "translate(105%,0%)",
  },
  animate: {
    transform: "translate(0%,0%)",
  },
};

const variantsRightText: Variants = {
  initial: {
    transform: "translate(-200%,0%)",
  },
  animate: {
    transform: "translate(-100%, 0%)",
  },
};

const transitionOverride: Transition = {
  delay: 0.2,
};

const Title = ({ isParentHover, children }: Props) => {
  const controlsLeftText = useAnimationControls();
  const controlsRightText = useAnimationControls();

  React.useEffect(() => {
    if (isParentHover) {
      controlsLeftText.start("animate", transitionOverride);
      controlsRightText.start("animate", transitionOverride);
    } else {
      controlsLeftText.start("initial");
      controlsRightText.start("initial");
    }
  }, [controlsLeftText, controlsRightText, isParentHover]);

  return (
    <WrapperText>
      <Side>
        <Text
          variants={variantsLeftText}
          initial="initial"
          animate={controlsLeftText}
        >
          {children}
        </Text>
      </Side>
      <Side>
        <Text
          variants={variantsRightText}
          initial="initial"
          animate={controlsRightText}
        >
          {children}
        </Text>
      </Side>
    </WrapperText>
  );
};

export default Title;
