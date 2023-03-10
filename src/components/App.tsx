import React, { createContext, useContext } from "react";
import { motion, MotionValue } from "framer-motion";
import styled from "styled-components";
import Portfolio from "./Portfolio";
import { useAnimationProvider } from "../Provider/AnimationProvider";

const Wrapper = styled(motion.main)`
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

const Heading = styled(motion.h1)`
  position: relative;
  left: 50%;

  display: inline-block;

  font-family: "Rampart One", cursive;

  cursor: pointer;
`;

type MotionContextProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  reverseX: MotionValue<number>;
  reverseY: MotionValue<number>;
  portfolio: any;
};

const MotionContext = createContext<MotionContextProps>(
  {} as MotionContextProps
);

export const useMotionContext = () => {
  const value = useContext(MotionContext);
  return value;
};

function App() {
  const { viewRef, setPortfolio, viewX, viewY, contentRef, portfolio } =
    useAnimationProvider();

  return (
    <Wrapper ref={viewRef}>
      <Portfolio
        setPortfolio={setPortfolio}
        layout
        style={{ x: viewX, y: viewY }}
        ref={contentRef}
      />
      <Heading
        onClick={() => setPortfolio(undefined)}
        initial={{
          top: "50%",
          zIndex: 1,
          transform: "translate(-50%, -50%)",
          fontSize: "7em",
          color: "var(--color-black)",
        }}
        animate={
          portfolio
            ? {
                top: "1rem",
                zIndex: 3,
                transform: "translate(-50%, 0)",
                fontSize: "2em",
                color: "var(--color-white)",
              }
            : {}
        }
      >
        Arishemm
      </Heading>
    </Wrapper>
  );
}

export default App;
