import { LayoutGroup, Transition, useAnimate } from "framer-motion";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  useAnimationRunningProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import ListItem from "./ListItem";
import Stack from "../Stack";
import { useEffect } from "react";

const Wrapper = styled.nav`
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
  opacity: 0;
  z-index: -1;
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

const animation = {
  visible: {
    opacity: 1,
    zIndex: 2,
  },
  hidden: {
    opacity: 0,
    zIndex: -1,
  },
};

const transition: Transition = {
  delay: 0.75,
};

const Navbar = () => {
  const { setPortfolio, setAnimationType, setIsAnimationRunning } =
    useAnimationAPIProvider();
  const portfolio = usePortfolioProvider();
  const { isAnimationRunning } = useAnimationRunningProvider();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (portfolio) {
      animate(scope.current, animation.visible, transition);
    } else {
      animate(scope.current, animation.hidden);
    }
  }, [animate, portfolio, scope]);

  function handleItemClick(item: PortfolioType) {
    if (isAnimationRunning || portfolio === item) {
      return;
    }
    setPortfolio(item);
    setAnimationType("slideUp");
    setIsAnimationRunning(true);
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
    <Wrapper ref={scope}>
      <LayoutGroup>
        <List htmlElement="ul">{renderItem()}</List>
      </LayoutGroup>
    </Wrapper>
  );
};

export default Navbar;
