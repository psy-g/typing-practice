import React from "react";
import styled from "styled-components/macro";

import TestMonitor from "components/test/screen/TestScreenContainer";
import TestKeyboard from "components/test/keyboard/TestKeyboardContainer";
import { useTestService } from "components/test/TestService";

const TestContainer = () => {
  const { proceeding, toggle, selectHandler } = useTestService();

  return (
    <Container>
      <Wrapper>
        <TestMonitor
          proceeding={proceeding}
          selectHandler={selectHandler}
          toggle={toggle}
        />
        <TestKeyboard />
      </Wrapper>
    </Container>
  );
};

export default TestContainer;

const Container = styled.div`
  width: 100%;
  height: 90vh;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 100vh;
  }

  @media all and (max-width: 767px) {
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
