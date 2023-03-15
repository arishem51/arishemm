import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedContact from "./Expanded";

function Contact() {
  return (
    <PortfolioItem
      name="contact"
      bgColor="var(--color-green-2)"
      height="14%"
      width="12%"
      left="45%"
      top="62%"
      backgroundComponent={
        <Lottie
          defaultFrame={61}
          src="https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json"
        />
      }
      expandedComponent={<ExpandedContact />}
    />
  );
}

export default Contact;
