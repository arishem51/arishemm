import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useViewMove } from "../hooks/useViewMove";
import { PortfolioType } from "../types";
import TextHover from "./TextHover";

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
        {textHover && <TextHover>{textHover}</TextHover>}
      </AnimatePresence>
      {portfolio && (
        <Content
          onMouseMove={(e) => {
            e.stopPropagation();
          }}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <CloseButton onClick={() => setPortfolio(undefined)}>X</CloseButton>
        </Content>
      )}
    </Wrapper>
  );
}

export default App;
