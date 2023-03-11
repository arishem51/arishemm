import React from "react";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Work() {
  return (
    <PortfolioItem
      name="work"
      bgColor="rgba(228,179,87,1)"
      height="24%"
      width="24%"
      left="68%"
      top="18%"
      backgroundComponent={
        <Lottie src="https://assets2.lottiefiles.com/packages/lf20_eeuhulsy.json" />
      }
      expandedComponent={
        <div style={{ width: window.innerWidth, height: 1000 }} />
      }
    />
  );
}

export default Work;
