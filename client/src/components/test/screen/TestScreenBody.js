import React from "react";
import styled from "styled-components/macro";

const TestScreenBody = ({ proceeding }) => {
  const nickname = window.localStorage.getItem("nick");

  return (
    <BodyBlock>
      {proceeding.count < 7 ? (
        <ProblemBox>
          <ProblemKeyboard>
            {/* {tttt.length !== 9 ? (
              <PrintProblem ref={problemPrint}>{tttt}</PrintProblem>
            ) : (
              <PrintProblem ref={problemPrint}></PrintProblem>
            )} */}
            <textarea
              type="text"
              spellCheck="false"
              //   maxLength={tt.length}
              autoFocus
              //   ref={textareaInput}
            ></textarea>
          </ProblemKeyboard>
        </ProblemBox>
      ) : (
        <PrintResult>
          {nickname ? (
            <UserInfo>{nickname}님의 기록</UserInfo>
          ) : (
            <UserInfo>Guest님의 기록</UserInfo>
          )}
          <RecordPrintBox>
            <SpeedRecord>
              <textarea
                type="text"
                readOnly
                //   ref={textareaInput}
              ></textarea>
              <div>평균</div>
              <div>
                {Math.round(proceeding.accumulateSpeed / proceeding.count)}타수
              </div>
            </SpeedRecord>
            <TimeRecord>
              <div>시간</div>
              <div>{proceeding.time.toFixed(1)}초 걸렸습니다</div>
            </TimeRecord>
          </RecordPrintBox>
        </PrintResult>
      )}
    </BodyBlock>
  );
};

export default TestScreenBody;

const BodyBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 40%;
`;

const ProblemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 70%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 80%;
  }

  @media all and (max-width: 767px) {
  }
`;

const ProblemKeyboard = styled.div`
  width: 80%;

  textarea {
    width: 100%;
    margin-top: 5px;
    height: 5vh;
    overflow: hidden;
    resize: none;
    color: white;
    background-color: black;
    border-radius: 5px;
    font-size: max(0.7em, 1.5vw);
    border-left: none;
    border-right: none;

    &:focus {
      outline: none;
    }
  }
`;

const PrintResult = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
`;

const RecordPrintBox = styled.div`
  display: grid;
  grid-template-rows: 1.5fr 1.5fr 1.5fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: left;
  color: #e53a40;
  font-size: max(0.8em, 1.4vw);
`;

const SpeedRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(3) {
      color: white;
      text-align: left;
    }
  }

  textarea {
    display: none;
  }
`;

const TimeRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(2) {
      color: white;
      text-align: left;
    }
  }
`;

const UserInfo = styled.div`
  width: 100%;
  color: #efdc05;
  font-size: max(0.7em, 1.4vw);
`;