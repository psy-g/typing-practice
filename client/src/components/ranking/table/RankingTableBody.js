import React from "react";
import styled from "styled-components";

const RankingTableBody = ({ rank, rankerChangeHandler }) => {
  return (
    <BodyBlock>
      <Table>
        <thead>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>타수</th>
            <th>시간</th>
          </tr>
        </thead>
        <TableBody>
          {rank.all
            ? rank.all.map((ele, idx) => (
                <tr key={idx} onClick={() => rankerChangeHandler(ele)}>
                  <td>{idx + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.average}타수</td>
                  <td>{ele.time}초</td>
                </tr>
              ))
            : null}
        </TableBody>
      </Table>
    </BodyBlock>
  );
};

export default RankingTableBody;

const BodyBlock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    border-bottom: 1px solid #444444;
    padding: 5px;
    background-color: #1a1919;

    &:nth-child(1) {
      width: 20%;
      color: #e53a40;
    }
    &:nth-child(2) {
      width: 30%;
      text-align: left;
      color: #e53a40;
    }
    &:nth-child(3) {
      width: 25%;
      text-align: left;
      color: #e53a40;
    }
    &:nth-child(4) {
      width: 25%;
      text-align: left;
      color: #e53a40;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    text-align: center;
    &:hover {
      cursor: pointer;
    }

    &:nth-child(-n + 3) {
      // 1~3번째
      color: #ff8000;
    }
    &:nth-child(n + 4) {
      // 4번째~
      color: #a335ee;
    }
    &:nth-child(2n) {
      // 짝수
      background-color: #353535;
    }
    &:nth-child(2n + 1) {
      // 홀수
      background-color: #4e4e4e;
    }
    &:nth-child(n + 11) {
      display: none;
    }
    &:hover {
      background-color: #2a1a1a;
    }
  }

  td {
    border-bottom: 1px solid #1a1919;
    padding: 10px 10px 10px 5px;

    &:nth-child(n + 2) {
      text-align: left;
      color: white;
    }
  }
`;
