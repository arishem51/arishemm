import { motion } from "framer-motion";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Work() {
  return (
    <PortfolioItem
      name="work"
      bgColor="var(--color-orange)"
      height="24%"
      width="24%"
      left="68%"
      top="18%"
    >
      <Lottie src="https://assets2.lottiefiles.com/packages/lf20_eeuhulsy.json" />
    </PortfolioItem>
  );
}

export default Work;
