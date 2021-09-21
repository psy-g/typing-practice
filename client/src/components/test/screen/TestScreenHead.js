import React from "react";
import styled from "styled-components/macro";

import { ProblemInfo } from "constant";

const TestScreenHead = ({ proceeding, toggle, selectHandler }) => {
  console.log("proceeding", proceeding.title);

  return (
    <HeadBlock>
      <SpeedWrapper>
        <div>타수</div>
        <div>{proceeding.speed}</div>
      </SpeedWrapper>
      <TitleWrapper>
        <Title onClick={() => selectHandler(ProblemInfo.NO1)}>
          {proceeding.title}
          <DropMenu drop={toggle}>
            <span onClick={() => selectHandler(ProblemInfo.NO1)}>
              {ProblemInfo.NO1}
            </span>
            <span onClick={() => selectHandler(ProblemInfo.NO2)}>
              {ProblemInfo.NO2}
            </span>
            <span onClick={() => selectHandler(ProblemInfo.NO3)}>
              {ProblemInfo.NO3}
            </span>
          </DropMenu>
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