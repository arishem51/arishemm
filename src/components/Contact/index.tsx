import { motion } from "framer-motion";
import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";

function Contact() {
  return (
    <PortfolioItem
      bgColor="var(--color-green-2)"
      height="14%"
      width="12%"
      left="45%"
      top="62%"
    >
      <Lottie src="https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json" />
    </PortfolioItem>
  );
}

export default Contact;
