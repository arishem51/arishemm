import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import Expanded from "./Expanded";

function Experience() {
  return (
    <PortfolioItem
      name="experience"
      bgColor="rgba(90,84,168,1)"
      height="24%"
      width="26%"
      left="12%"
      top="50%"
      backgroundComponent={
        <Lottie
          portfolioItemName="experience"
          defaultFrame={55}
          src="https://assets1.lottiefiles.com/packages/lf20_POwu1GiXc2.json
          "
        />
      }
      expandedComponent={<Expanded />}
    />
  );
}

export default Experience;
