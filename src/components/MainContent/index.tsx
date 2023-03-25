import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { useAnimationDataProvider } from "../../Provider/AnimationProvider";
import PorfolioScrollProvider from "../../Provider/PortfolioScrollProvider";
import Heading from "../Heading";
import Navbar from "../Navbar";
import Portfolio from "../Portfolio";
import ScrollBar from "../ScrollBar";

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

const MainContent = () => {
  const { viewRef } = useAnimationDataProvider();

  return (
    <Wrapper
      ref={viewRef}
      variants={variants}
      initial="initial"
      animate="visible"
    >
      <PorfolioScrollProvider>
        <Portfolio />
        <Heading>Arishemm</Heading>
        <Navbar />
        <ScrollBar />
      </PorfolioScrollProvider>
    </Wrapper>
  );
};

export default MainContent;
