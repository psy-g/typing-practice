import React from "react";
import styled from "styled-components";

import RankingGraphHeader from "components/ranking/graph/RankingGraphHeader";
import RankingGraphBody from "components/ranking/graph/RankingGraphBody";

const RankingGraphContainer = ({ record, rank }) => {
  return (
    <Container>
      <Block>
        <RankingGraphHeader selectName={rank.selectId} />
        <RankingGraphBody record={record} rank={rank} />
      </Block>
    </Container>
  );
};

export default RankingGraphContainer;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  max-width: 900px;
  min-width: 300px;
  height: 17rem;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 95%;
  background: #f0f5f9;
  box-shadow: 0 2px 5px 0 rgb(96 96 96 / 16%),
    2px 10px 23px 0 rgb(96 96 96 / 13%);
  padding: 10px;
`;
