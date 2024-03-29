import React from "react";
import styled from "styled-components/macro";

import TestMonitorHead from "components/test/screen/TestScreenHead";
import TestMonitorBody from "components/test/screen/TestScreenBody";
import TestMonitorBottom from "components/test/screen/TestScreenBottom";
import backgroundImg from "image/rankback.png";

const TestScreenContainer = ({
  proceeding,
  toggle,
  timer,
  rankerArr,
  textareaInput,
  isLogged,
  keydownEvent,
  requestProblem,
  selectHandler,
}) => {
  return (
    <MonitorBlock>
      <TestMonitorHead
        proceeding={proceeding}
        toggle={toggle}
        requestProblem={requestProblem}
        selectHandler={selectHandler}
      />
      <TestMonitorBody
        proceeding={proceeding}
        textareaInput={textareaInput}
        isLogged={isLogged}
        keydownEvent={keydownEvent}
      />
      <TestMonitorBottom
        proceeding={proceeding}
        timer={timer}
        rankerArr={rankerArr}
      />
    </MonitorBlock>
  );
};

export default TestScreenContainer;

const MonitorBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  max-width: 960px;
  height: 55vh;
  text-align: center;
  background: url(${backgroundImg});
  z-index: 1;
  border: solid 15px #383a3f;
  border-bottom-width: 25px;
  border-top-width: 25px;
  border-radius: 0.6rem 0.6rem 0 0;
  font-size: 20px;
  color: white;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 90%;
  }

  @media all and (max-width: 767px) {
    height: 90%;
  }
`;
