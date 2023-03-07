import React from "react";
import styled from "styled-components";
import { Portfolios } from "../../constant";
import PortfolioItem from "./PortfolioItem";

const ViewContent = styled.div`
  width: 140vmax;
  height: 100vmax;
  background: var(--color-black);

  position: absolute;
`;

export default function Portfolio() {
  return (
    <ViewContent>
      {Portfolios.map((item) => (
        <PortfolioItem key={item.id} style={item.style} />
      ))}
    </ViewContent>
  );
}
