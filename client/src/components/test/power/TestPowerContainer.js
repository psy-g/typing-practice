import React from "react";
import styled from "styled-components/macro";

import TestPowerLeft from "components/test/power/TestPowerLeft";
import TestPowerCenter from "components/test/power/TestPowerCenter";
import TestPowerRight from "components/test/power/TestPowerRight";

const TestPowerContainer = ({ proceeding, isLogged }) => {
  return (
    <Container>
      <TestPowerLeft />
      <TestPowerCenter proceeding={proceeding} isLogged={isLogged} />
      <TestPowerRight />
    </Container>
  );
};

export default TestPowerContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  width: 80vw;
  max-width: 960px;
  height: 13vh;
  text-align: center;
  background-color: #cadbe9;
  border-top-width: 2.5px;
  border-top-style: solid;
  border-top-color: #090707;
  border-radius: 0 0 0.6rem 0.6rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;
