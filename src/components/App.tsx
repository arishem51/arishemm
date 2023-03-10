import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useAnimationProvider } from "../Provider/AnimationProvider";
import Heading from "./Heading";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

function App() {
  const { viewRef, setPortfolio, viewX, viewY, contentRef, portfolio } =
    useAnimationProvider();

  function handleHeadingClick() {
    setPortfolio(undefined);
  }

  const styles = {
    x: viewX,
    y: viewY,
  };

  return (
    <Wrapper ref={viewRef}>
      <Portfolio
        setPortfolio={setPortfolio}
        layout
        style={styles}
        ref={contentRef}
      />
      <Heading portfolio={portfolio} onClick={handleHeadingClick}>
        Arishemm
      </Heading>
    </Wrapper>
  );
}

export default App;
