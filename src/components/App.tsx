import React, { createContext, useContext } from "react";
import { AnimatePresence, motion, MotionValue } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useViewMove } from "../hooks/useViewMove";
import { PortfolioType } from "../types";
import TextHover from "./TextHover";
import { useAnimationProvider } from "../Provider/AnimationProvider";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

const Heading = styled.h1`
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 1;

  display: inline-block;

  font-size: 3.5em;
  color: var(--color-black);

  transform: translate(-50%, -50%);

  user-select: none;
`;

const Content = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
`;

type MotionContextProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  reverseX: MotionValue<number>;
  reverseY: MotionValue<number>;
  portfolio: any;
};

const MotionContext = createContext<MotionContextProps>(
  {} as MotionContextProps
);

export const useMotionContext = () => {
  const value = useContext(MotionContext);
  return value;
};

function App() {
  const [textHover, setTextHover] = React.useState("");

  const {
    viewRef,
    handleMouseMoveOnView,
    setPortfolio,
    viewX,
    viewY,
    contentRef,
  } = useAnimationProvider();

  return (
    <Wrapper ref={viewRef} onMouseMove={handleMouseMoveOnView}>
      <Portfolio
        setTextHover={setTextHover}
        setPortfolio={setPortfolio}
        layout
        style={{ x: viewX, y: viewY }}
        ref={contentRef}
      />
      <Heading>Arishemm</Heading>
      <AnimatePresence>
        {textHover && <TextHover>{textHover}</TextHover>}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
