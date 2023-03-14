import {
  AnimatePresence,
  motion,
  Transition,
  useAnimationControls,
  Variants,
} from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { createAnimationDefination } from "../../helpers";
import Stack from "../Stack";

const Container = styled(motion.div)``;

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

type Props = {
  onOnboardUnmount: () => void;
};

const containerVariants: Variants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const TIME = 600; // Miliseconds

const transition: Transition = {
  ease: "easeInOut",
  duration: TIME / 1000, // Seconds,
};

const HELLO = "Hello I'm Arishemm";

const initial = { translateY: "100%" };

const Onboard = ({ onOnboardUnmount }: Props) => {
  const [isPresent, setIsPresent] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    runAnimation();
    async function runAnimation() {
      await controls.start((i) =>
        createAnimationDefination(i, "0%", transition)
      );
      await controls.start((i) =>
        createAnimationDefination(i, "-100%", transition)
      );
      setIsPresent(false);
      setTimeout(() => {
        onOnboardUnmount();
      }, TIME);
    }
  }, [controls, onOnboardUnmount, setIsPresent]);

  return (
    <AnimatePresence>
      {isPresent && (
        <Container
          exit="exit"
          initial="initial"
          variants={containerVariants}
          transition={transition}
        >
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
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Onboard;
