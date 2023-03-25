import Lottie from "../Lottie";
import PortfolioItem from "../PortfolioItem";
import ExpandedContact from "./Expanded";

function Contact() {
  return (
    <PortfolioItem
      name="contact"
      bgColor="var(--color-green-2)"
      height="24%"
      width="24%"
      left="55%"
      top="62%"
      backgroundComponent={
        <Lottie
          portfolioItemName="contact"
          defaultFrame={61}
          src="https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json"
        />
      }
      expandedComponent={<ExpandedContact />}
    />
  );
}

export default Contact;
