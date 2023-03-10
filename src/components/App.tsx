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

  font-size: 7em;
  color: var(--color-black);
  font-family: "Rampart One", cursive;

  transform: translate(-50%, -50%);

  user-select: none;
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
        setPortfolio={setPortfolio}
        layout
        style={{ x: viewX, y: viewY }}
        ref={contentRef}
      />
      <Heading>Arishemm</Heading>
    </Wrapper>
  );
}

export default App;
