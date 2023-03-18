import {
  motion,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
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
  hover: {
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
  hover: {
    transform: "translate(-100%, 0%)",
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const transition: Transition = {
  duration: 0.5,
  ease: "easeOut",
};

const Title = ({ isParentHover, children }: Props) => {
  const controls = useAnimationControls();
  const { portfolio } = usePortfolioProvider();

  useEffect(() => {
    // This effect will handle hover animation, if have portfolio will not run this effect/animation
    if (portfolio) {
      return;
    }
    if (isParentHover) {
      controls.start("hover", { delay: 0.1 });
    } else {
      controls.start("initial");
    }
  }, [controls, isParentHover, portfolio]);

  useEffect(() => {
    // This effect will handle animation when have portfolio or not (Expand animation)
    if (portfolio) {
      controls.start("hidden");
    } else {
      controls.start("visible", { delay: 1 });
    }
  }, [controls, portfolio]);

  return (
    <WrapperText justifyContent="center">
      <Side>
        <Text
          variants={variantsLeftText}
          initial="initial"
          animate={controls}
          transition={transition}
        >
          {children}
        </Text>
      </Side>
      <Side>
        <Text
          variants={variantsRightText}
          initial="initial"
          animate={controls}
          transition={transition}
        >
          {children}
        </Text>
      </Side>
    </WrapperText>
  );
};

export default Title;
