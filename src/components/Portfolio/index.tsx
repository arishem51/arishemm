import { motion, Transition, Variants } from "framer-motion";
import styled from "styled-components";
import About from "../About";
import Experience from "../Experience";
import Contact from "../Contact";
import Project from "../Project";
import Resume from "../Resume";
import { PortfolioType } from "../../types";
import {
  useAnimationAPIProvider,
  useAnimationDataProvider,
  useAnimationRunningProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";

const ViewContent = styled(motion.div)`
  width: 140vmax;
  height: 110vmax;

  position: absolute;

  z-index: 2;
`;

const variants: Variants = {
  init: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
};

const transition: Transition = { duration: 1.2, delay: 1.5 };

const PortfolioItems: PortfolioType[] = [
  "about",
  "contact",
  "resume",
  "experience",
  "project",
];

const Portfolio = () => {
  const { setAnimationType, setPortfolio } = useAnimationAPIProvider();
  const { viewX, viewY, contentRef } = useAnimationDataProvider();
  const { isAnimationRunning } = useAnimationRunningProvider();
  const { portfolio } = usePortfolioProvider();
  const { setIsAnimationRunning } = useAnimationAPIProvider();

  const styles = {
    x: viewX,
    y: viewY,
  };

  const renderItem = () => {
    return PortfolioItems.map((item) => {
      return (
        <div
          onClick={() => {
            if (portfolio === item || isAnimationRunning) {
              return;
            }
            setAnimationType("expand");
            setPortfolio(item);
            setIsAnimationRunning(true);
          }}
          key={item}
        >
          {item === "about" && <About />}
          {item === "project" && <Project />}
          {item === "experience" && <Experience />}
          {item === "contact" && <Contact />}
          {item === "resume" && <Resume />}
        </div>
      );
    });
  };

  return (
    <ViewContent
      layout
      initial="init"
      animate="enter"
      variants={variants}
      transition={transition}
      ref={contentRef}
      style={styles}
    >
      {renderItem()}
    </ViewContent>
  );
};

export default Portfolio;
