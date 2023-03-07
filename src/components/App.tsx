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

function App() {
  const { viewRef, x, y, contentRef, handleMouseMoveOnView } = useViewMove();

  return (
    <Wrapper layout ref={viewRef} onMouseMove={handleMouseMoveOnView}>
      <Portfolio layout style={{ x, y }} ref={contentRef} />
    </Wrapper>
  );
}

export default App;
