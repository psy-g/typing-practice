import React from "react";
import styled, { keyframes } from "styled-components";

const RankingGraphDetail = ({ best, user }) => {
  return (
    <>
      <DetailBlock>
        <UserGraph user={user} />
        <BestGraph best={best} />
      </DetailBlock>
    </>
  );
};

export default RankingGraphDetail;

const DetailBlock = styled.span`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  margin: 0px;
  z-index: 2;
`;

const graphAnimaiton = (input) => keyframes`
  from {
      height: 0;
  }
  to {
      height: ${input}%;
  }
`;

const UserGraph = styled.li`
  width: 30%;
  height: ${(props) => Math.floor((props.user / 750) * 100)}%;
  background: #30a9de;
  max-height: 100%;
  z-index: 1;
  animation: ${graphAnimaiton} 3s;

  :hover:before {
    content: "${(props) => props.user}";
  }
`;

const BestGraph = styled.li`
  width: 30%;
  height: ${(props) => Math.floor((props.best / 750) * 100)}%;
  background: #e53a40;
  max-height: 100%;
  animation: ${graphAnimaiton} 3s;

  :hover:before {
    content: "${(props) => props.best}";
  }
`;
