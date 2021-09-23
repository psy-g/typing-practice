import React from "react";
import styled from "styled-components/macro";

import { ProblemInfo } from "constant";

const TestScreenHead = ({
  proceeding,
  toggle,
  requestProblem,
  selectHandler,
}) => {
  return (
    <HeadBlock>
      <SpeedWrapper>
        <div>타수</div>
        <div>{proceeding.speed}</div>
      </SpeedWrapper>
      <TitleWrapper>
        <Title onClick={selectHandler}>
          {proceeding.title}
          <DropMenu drop={toggle}>
            <span onClick={() => requestProblem(ProblemInfo.NO1)}>
              {ProblemInfo.NO1}
            </span>
            <span onClick={() => requestProblem(ProblemInfo.NO2)}>
              {ProblemInfo.NO2}
            </span>
            <span onClick={() => requestProblem(ProblemInfo.NO3)}>
              {ProblemInfo.NO3}
            </span>
          </DropMenu>
          {proceeding.count < 7 && (
            <Counter>{proceeding.count + 1} / 7</Counter>
          )}
        </Title>
      </TitleWrapper>
      <AccuracyWrapper>
        <div>정확도</div>
        <div>{proceeding.accuracy}</div>
      </AccuracyWrapper>
    </HeadBlock>
  );
};

export default TestScreenHead;

const HeadBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 65%;
  height: 20%;
`;

const SpeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #efdc05;
  font-size: max(0.6em, 1.3vw);
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  font-size: max(0.5em, 1.1vw);
`;

const DropMenu = styled.div`
  display: ${(props) => (props.drop ? "block" : "none")};
  min-width: 90px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 15;
  border-radius: 0px 0px 5px 5px;
  font-size: max(0.5em, 0.5vw);
  flex-direction: column;

  span {
    color: white;
    padding: 10px 4px;
    display: block;
  }
`;

const AccuracyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;
