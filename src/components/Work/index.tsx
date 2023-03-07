import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

export default function Resume() {
  return (
    <PortfolioItem
      bgColor="var(--color-green)"
      height="18%"
      width="20%"
      left="5%"
      top="12%"
    >
      <Lottie src="https://assets3.lottiefiles.com/packages/lf20_4DLPlW.json" />
    </PortfolioItem>
  );
}
