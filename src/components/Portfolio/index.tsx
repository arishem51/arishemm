import React from "react";
import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import About from "../About";
import Experience from "../Experience";
import Contact from "../Contact";
import Work from "../Work";
import Resume from "../Resume";
import { PortfolioType } from "../../types";
import { useAnimationAPI } from "../../Provider/AnimationProvider";

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
  "work",
];

const Portfolio = React.forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  const { setAnimationType, setPortfolio } = useAnimationAPI();

  function renderItem() {
    return PortfolioItems.map((item) => {
      return (
        <motion.div
          layout
          onClick={() => {
            setPortfolio(item);
            setAnimationType("expand");
          }}
          key={item}
        >
          {item === "about" && <About />}
          {item === "work" && <Work />}
          {item === "experience" && <Experience />}
          {item === "contact" && <Contact />}
          {item === "resume" && <Resume />}
        </motion.div>
      );
    });
  }

  return (
    <ViewContent
      initial="init"
      animate="enter"
      variants={variants}
      ref={ref}
      {...props}
    >
      {renderItem()}
    </ViewContent>
  );
});

Portfolio.displayName = "Portfolio";

export default motion(Portfolio);
