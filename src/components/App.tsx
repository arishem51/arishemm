import { motion } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import {
  useAnimationDataProvider,
  useAnimationRefProvider,
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
  const { viewRef } = useAnimationRefProvider();

  return (
    <Wrapper ref={viewRef}>
      <Portfolio />
      <Heading>Arishemm</Heading>
      <Navbar />
    </Wrapper>
  );
}

export default App;
