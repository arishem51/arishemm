import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";
import { usePorfolioScrollDataProvider } from "../../Provider/PortfolioScrollProvider";

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
  position: relative;

  height: 90%;
  width: 5%;

  background: white;

  transform-origin: top;
`;

const ScrollPlaceholder = styled.div`
  position: absolute;

  height: 90%;
  width: 5%;

  background: white;

  opacity: 0.5;
`;

const ScrollBar = () => {
  const { scrollMotion } = usePorfolioScrollDataProvider();
  const motion = useMotionValue(0);

  const scale = useTransform(
    scrollMotion ? scrollMotion : motion,
    [0, 1],
    [0, 1]
  );

  return (
    <Wrapper>
      <ScrollPlaceholder />
      <ScrollProgress style={{ scaleY: scale }} />
    </Wrapper>
  );
};

export default ScrollBar;
