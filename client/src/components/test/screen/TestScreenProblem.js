import React from "react";
import styled from "styled-components/macro";

const TestScreenProblem = ({ word }) => {
  return (
    <ProblemBlock>
      {word === " " ? <span>&nbsp;</span> : <Word>{word}</Word>}
    </ProblemBlock>
  );
};

export default TestScreenProblem;

const ProblemBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: max(0.7em, 1.5vw);
`;

const Word = styled.span``;
