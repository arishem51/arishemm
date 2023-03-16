import { motion, Variants } from "framer-motion";
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
  useAnimationRefProvider,
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
    transition: { duration: 1, delay: 1 },
  },
  enter: {
    opacity: 1,
    transition: { duration: 1, delay: 1 },
  },
};

const PortfolioItems: PortfolioType[] = [
  "about",
  "contact",
  "resume",
  "experience",
  "project",
];

const Portfolio = () => {
  const { setAnimationType, setPortfolio } = useAnimationAPIProvider();
  const { contentRef } = useAnimationRefProvider();
  const { viewX, viewY } = useAnimationDataProvider();
  const { portfolio } = usePortfolioProvider();

  const styles = {
    x: viewX,
    y: viewY,
  };

  function renderItem() {
    return PortfolioItems.map((item) => {
      return (
        <motion.div
          layout
          onClick={() => {
            if (portfolio === item) {
              return;
            }
            setAnimationType("expand");
            setPortfolio(item);
          }}
          key={item}
        >
          {item === "about" && <About />}
          {item === "project" && <Project />}
          {item === "experience" && <Experience />}
          {item === "contact" && <Contact />}
          {item === "resume" && <Resume />}
        </motion.div>
      );
    });
  }

  return (
    <ViewContent
      layout
      initial="init"
      animate="enter"
      variants={variants}
      ref={contentRef}
      style={styles}
    >
      {renderItem()}
    </ViewContent>
  );
};

export default Portfolio;
