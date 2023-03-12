import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import {
  useAnimationAPI,
  useAnimationData,
} from "../Provider/AnimationProvider";
import Heading from "./Heading";
import Navbar from "./Navbar";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

function App() {
  const { viewRef, viewX, viewY, contentRef, portfolio, isScrollUp } =
    useAnimationData();

  const { setAnimationType, setPortfolio } = useAnimationAPI();

  function handleHeadingClick() {
    setPortfolio(undefined);
    setAnimationType("expand");
  }

  const styles = {
    x: viewX,
    y: viewY,
  };

  return (
    <Wrapper ref={viewRef}>
      <Portfolio layout style={styles} ref={contentRef} />
      <Heading
        isScrollUp={isScrollUp}
        portfolio={portfolio}
        onClick={handleHeadingClick}
      >
        Arishemm
      </Heading>
      {portfolio && <Navbar />}
    </Wrapper>
  );
}

export default App;
