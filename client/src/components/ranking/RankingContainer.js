import React from "react";
import styled from "styled-components";

import { useRankingService } from "components/ranking/RankingService";
import RankingTableContainer from "components/ranking/table/RankingTableContainer";
import RankingGraphContainer from "components/ranking/graph/RankingGraphContainer";

const RankingContainer = () => {
  const {
    rank,
    record,
    toggle,
    menuTitle,
    printHandler,
    selectHandler,
    rankerChangeHandler,
  } = useRankingService();

  return (
    <Container>
      <Wrapper>
        <RankingTableContainer
          rank={rank}
          record={record}
          toggle={toggle}
          menuTitle={menuTitle}
          printHandler={printHandler}
          selectHandler={selectHandler}
          rankerChangeHandler={rankerChangeHandler}
        />
        <RankingGraphContainer record={record} rank={rank} />
      </Wrapper>
    </Container>
  );
};

export default RankingContainer;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  min-width: 500px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
