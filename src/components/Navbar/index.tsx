import React from "react";
import styled from "styled-components";
import { useAnimationProvider } from "../../Provider/AnimationProvider";
import { PortfolioType } from "../../types";
import ListItem from "./ListItem";

const Wrapper = styled.nav`
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
`;

const List = styled.ul`
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2em;
`;

const Menu: PortfolioType[] = [
  "about",
  "work",
  "experience",
  "contact",
  "resume",
];

const Navbar = () => {
  const { portfolio, setPortfolio } = useAnimationProvider();

  function renderItem() {
    return Menu.map((item, index) => {
      return (
        <ListItem
          key={item + index}
          onClick={() => setPortfolio(item)}
          active={portfolio === item}
        >
          {item}
        </ListItem>
      );
    });
  }

  return (
    <Wrapper>
      <List>{renderItem()}</List>
    </Wrapper>
  );
};

export default Navbar;
