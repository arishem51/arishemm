import React, { useRef } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useViewMove } from "../hooks/useViewMove";
import { PortfolioType } from "../types";

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

const Content = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
`;

const variants: Variants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    y: "40%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    y: "-40%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

function App() {
  const [textHover, setTextHover] = React.useState("");
  const [portfolio, setPortfolio] = React.useState<PortfolioType>();

  const { viewRef, x, y, contentRef, handleMouseMoveOnView } = useViewMove();

  return (
    <Wrapper ref={viewRef} onMouseMove={handleMouseMoveOnView}>
      <Portfolio
        setTextHover={setTextHover}
        setPortfolio={setPortfolio}
        layout
        style={{ x, y }}
        ref={contentRef}
      />
      <Heading>Arishemm</Heading>
      <AnimatePresence>
        {textHover && (
          <Text
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            {textHover}
          </Text>
        )}
      </AnimatePresence>
      {portfolio && (
        <Content
          onMouseMove={(e) => {
            e.stopPropagation();
          }}
        />
      )}
    </Wrapper>
  );
}

export default App;
