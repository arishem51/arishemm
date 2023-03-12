import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import Expanded from "./Expanded";

function Experience() {
  return (
    <PortfolioItem
      name="experience"
      bgColor="rgba(90,84,168,1)"
      height="18%"
      width="16%"
      left="12%"
      top="40%"
      expandedComponent={<Expanded />}
      backgroundComponent={
        <Lottie src="https://assets2.lottiefiles.com/packages/lf20_7hKWkHQFtm.json" />
      }
    />
  );
}

export default Experience;
