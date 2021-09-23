import React from "react";
import styled from "styled-components/macro";

import powerBtn1 from "image/power.png";
import powerBtn2 from "image/power_on.png";

const TestPowerCenter = ({ proceeding, isLogged }) => {
  return (
    <CenterBlock>
      {proceeding.count < 7 ? (
        <>
          {!isLogged ? (
            <PowerBtn1
              alt="randomBtn"
              // onClick={requestProblem}
            />
          ) : (
            <PowerBtn2
              alt="randomBtn"
              // onClick={requestProblem}
            />
          )}
        </>
      ) : (
        <>
          {!isLogged ? (
            <PowerBtn1
              alt="randomBtn"
              // onClick={requestRefresh}
            />
          ) : (
            <PowerBtn2
              alt="randomBtn"
              // onClick={requestRefresh}
            />
          )}
        </>
      )}
    </CenterBlock>
  );
};

export default TestPowerCenter;

const CenterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PowerBtn1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn1});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

const PowerBtn2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn2});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

/* &:hover + ${Right} {
    display: flex;
    justify-content: left;
    align-items: center;
  } */
