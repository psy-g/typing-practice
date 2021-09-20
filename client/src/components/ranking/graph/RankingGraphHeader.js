import React from "react";
import styled from "styled-components";

const RankingGraphHeader = ({ selectName }) => {
  const nickname = window.localStorage.getItem("nick");

  return (
    <HeaderBlock>
      <UserName>
        {!nickname ? (
          <>
            <div>Guest&nbsp;&nbsp;</div>
            <div></div>
          </>
        ) : (
          <>
            <div>{nickname}&nbsp;&nbsp;</div>
            <div></div>
          </>
        )}
      </UserName>
      <RankerName>
        <div>{selectName}&nbsp;&nbsp;</div>
        <div></div>
      </RankerName>
    </HeaderBlock>
  );
};

export default RankingGraphHeader;

const HeaderBlock = styled.div`
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const UserName = styled.div`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  div {
    &:nth-child(1) {
      font-size: max(0.5em, 0.6vw);
    }
    &:nth-child(2) {
      width: 5%;
      height: 100%;
      background: #30a9de;
      margin-right: 10px;
    }
  }
`;

const RankerName = styled.div`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  div {
    &:nth-child(1) {
      font-size: max(0.5em, 0.6vw);
    }
    &:nth-child(2) {
      width: 5%;
      height: 100%;
      background: #e53a40;
      margin-right: 10px;
    }
  }
`;
