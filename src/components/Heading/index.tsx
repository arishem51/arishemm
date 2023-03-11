import {
  motion,
  Variants,
  Transition,
  useAnimationControls,
} from "framer-motion";
import React from "react";
import styled from "styled-components";
import { PortfolioType } from "../../types";

const Wrapper = styled(motion.h1)`
  position: relative;
  left: 50%;

  display: inline-block;

  font-family: "Rampart One", cursive;
  font-weight: bolder;

  cursor: pointer;
  mix-blend-mode: difference;
`;

type Props = {
  onClick?: () => void;
  portfolio: PortfolioType | undefined;
  children?: React.ReactNode;
  className?: string;
  isScrollUp: boolean;
};

// const variants: Variants = {
//   initial: {
//     top: "50%",
//     zIndex: 1,
//     transform: "translate(-50%, -50%)",
//     fontSize: "7em",
//     color: "var(--color-black)",
//   },
//   animate: (custom: boolean) => {
//     return custom
//       ? {
//           top: "1rem",
//           zIndex: 3,
//           transform: "translate(-50%, 0)",
//           fontSize: "3.2em",
//           color: "var(--color-white)",
//         }
//       : {};
//   },
// };

const transition: Transition = {
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

const initial = {
  top: "50%",
  zIndex: 1,
  transform: "translate(-50%, -50%)",
  fontSize: "7em",
  color: "var(--color-black)",
};

const Heading = ({
  children,
  onClick,
  portfolio,
  isScrollUp,
  ...props
}: Props) => {
  const controls = useAnimationControls();

  React.useEffect(() => {
    if (portfolio) {
      controls.start({
        top: "1rem",
        zIndex: 3,
        transform: "translate(-50%, 0)",
        fontSize: "3.2em",
        color: "var(--color-white)",
      });

      if (isScrollUp) {
        controls.set({ zIndex: 3 });
        controls.start({
          opacity: 1,
        });
      } else {
        controls
          .start({
            opacity: 0,
          })
          .then(() => {
            controls.set({ zIndex: 1 });
          });
      }
    } else {
      controls.start(initial);
    }
  }, [controls, isScrollUp, portfolio]);

  return (
    <Wrapper
      {...props}
      initial={initial}
      animate={controls}
      transition={transition}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
