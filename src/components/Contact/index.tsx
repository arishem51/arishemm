import React from "react";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Contact() {
  return (
    <PortfolioItem
      name="contact"
      bgColor="var(--color-green-2)"
      height="14%"
      width="12%"
      left="45%"
      top="62%"
      backgroundComponent={
        <Lottie src="https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json" />
      }
      expandedComponent={
        <div style={{ width: window.innerWidth, height: 1000 }} />
      }
    />
  );
}

export default Contact;
