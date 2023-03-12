import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Text = styled.p`
  font-size: 1.6em;
  color: var(--color-black);
  font-style: italic;
`;

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Paragraph = ({ children, ...props }: Props) => {
  return <Text {...props}>{children}</Text>;
};

export default Paragraph;
