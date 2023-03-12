import { ReactNode } from "react";
import styled from "styled-components";

const Font = styled.span`
  font-family: "Rampart One", cursive;
  color: var(--color-black);
  font-weight: 900;
  font-style: italic;
  > a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
`;

type Props = {
  children: ReactNode;
};

const Link = ({ children }: Props) => {
  return <Font>{children}</Font>;
};

export default Link;
