import { motion, useAnimationControls, Variants } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useAnimationRefProvider } from "../Provider/AnimationProvider";
import Heading from "./Heading";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Onboard from "./Onboard";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  z-index: 1;

  overflow: hidden;
`;

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function App() {
  const [shouldRenderOnboard, setShouldRenderOnboard] = useState(true);
  const controls = useAnimationControls();
  const { viewRef } = useAnimationRefProvider();

  useEffect(() => {
    if (!shouldRenderOnboard) {
      controls.start("visible");
    }
  }, [controls, shouldRenderOnboard]);

  function handleAnimatedEnd() {
    setShouldRenderOnboard(false);
  }

  return shouldRenderOnboard ? (
    <Onboard onAnimatedEnd={handleAnimatedEnd} />
  ) : (
    <Wrapper
      ref={viewRef}
      variants={variants}
      initial="initial"
      animate={controls}
    >
      <Portfolio />
      <Heading>Arishemm</Heading>
      <Navbar />
    </Wrapper>
  );
}

export default App;
