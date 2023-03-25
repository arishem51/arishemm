import { TargetAndTransition, Transition } from "framer-motion";

export const timeOut = (time: number) => {
  return new Promise((res) => setTimeout(() => res(time), time));
};

export const createAnimationDefination = (
  custom: number,
  translateY: string,
  transition: Transition
): TargetAndTransition => {
  return {
    y: translateY,
    transition: { ...transition, delay: custom * 0.1 },
  };
};

export const throttleMouseEvent = (
  callback: (props: MouseEvent) => void,
  delay: number
): ((props: MouseEvent) => void) => {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    callback(...args);
  };
};
