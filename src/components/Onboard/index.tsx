import { motion, Transition, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { createAnimationDefination, timeOut } from "../../helpers";
import Stack from "../Stack";

const Wrapper = styled(Stack)`
  position: absolute;
  z-index: 4;

  width: 100vw;
  height: 100vh;
  background: white;
`;

const TextWrapper = styled.div`
  overflow: hidden;
`;

const Heading = styled(motion.h1)`
  font-size: 5em;
`;

const TextInline = styled(motion.span)`
  display: inline-block;
  font-size: inherit;
`;

const TIME = 600; // Miliseconds
const HELLO = "Hello I'm Arishemm";
const initial = { y: "100%" };

const transition: Transition = {
  ease: "easeInOut",
  duration: TIME / 1000, // Seconds,
};

type Props = {
  onAnimatedEnd: () => void;
};

const Onboard = ({ onAnimatedEnd }: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    runAnimation();
    async function runAnimation() {
      await controls.start((i) =>
        createAnimationDefination(i, "0%", transition)
      );
      await timeOut(500);
      await controls.start((i) =>
        createAnimationDefination(i, "-100%", transition)
      );
      // onAnimatedEnd();
    }
  }, [onAnimatedEnd, controls]);

  return (
    <Wrapper justifyContent="center" alignItems="center">
      <TextWrapper>
        <Heading>
          {HELLO.split("").map((item, index) => (
            <TextInline
              initial={initial}
              animate={controls}
              custom={index}
              key={item + index}
            >
              {item === " " ? <span>&nbsp;</span> : item}
            </TextInline>
          ))}{" "}
        </Heading>
      </TextWrapper>
    </Wrapper>
  );
};

export default Onboard;
