import {
  LayoutGroup,
  motion,
  useAnimationControls,
  Variants,
} from "framer-motion";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  useAnimationSlideUpProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import ListItem from "./ListItem";
import Stack from "../Stack";
import { useEffect } from "react";

const Wrapper = styled(motion.nav)`
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
`;

const List = styled(Stack)`
  padding: 0.25em;

  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2em;
`;

const Menu: PortfolioType[] = [
  "about",
  "project",
  "experience",
  "contact",
  "resume",
];

const variants: Variants = {
  initial: {
    opacity: 0,
    zIndex: -1,
  },
  visible: {
    opacity: 1,
    zIndex: 2,
  },
};

const Navbar = () => {
  const { setPortfolio, setAnimationType, setIsAnimationSlideUpRunning } =
    useAnimationAPIProvider();
  const { portfolio } = usePortfolioProvider();
  const { isAnimationSlideUpRunning } = useAnimationSlideUpProvider();
  const controls = useAnimationControls();

  useEffect(() => {
    if (portfolio) {
      controls.start("visible", {
        delay: 0.75,
      });
    } else {
      controls.start("initial");
    }
  }, [controls, portfolio]);

  function handleItemClick(item: PortfolioType) {
    if (isAnimationSlideUpRunning || portfolio === item) {
      return;
    }
    setIsAnimationSlideUpRunning(true);
    setPortfolio(item);
    setAnimationType("slideUp");
  }

  const renderItem = () => {
    return Menu.map((item, index) => {
      return (
        <ListItem
          key={item + index}
          onClick={() => {
            handleItemClick(item);
          }}
          active={portfolio === item}
        >
          {item}
        </ListItem>
      );
    });
  };

  return (
    <Wrapper animate={controls} variants={variants} initial="initial">
      <LayoutGroup>
        <List htmlElement="ul">{renderItem()}</List>
      </LayoutGroup>
    </Wrapper>
  );
};

export default Navbar;
