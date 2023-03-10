import {
  AnimatePresence,
  motion,
  useWillChange,
  Variants,
} from "framer-motion";
import React, { CSSProperties, useMemo, useRef } from "react";
import styled from "styled-components";
import { usePortfolioScroll } from "../../hooks/usePortfolioScroll";
import { usePortfolioAnimation } from "../../hooks/usePortfolioAnimation";
import { usePortfolioProvider } from "../../Provider/AnimationProvider";
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

const expandedVariants: Variants = {
  initial: {
    scale: 1,
  },
  exit: {
    scale: 0.99,
    transition: {
      delay: 0.6,
    },
  },
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
  const { portfolio } = usePortfolioProvider();
  const ref = useRef<HTMLDivElement>(null);

  const { animationControls, variants } = usePortfolioAnimation({
    width,
    height,
    left,
    name,
    top,
  });

  const willChange = useWillChange();

  const styles = useMemo(() => {
    return { willChange };
  }, [willChange]);

  const [isHover, setIsHover] = React.useState(false);

  usePortfolioScroll({ scrollRef: ref });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (portfolio === name) {
      e.stopPropagation();
    }
  };

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
      variants={variants}
      onMouseMove={handleMouseMove}
      layout
      initial="initial"
      animate={animationControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover="hover"
      ref={ref}
      style={styles}
    >
      <CenterFlex style={style}>{backgroundComponent}</CenterFlex>

      {/*  This hack use for change portfolio item, the portofolio was change is lost children so it will not at the scroll position when exit => Animating the exit children so it can keep children for a while! */}
      <AnimatePresence>
        {portfolio === name && (
          <motion.div variants={expandedVariants} initial="initial" exit="exit">
            {expandedComponent}
          </motion.div>
        )}
      </AnimatePresence>
      {portfolio !== name && <Title isParentHover={isHover}>{name}</Title>}
    </Wrapper>
  );
}

export default PortfolioItem;
