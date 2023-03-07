import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  top: 50%;
  left: 50%;
  z-index: 1;

  display: inline-block;

  font-size: 3.5em;
  color: var(--color-black);

  transform: translate(-50%, -50%);

  user-select: none;
`;

const Text = styled(motion.h1)`
  position: fixed;

  bottom: 2em;
  right: 3em;

  color: var(--color-black);
  font-size: 2em;
`;

function App() {
  const [state, setState] = React.useState("");

  function renderText() {
    return state.split("").map((item, index) => (
      <motion.span
        transition={{ delay: index * 0.05, duration: 0.3 }}
        initial={{ y: "50%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        key={item + index}
        style={{ display: "inline-block" }}
        exit={{ y: "-50%", opacity: 0 }}
      >
        {item}
      </motion.span>
    ));
  }

  const { viewRef, x, y, contentRef, handleMouseMoveOnView } = useViewMove();

  return (
    <Wrapper layout ref={viewRef} onMouseMove={handleMouseMoveOnView}>
      <Portfolio setState={setState} layout style={{ x, y }} ref={contentRef} />
      <Heading>Arishemm</Heading>
      <Text>
        <AnimatePresence mode="wait">{renderText()}</AnimatePresence>
      </Text>
    </Wrapper>
  );
}

export default App;
