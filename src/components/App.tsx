import { motion } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useAnimationData } from "../Provider/AnimationProvider";
import Heading from "./Heading";
import Navbar from "./Navbar";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

function App() {
  const { viewRef, viewX, viewY, contentRef } = useAnimationData();

  console.log("App re render");

  const styles = {
    x: viewX,
    y: viewY,
  };

  return (
    <Wrapper ref={viewRef}>
      <Portfolio layout style={styles} ref={contentRef} />
      <Heading>Arishemm</Heading>
      <Navbar />
    </Wrapper>
  );
}

export default App;
