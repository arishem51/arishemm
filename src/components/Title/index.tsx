import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Text = styled.h1`
  color: var(--color-black);
  font-size: 2.8rem;
  font-family: "Rampart One", cursive;
`;

type Props = {
  children?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const Title = ({ children, ...props }: Props) => {
  return <Text {...props}>{children}</Text>;
};

export default Title;
