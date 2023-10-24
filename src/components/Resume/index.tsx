import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedResume from "./Expanded";

const PortfolioProperties = {
  height: "22%",
  width: "24%",
  left: "5%",
  top: "12%",
  bgColor: "rgba(203,188,161,1)",
};

function Resume() {
  return (
    <PortfolioItem
      name="resume"
      {...PortfolioProperties}
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
