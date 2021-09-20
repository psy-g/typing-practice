import React from "react";
import styled from "styled-components";

import RankingTableHead from "components/ranking/table/RankingTableHead";
import RankingTableBody from "components/ranking/table/RankingTableBody";
import RankingTableBottom from "components/ranking/table/RankingTableBottom";
import backgroundImg from "image/rankback.png";

const RankingTableContainer = ({
  rank,
  record,
  toggle,
  menuTitle,
  printHandler,
  selectHandler,
  rankerChangeHandler,
}) => {
  return (
    <Container>
      <RankingTableHead
        printHandler={printHandler}
        selectHandler={selectHandler}
        toggle={toggle}
        menuTitle={menuTitle}
      />
      <RankingTableBody rank={rank} rankerChangeHandler={rankerChangeHandler} />
      <RankingTableBottom rank={rank} record={record} />
    </Container>
  );
};

export default RankingTableContainer;

const Container = styled.div`
  width: 80%;
  max-width: 900px;
  height: 65vh;
  min-height: 580px;
  background: url(${backgroundImg});
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
  box-shadow: 0 2px 5px 0 rgb(96 96 96 / 16%),
    2px 10px 23px 0 rgb(96 96 96 / 13%);
  padding: 20px 40px 40px 40px;
  padding-bottom: 20px;
  color: #fffff3;
`;
