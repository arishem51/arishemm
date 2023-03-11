import React from "react";
import styled from "styled-components";

const Text = styled.h1`
  color: var(--color-black);
  font-size: 3em;
`;

type Props = {
  children?: React.ReactNode;
};

const Heading = ({ children }: Props) => {
  return <Text>{children}</Text>;
};

export default Heading;
