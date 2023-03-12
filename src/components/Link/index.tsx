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
  href: string;
};

const Link = ({ children, href }: Props) => {
  return (
    <Font>
      <a rel="noreferrer" target="_blank" href={href}>
        {children}
      </a>
    </Font>
  );
};

export default Link;
