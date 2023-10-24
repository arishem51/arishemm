import { motion, Transition, useAnimate } from "framer-motion";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { timeOut } from "../../helpers";

type Props = {
  children: ReactNode;
  delay: number;
  onAnimatedEnd?: () => void;
};

const TextInline = styled(motion.span)`
  display: inline-block;
  font-size: inherit;
`;

const transition: Transition = {
  ease: "easeInOut",
  duration: 0.6,
};

const animation = {
  initial: {
    y: "100%",
    opacity: 0.5,
  },
  enter: {
    y: "0%",
    opacity: 1,
  },
  exit: {
    y: "-60%",
    opacity: 0,
  },
};

const TIME_OUT = 800;

const TextAnimated = ({ children, delay, onAnimatedEnd }: Props) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const startAnimation = async () => {
      await animate(scope.current, animation.enter, { ...transition, delay });
      await timeOut(TIME_OUT);
      await animate(scope.current, animation.exit, {
        ...transition,
        duration: 0.4,
        delay: delay / 2,
      });
      onAnimatedEnd && onAnimatedEnd();
    };
    startAnimation();
  }, [animate, delay, onAnimatedEnd, scope]);

  return (
    <TextInline ref={scope} initial={animation.initial}>
      {children}
    </TextInline>
  );
};

export default TextAnimated;
