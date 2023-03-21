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

const TIME = 600; // Miliseconds

const transition: Transition = {
  ease: "easeInOut",
  duration: TIME / 1000, // Seconds,
};

const TextAnimated = ({ children, delay, onAnimatedEnd }: Props) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const startAnimation = async () => {
      await animate(scope.current, { y: "0%" }, { ...transition, delay });
      await timeOut(2000);
      await animate(scope.current, { y: "-100%" }, { ...transition, delay });
      onAnimatedEnd && onAnimatedEnd();
    };
    startAnimation();
  }, [animate, delay, onAnimatedEnd, scope]);

  return (
    <TextInline ref={scope} initial={{ y: "100%" }}>
      {children}
    </TextInline>
  );
};

export default TextAnimated;
