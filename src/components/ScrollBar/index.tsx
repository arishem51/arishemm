import {
  motion,
  Transition,
  useAnimationControls,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";
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

const variants: Variants = {
  initial: {
    transform: "translate(250%,-50%)",
  },
  translate: {
    transform: "translate(0%,-50%)",
  },
};

const transition: Transition = {
  delay: 0.75,
};

const ScrollBar = () => {
  const { scrollMotion } = usePorfolioScrollDataProvider();
  const motion = useMotionValue(0);
  const { portfolio } = usePortfolioProvider();

  const scale = useTransform(
    scrollMotion ? scrollMotion : motion,
    [0, 1],
    [0, 1]
  );

  const controls = useAnimationControls();

  useEffect(() => {
    if (portfolio) {
      controls.start("translate", transition);
    } else {
      controls.start("initial");
    }
  }, [controls, portfolio]);

  const style = useMemo(
    () => ({
      scaleY: scale,
    }),
    [scale]
  );

  return (
    <Wrapper variants={variants} initial="initial" animate={controls}>
      <ScrollPlaceholder />
      <ScrollProgress style={style} />
    </Wrapper>
  );
};

export default ScrollBar;
