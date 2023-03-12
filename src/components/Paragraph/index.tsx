import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Text = styled.p`
  font-size: 1.8em;
  color: var(--color-black);
`;

type Props = {
  children: ReactNode;
} & HTMLAttributes<HTMLParagraphElement>;

const Paragraph = ({ children, ...props }: Props) => {
  return <Text {...props}>{children}</Text>;
};

export default Paragraph;
