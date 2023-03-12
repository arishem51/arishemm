import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3em;
  margin-top: 2em;
`;

const Button = styled.button`
  padding: 12px 16px;

  background: none;

  border: 2px solid var(--color-black);
  border-radius: 1em;

  outline: none;
  cursor: pointer;

  > a {
    all: unset;
  }
`;

type Props = {
  githubLink: string;
  vercelLink: string;
};

const Actions = ({ githubLink, vercelLink }: Props) => {
  return (
    <Wrapper>
      <a rel="noreferrer" target="_blank" href={githubLink}>
        <Button>View in Github</Button>
      </a>
      <a rel="noreferrer" target="_blank" href={vercelLink}>
        <Button>View website</Button>
      </a>
    </Wrapper>
  );
};

export default Actions;
