import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useIsScrollUp } from "../../hooks/useIsScrollUp";
import { usePortfolioAnimation } from "../../hooks/usePortfolioAnimation";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import Title from "./Title";

const Wrapper = styled(motion.div)`
  position: absolute;

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
    cursor: pointer;
    ::after {
      scale: 1;
    }
  }
`;

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
  const { portfolio } = useAnimationProvider();

  const { animationControls, variants } = usePortfolioAnimation({
    width,
    height,
    left,
    name,
    top,
  });

  const [isHover, setIsHover] = React.useState(false);

  const { scrollRef } = useIsScrollUp();

  const isActive = portfolio === name;

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
      variants={variants}
      onMouseMove={handleMouseMove}
      layout
      initial="initial"
      animate={animationControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      ref={scrollRef}
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
