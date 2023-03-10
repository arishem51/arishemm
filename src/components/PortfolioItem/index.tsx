import { motion, MotionStyle, Transition } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";

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

  &[data-isExpand="false"]:hover {
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
  const { portfolio, reverseViewX, reverseViewY } = useAnimationProvider();

  const isExpand = portfolio === name;

  const styles: MotionStyle = {
    width: isExpand ? window.innerWidth : width,
    height: isExpand ? window.innerHeight : height,

    left: isExpand ? reverseViewX : left,
    top: isExpand ? reverseViewY : top,

    background: isExpand ? "rgb(242, 240, 233)" : "transparent",
    padding: ".7em",
    zIndex: isExpand ? 9999 : 2,
    overflow: "hidden scroll",
  };

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isExpand) {
      e.stopPropagation();
    }
  }

  return (
    <Wrapper
      onMouseMove={handleMouseMove}
      layout
      style={styles}
      transition={transition}
    >
      <CenterFlex data-isExpand={isExpand} style={{ background: bgColor }}>
        {backgroundComponent}
      </CenterFlex>
      {isExpand && expandedComponent}
    </Wrapper>
  );
}

export default PortfolioItem;
