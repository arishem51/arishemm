import { motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect, ReactNode } from "react";
import styled from "styled-components";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";
import Stack from "../Stack";

const Text = styled(motion.h1)`
  white-space: nowrap;
  text-transform: capitalize;
  font-family: "Rampart One", cursive;
  color: black;
  font-size: 2em;
  cursor: pointer;
`;

const WrapperText = styled(Stack)`
  position: absolute;
  bottom: 1em;
  left: 50%;
  z-index: 4;

  transform: translate(-50%, 0);
`;

const Side = styled.div`
  width: 26%;
  overflow: hidden;
`;

type Props = {
  isParentHover: boolean;
  children?: ReactNode;
};

const variantsLeftText: Variants = {
  initial: {
    transform: "translate(105%,0%)",
  },
  animate: {
    transform: "translate(0%,0%)",
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const variantsRightText: Variants = {
  initial: {
    transform: "translate(-200%,0%)",
  },
  animate: {
    transform: "translate(-100%, 0%)",
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Title = ({ isParentHover, children }: Props) => {
  const controlsLeftText = useAnimationControls();
  const controlsRightText = useAnimationControls();
  const { portfolio } = usePortfolioProvider();

  useEffect(() => {
    if (portfolio) {
      return;
    }
    if (isParentHover) {
      controlsLeftText.start("animate");
      controlsRightText.start("animate");
    } else {
      controlsLeftText.start("initial");
      controlsRightText.start("initial");
    }
  }, [controlsLeftText, controlsRightText, isParentHover, portfolio]);

  useEffect(() => {
    if (portfolio) {
      controlsLeftText.start("hidden");
      controlsRightText.start("hidden");
    } else {
      setTimeout(() => {
        controlsLeftText.start("visible");
        controlsRightText.start("visible");
      }, 750);
    }
  }, [controlsLeftText, controlsRightText, portfolio]);

  return (
    <WrapperText justifyContent="center">
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
