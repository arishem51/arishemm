import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedAbout from "./Expanded";

function About() {
  return (
    <PortfolioItem
      name="about"
      height="20%"
      width="16%"
      left="42%"
      top="24%"
      bgColor="rgba(221,229,216,1)"
      backgroundComponent={
        <Lottie
          portfolioItemName="about"
          defaultFrame={105}
          src="https://assets7.lottiefiles.com/packages/lf20_puciaact.json"
        />
      }
      expandedComponent={<ExpandedAbout />}
    />
  );
}

export default About;
