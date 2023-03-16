import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedProject from "./Expanded";

function Work() {
  return (
    <PortfolioItem
      name="project"
      bgColor="rgba(228,179,87,1)"
      height="24%"
      width="24%"
      left="68%"
      top="18%"
      backgroundComponent={
        <Lottie
          portfolioItemName="project"
          defaultFrame={100}
          src="https://assets6.lottiefiles.com/packages/lf20_w98qte06.json"
        />
      }
      expandedComponent={<ExpandedProject />}
    />
  );
}

export default Work;
