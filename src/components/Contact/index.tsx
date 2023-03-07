import { motion } from "framer-motion";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

export default function Contact() {
  return (
    <PortfolioItem
      bgColor="var(--color-green-2)"
      height="14%"
      width="12%"
      left="45%"
      top="62%"
    >
      <Lottie src="https://assets2.lottiefiles.com/packages/lf20_v1yudlrx.json" />
    </PortfolioItem>
  );
}
