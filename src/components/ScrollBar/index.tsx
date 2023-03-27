import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";
import { usePortfolioScrollDataProvider } from "../../Provider/PortfolioScrollProvider";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5%;
  height: 35%;

  background: var(--color-black-60);
  border-radius: 3rem;

  overflow: hidden;

  transform: translateY(-50%);
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

const animation = {
  initial: { y: "-50%", x: "100%" },
  animate: { y: "-50%", x: "-50%" },
  transition: {
    duration: 0.2,
    delay: 0.75,
  },
};

const ScrollBar = () => {
  const { scrollMotion } = usePortfolioScrollDataProvider();
  const motion = useMotionValue(0);
  const portfolio = usePortfolioProvider();

  const [scope, animate] = useAnimate();

  const scale = useTransform(
    scrollMotion ? scrollMotion : motion,
    [0, 1],
    [0, 1]
  );

  useEffect(() => {
    if (portfolio) {
      const element = scope.current;
      animate(element, animation.animate, {
        delay: animation.transition.delay,
      });
      return () => {
        animate(element, animation.initial, {
          duration: animation.transition.duration,
        });
      };
    }
  }, [animate, portfolio, scope]);

  const style = {
    scaleY: scale,
  };

  return (
    <Wrapper initial={animation.initial} ref={scope}>
      <ScrollPlaceholder />
      <ScrollProgress style={style} />
    </Wrapper>
  );
};

export default ScrollBar;
