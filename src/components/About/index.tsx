import React from "react";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function About() {
  return (
    <PortfolioItem
      name="about"
      height="20%"
      width="14%"
      left="42%"
      top="24%"
      bgColor="rgba(221,229,216,1)"
      backgroundComponent={
        <Lottie src="https://assets2.lottiefiles.com/packages/lf20_v1yudlrx.json" />
      }
      expandedComponent={
        <div style={{ width: window.innerWidth, height: 1000 }} />
      }
    />
  );
}

export default About;
