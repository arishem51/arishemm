import React from "react";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Experience() {
  return (
    <PortfolioItem
      name="experience"
      bgColor="rgba(142,135,168,1)"
      height="18%"
      width="16%"
      left="12%"
      top="40%"
      expandedComponent={
        <div style={{ width: window.innerWidth, height: 1000 }} />
      }
      backgroundComponent={
        <Lottie src="https://assets2.lottiefiles.com/packages/lf20_7hKWkHQFtm.json" />
      }
    />
  );
}

export default Experience;
