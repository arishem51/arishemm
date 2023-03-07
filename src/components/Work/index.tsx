import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

export default function Work() {
  return (
    <PortfolioItem
      bgColor="var(--color-green)"
      height="18%"
      width="20%"
      left="5%"
      top="12%"
    >
      <Lottie src="https://assets2.lottiefiles.com/packages/lf20_eeuhulsy.json" />
    </PortfolioItem>
  );
}
