import React from "react";
import styled from "styled-components/macro";

const TestPowerRight = () => {
  return (
    <RightBlock>
      <p></p>
      <p>랜덤</p>
    </RightBlock>
  );
};

export default TestPowerRight;

const RightBlock = styled.div`
  display: none;

  p {
    &:nth-child(1) {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      border-color: transparent white transparent transparent;
      z-index: 10;
      margin: 0px;
    }
    &:nth-child(2) {
      border-radius: 8px;
      background: white;
      border: solid transparent;
      color: black;
      border-width: 10px;
      z-index: 10;
      margin: 0px;
    }
  }
`;
