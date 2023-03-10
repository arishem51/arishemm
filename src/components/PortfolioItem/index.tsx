import { motion, Transition, useAnimationControls } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import Title from "./Title";

const Wrapper = styled(motion.div)`
  position: absolute;
  cursor: pointer;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CenterFlex = styled(motion.div)`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border-radius: 1.5em;

  ::after {
    --offset: calc(1em / 2);
    --size: calc(100% - 1em);

    content: "";

    position: absolute;
    top: var(--offset);
    left: var(--offset);

    width: var(--size);
    height: var(--size);

    z-index: 1;

    background-color: white;
    border-radius: 1em;

    transition: scale 0.5s ease;
    scale: 0;
  }

  &[data-isActive="false"]:hover {
    ::after {
      scale: 1;
    }
  }
`;

const transition: Transition = {
  duration: 0.4,
  ease: [0.2, 0, 1, 0.8],
};

type Props = {
  width: string;
  height: string;
  top: string;
  left: string;
  bgColor: string;
  name: PortfolioType;
  backgroundComponent: React.ReactNode;
  expandedComponent: React.ReactNode;
};

function PortfolioItem({
  width,
  height,
  top,
  left,
  bgColor,
  name,
  expandedComponent,
  backgroundComponent,
}: Props) {
  const {
    portfolio,
    reverseViewX,
    reverseViewY,
    animationType,
    previousPortfolio,
  } = useAnimationProvider();

  const [isHover, setIsHover] = React.useState(false);

  const animationControls = useAnimationControls();

  const isActive = portfolio === name;

  const initial = React.useMemo(() => {
    return {
      width,
      height,
      left,
      top,
      background: "rgba(255,255,255,0)",
      padding: ".7em",
      zIndex: 2,
      overflow: "hidden scroll",
      transition,
    };
  }, [height, left, top, width]);

  const animationExpand = React.useMemo(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      left: reverseViewX,
      top: reverseViewY,
      background: "rgb(242,240,233)",
      padding: ".7em",
      zIndex: 4,
      overflow: "hidden scroll",
      transition,
    };
  }, [reverseViewX, reverseViewY]);

  const animationSlideUp = React.useMemo(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      top: reverseViewY + window.innerHeight,
      left: reverseViewX,
      zIndex: 4,
      overflow: "hidden scroll",
      transition,
    };
  }, [reverseViewX, reverseViewY]);

  React.useEffect(() => {
    if (animationType === "expand") {
      if (isActive) {
        // Portfolio is active will run this animation
        animationControls.start(animationExpand);
      } else if (previousPortfolio === name) {
        // Portfolio was active run this aniamtion
        animationControls.start(initial);
      }
    } else {
      // AnimationType === 'slideUp '

      if (isActive) {
        // Portfolio is active will run this animation
        animationControls.set(animationSlideUp);
        animationControls.start(animationExpand);
      } else if (previousPortfolio === name) {
        // Portfolio was active run this aniamtion
        animationControls.start(animationSlideUp).then(() => {
          animationControls.set(initial);
        });
      }
    }
  }, [
    animationControls,
    animationExpand,
    animationSlideUp,
    animationType,
    initial,
    isActive,
    name,
    previousPortfolio,
  ]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isActive) {
      e.stopPropagation();
    }
  }

  function handleHoverStart() {
    setIsHover(true);
  }

  function handleHoverEnd() {
    setIsHover(false);
  }

  return (
    <Wrapper
      onMouseMove={handleMouseMove}
      layout
      initial={initial}
      animate={animationControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <CenterFlex data-isActive={isActive} style={{ background: bgColor }}>
        {backgroundComponent}
      </CenterFlex>
      {isActive && expandedComponent}
      {!isActive && <Title isParentHover={isHover}>{name}</Title>}
    </Wrapper>
  );
}

export default PortfolioItem;
