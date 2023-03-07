import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  SpringOptions,
} from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useViewMove } from "../hooks/useViewMove";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

const Heading = styled.h1`
  position: relative;
  z-index: 1;
  top: 50%;
  left: 50%;

  display: inline-block;

  font-size: 3.5em;
  color: var(--color-black);

  transform: translate(-50%, -50%);
`;

function App() {
  const { viewRef, x, y, contentRef, handleMouseMoveOnView } = useViewMove();

  return (
    <Wrapper layout ref={viewRef} onMouseMove={handleMouseMoveOnView}>
      <Portfolio
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        layout
        style={{ x, y }}
        ref={contentRef}
      />
      <Heading>Arishemm</Heading>
    </Wrapper>
  );
}

export default App;
