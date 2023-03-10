import { motion, MotionStyle } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";

const Wrapper = styled(motion.div)`
  position: absolute;

  background-color: var(--bgColor);
  border-radius: 1.5em;

  cursor: pointer;

  ::-webkit-scrollbar {
    display: none;
  }

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

const CenterFlex = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

type Props = {
  children?: React.ReactNode;
  width: string;
  height: string;
  top: string;
  left: string;
  bgColor: string;
  name: PortfolioType;
};

function PortfolioItem({
  children,
  width,
  height,
  top,
  left,
  bgColor,
  name,
}: Props) {
  const { portfolio, reverseViewX, reverseViewY } = useAnimationProvider();

  const isActive = portfolio === name;

  const styles: MotionStyle = {
    width: isActive ? window.innerWidth : width,
    height: isActive ? window.innerHeight : height,

    left: isActive ? reverseViewX.get() : left,
    top: isActive ? reverseViewY.get() : top,

    background: bgColor,

    zIndex: isActive ? 9999 : 2,
    overflow: "hidden scroll",
  };

  return (
    <Wrapper
      onMouseMove={(e) => {
        if (isActive) {
          e.stopPropagation();
        }
      }}
      layout
      data-isActive={isActive}
      style={styles}
    >
      <CenterFlex>{children}</CenterFlex>
      {isActive && <div style={{ width: window.innerWidth, height: 1000 }} />}
    </Wrapper>
  );
}

export default PortfolioItem;
