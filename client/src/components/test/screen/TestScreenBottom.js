import React from "react";
import styled from "styled-components/macro";

import { Link } from "react-router-dom";

const TestScreenBottom = ({ proceeding }) => {
  return (
    <>
      {proceeding.count < 7 ? (
        <BottomBlock>{/* <Timer ref={timerPrint}>00:00</Timer> */}</BottomBlock>
      ) : (
        <BottomBlock>
          <PrintRank>
            <div>
              순위 <Link to="/ranking">🏆</Link>
            </div>
            {/* <div ref={rankTarget}></div> */}
            {/* <Timer ref={timerPrint}>00:00</Timer> */}
          </PrintRank>
        </BottomBlock>
      )}
    </>
  );
};

export default TestScreenBottom;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  height: 40%;
`;

const Timer = styled.span`
  margin-top: 5px;
  font-size: max(0.8em, 1vw);
`;

const PrintRank = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  div {
    &:nth-child(1) {
      color: #efdc05;
      font-size: 14px;
      height: 15%;

      @media all and (min-width: 768px) and (max-width: 1023px) {
        font-size: 12px;
      }
    }
    &:nth-child(2) {
      height: 100%;

      div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &:nth-child(1) {
          height: 100%;

          div {
            &:nth-child(1) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
            &:nth-child(2) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
            &:nth-child(3) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              height: 100%;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
          }
        }
      }
    }
  }
`;
