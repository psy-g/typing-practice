import React from "react";
import styled from "styled-components";

import RankingTableContainer from "components/ranking/table/RankingTableContainer";
import { useRankingService } from "components/ranking/RankingService";

const RankingContainer = () => {
  const { rank, record } = useRankingService();

  return (
    <Container>
      <Wrapper>
        <RankingTableContainer rank={rank} record={record} />
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
