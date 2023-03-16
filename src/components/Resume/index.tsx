import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedResume from "./Expanded";

function Resume() {
  return (
    <PortfolioItem
      name="resume"
      bgColor="rgba(203,188,161,1)"
      height="18%"
      width="20%"
      left="5%"
      top="12%"
      expandedComponent={<ExpandedResume />}
      backgroundComponent={
        <Lottie
          portfolioItemName="resume"
          defaultFrame={120}
          src="https://assets3.lottiefiles.com/packages/lf20_4DLPlW.json"
        />
      }
    />
  );
}

export default Resume;
