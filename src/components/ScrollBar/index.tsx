import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 2.5%;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5%;
  height: 35%;

  transform: translate(0%, -50%);

  background: var(--color-black-60);
  border-radius: 3rem;

  overflow: hidden;
`;

const ScrollProgress = styled(motion.div)`
  height: 90%;
  width: 5%;

  background: white;
`;

const ScrollBar = () => {
  return (
    <Wrapper>
      <ScrollProgress />
    </Wrapper>
  );
};

export default ScrollBar;
