import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 1em;

  position: absolute;
`;

type Props = {
  className?: string;
  style: React.CSSProperties;
};

export default function PortfolioItem(props: Props) {
  return <Wrapper {...props} />;
}
