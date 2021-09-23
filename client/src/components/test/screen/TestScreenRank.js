import React from "react";
import styled from "styled-components/macro";

const TestScreenRank = ({ data, rank }) => {
  return (
    <RankBlock>
      <RankerTitle>
        <span>#{rank}</span>
        <span>{data.name}</span>
        <span>{data.average}타수</span>
        <span>{data.time}초</span>
      </RankerTitle>
    </RankBlock>
  );
};

export default TestScreenRank;

const RankBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RankerTitle = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;

  span:nth-child(1) {
    color: #e53a40;
  }
`;
