import { motion, useScroll, useWillChange } from "framer-motion";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAnimatePortfolioItem } from "../../hooks/useAnimatePortfolioItem";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";
import { usePortfolioScrollAPIProivder } from "../../Provider/PortfolioScrollProvider";
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

  background-color: var(--bgColor);
  cursor: var(--cursor);

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
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const portfolio = usePortfolioProvider();
  const { scrollYProgress } = useScroll({ container: ref });
  const { setScrollMotion } = usePortfolioScrollAPIProivder();

  useEffect(() => {
    if (scrollYProgress && portfolio === name) {
      setScrollMotion(scrollYProgress);
    }
  }, [name, portfolio, scrollYProgress, setScrollMotion]);

  useAnimatePortfolioItem({
    width,
    height,
    left,
    name,
    top,
    ref,
  });

  const willChange = useWillChange();

  function handleHoverStart() {
    if (portfolio) {
      return;
    }
    setIsHover(true);
  }

  function handleHoverEnd() {
    if (portfolio) {
      return;
    }
    setIsHover(false);
  }

  const style = {
    "--bgColor": bgColor,
    "--cursor": !portfolio ? "pointer" : "default",
  } as CSSProperties;

  return (
    <Wrapper
      layout
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      ref={ref}
      style={{ willChange }}
    >
      <CenterFlex style={style}>{backgroundComponent}</CenterFlex>
      {expandedComponent}
      <Title isParentHover={isHover}>{name}</Title>
    </Wrapper>
  );
}

export default PortfolioItem;
