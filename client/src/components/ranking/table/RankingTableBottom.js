import React, { useRef } from "react";
import styled from "styled-components";

const RankingTableBottom = ({ rank, record }) => {
  const nickname = window.localStorage.getItem("nick");
  const mouseTable = useRef();
  const bubble1 = useRef();
  const bubble2 = useRef();
  const triangle = useRef();

  const mouseEventHandler = () => {
    if (!nickname) {
      mouseTable.current.onmouseover = function (event) {
        bubble1.current.style.display = "block";
        triangle.current.style.display = "block";
      };
    } else if (record.user.length === 0) {
      mouseTable.current.onmouseover = function (event) {
        bubble2.current.style.display = "block";
        triangle.current.style.display = "block";
      };
    }

    mouseTable.current.onmouseout = function (event) {
      bubble1.current.style.display = "none";
      bubble2.current.style.display = "none";
      triangle.current.style.display = "none";
    };
  };

  return (
    <BottomBlock onMouseOver={mouseEventHandler}>
      <Bubble1 ref={bubble1}>
        기록을 등록하기 위해서는 로그인이 필요합니다
      </Bubble1>
      <Bubble2 ref={bubble2}>기록이 없습니다</Bubble2>
      <Triangle ref={triangle}></Triangle>
      <MyTable ref={mouseTable}>
        {rank.user[0] ? (
          <tbody>
            <tr>
              <td></td>
              <td>{rank.user[0].name}</td>
              <td>{rank.user[0].average}타수</td>
              <td>{rank.user[0].time}초</td>
            </tr>
          </tbody>
        ) : null}
      </MyTable>
    </BottomBlock>
  );
};

export default RankingTableBottom;

const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 25%;

  tbody tr {
    display: flex;
    height: 100%;
    align-items: center;

    &:hover {
      background-color: #2a1a1a;
    }
  }
`;

const Bubble1 = styled.div`
  display: none;
  border-radius: 8px;
  background: white;
  border: solid transparent;
  color: black;
  border-width: 15px;
  z-index: 10;
`;

const Bubble2 = styled.div`
  display: none;
  border-radius: 8px;
  background: white;
  border: solid transparent;
  color: black;
  border-width: 15px;
  z-index: 10;
`;

const Triangle = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px;
  border-color: white transparent transparent transparent;
  z-index: 10;
`;

const MyTable = styled.table`
  width: 100%;
  height: 30%;
  border-collapse: collapse;

  tbody {
    background-color: #4e4e4e;
  }

  td {
    color: #ffbd0a;

    &:nth-child(1) {
      width: 20%;
      border-radius: 0px 0px 0px 5px;
      text-align: center;
    }
    &:nth-child(2) {
      width: 30%;
      text-align: left;
    }
    &:nth-child(3) {
      width: 25%;
      text-align: left;
    }
    &:nth-child(4) {
      width: 25%;
      text-align: left;
      border-radius: 0px 0px 5px 0px;
    }
  }
`;
