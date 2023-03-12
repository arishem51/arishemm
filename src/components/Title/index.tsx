import { ReactNode } from "react";
import styled from "styled-components";

const Text = styled.h1`
  color: var(--color-black);
  font-size: 2.8em;
  font-family: "Rampart One", cursive;
`;

type Props = {
  children?: ReactNode;
};

const Title = ({ children }: Props) => {
  return <Text>{children}</Text>;
};

export default Title;
