import React from "react";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Resume() {
  return (
    <PortfolioItem
      name="resume"
      bgColor="var(--color-green)"
      height="18%"
      width="20%"
      left="5%"
      top="12%"
      expandedComponent={
        <div style={{ width: window.innerWidth, height: 1000 }} />
      }
      backgroundComponent={
        <Lottie src="https://assets3.lottiefiles.com/packages/lf20_4DLPlW.json" />
      }
    />
  );
}

export default Resume;
