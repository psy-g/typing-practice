import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

import TestScreenRank from "components/test/screen/TestScreenRank";

const TestScreenBottom = ({ proceeding, timer, rankerArr }) => {
  return (
    <>
      {proceeding.count < 7 ? (
        <BottomBlock>
          <Timer>{timer}초</Timer>
        </BottomBlock>
      ) : (
        <BottomBlock>
          <PrintRank>
            <Title>
              순위 <Link to="/ranking">🏆</Link>
            </Title>
            {rankerArr.map(
              (ele, idx) =>
                idx < 3 && (
                  <TestScreenRank key={idx} data={ele} rank={idx + 1} />
                )
            )}
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
`;

const Title = styled.div`
  color: #efdc05;
`;
