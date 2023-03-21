import { motion, MotionConfig, Transition } from "framer-motion";
import { ReactNode } from "react";
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

const transition: Transition = {
  duration: 0.4,
  ease: "easeOut",
};

const animation = {
  leftInitial: { x: "105%", y: "0%" },
  leftAnimation: { x: "0%", y: "0%" },
  rightInitial: { x: "-200%", y: "0%" },
  rightAnimation: { x: "-100%", y: "0%" },
};

const Title = ({ isParentHover: isHover, children }: Props) => {
  const { portfolio } = usePortfolioProvider();

  return (
    <WrapperText justifyContent="center">
      <MotionConfig transition={transition}>
        <Side>
          <Text
            initial={animation.leftInitial}
            animate={
              isHover && !portfolio ? animation.leftAnimation : undefined
            }
          >
            {children}
          </Text>
        </Side>
        <Side>
          <Text
            initial={animation.rightInitial}
            animate={
              isHover && !portfolio ? animation.rightAnimation : undefined
            }
          >
            {children}
          </Text>
        </Side>
      </MotionConfig>
    </WrapperText>
  );
};

export default Title;
