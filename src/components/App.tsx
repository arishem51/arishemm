import { motion, useAnimationControls, Variants } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useAnimationRefProvider } from "../Provider/AnimationProvider";
import Heading from "./Heading";
import Navbar from "./Navbar";
import { useCallback } from "react";
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
  const controls = useAnimationControls();
  const { viewRef } = useAnimationRefProvider();

  const handleAnimation = useCallback(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <>
      <Onboard onOnboardUnmount={handleAnimation} />
      <motion.div animate={controls} initial="initial" variants={variants}>
        <Wrapper ref={viewRef}>
          <Portfolio />
          <Heading>Arishemm</Heading>
          <Navbar />
        </Wrapper>
      </motion.div>
    </>
  );
}

export default App;
