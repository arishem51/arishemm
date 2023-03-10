import React from "react";
import { LayoutGroup } from "framer-motion";
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

  padding: 2px;

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
  const { portfolio, setPortfolio, setAnimationType } = useAnimationProvider();

  function renderItem() {
    return Menu.map((item, index) => {
      return (
        <ListItem
          key={item + index}
          onClick={() => {
            setPortfolio(item);
            setAnimationType("slideUp");
          }}
          active={portfolio === item}
        >
          {item}
        </ListItem>
      );
    });
  }

  return (
    <Wrapper>
      <LayoutGroup>
        <List>{renderItem()}</List>
      </LayoutGroup>
    </Wrapper>
  );
};

export default Navbar;
