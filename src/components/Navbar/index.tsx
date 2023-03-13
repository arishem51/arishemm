import { LayoutGroup } from "framer-motion";
import styled from "styled-components";
import {
  useAnimationAPIProvider,
  useAnimationSlideUpProvider,
  usePortfolioProvider,
} from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import ListItem from "./ListItem";
import Stack from "../Stack";

const Wrapper = styled.nav`
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

const Navbar = () => {
  const { setPortfolio, setAnimationType, setisAnimationSlideUpRunning } =
    useAnimationAPIProvider();
  const { portfolio } = usePortfolioProvider();
  const { isAnimationSlideUpRunning } = useAnimationSlideUpProvider();

  function handleItemClick(item: PortfolioType) {
    if (isAnimationSlideUpRunning || portfolio === item) {
      return;
    }
    setisAnimationSlideUpRunning(true);
    setPortfolio(item);
    setAnimationType("slideUp");
  }

  function renderItem() {
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
  }

  if (!portfolio) {
    return null;
  }

  return (
    <Wrapper>
      <LayoutGroup>
        <List htmlElement="ul">{renderItem()}</List>
      </LayoutGroup>
    </Wrapper>
  );
};

export default Navbar;
