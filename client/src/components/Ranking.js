import React from "react";
import styled from "styled-components";

import "components/Ranking.css";
import arrow from "image/arrow2.png";
import backgroundImg from "image/rankback.png";

const Ranking = ({
  title,
  nick,
  element,
  print,
  selectBtn,
  dropMenu,
  toggle,
  graphTarget,
  tableBody,
  titleName,
  top1,
  mouseTable,
  bubble1,
  bubble2,
  triangle,
}) => {
  // console.log("element", element.all);

  return (
    <Container>
      <Wrapper>
        <ListTable>
          <SelectWrapper>
            <Dropdown>
              <DropBtn onClick={selectBtn}>
                <span ref={titleName}>{title}</span>
                <img src={arrow} alt="arrow" />
              </DropBtn>
              <Menu ref={dropMenu} toggle={toggle}>
                <span onClick={() => print("님의 손길")}>님의 손길</span>
                <span onClick={() => print("광야")}>광야</span>
                <span onClick={() => print("진달래꽃")}>진달래꽃</span>
              </Menu>
            </Dropdown>
          </SelectWrapper>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>닉네임</th>
                  <th>타수</th>
                  <th>시간</th>
                </tr>
              </thead>
              <TableBody ref={tableBody}>
                {element.all.length > 0 ? element.all : null}
              </TableBody>
              {/* {element.all} */}
              {/* {row.length > 0 ? row :null } */}
              {/* <tbody className="ranking_table_body">{element}</tbody> */}
            </Table>
          </TableWrapper>
          <MyRank>
            <Bubble1 ref={bubble1}>
              기록을 등록하기 위해서는 로그인이 필요합니다
            </Bubble1>
            <Bubble2 ref={bubble2}>기록이 없습니다</Bubble2>
            <Triangle ref={triangle}></Triangle>
            <MyTable ref={mouseTable}>
              {!nick ? (
                <tbody>
                  <tr>
                    <td></td>
                    <td>Guest</td>
                    <td>0타수</td>
                    <td>0초</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>{element.user.length > 0 ? element.user : null}</tbody>
              )}
            </MyTable>
          </MyRank>
        </ListTable>
        <GraphWrapper>
          <GraphBox>
            <Header>
              <UserName>
                {!nick ? (
                  <>
                    <div>Guest&nbsp;&nbsp;</div>
                    <div></div>
                  </>
                ) : (
                  <>
                    <div>{nick}&nbsp;&nbsp;</div>
                    <div></div>
                  </>
                )}
              </UserName>
              <RankerName>
                <div ref={top1}>#1&nbsp;&nbsp;</div>
                <div></div>
              </RankerName>
            </Header>
            <GraphContainer ref={graphTarget}></GraphContainer>
          </GraphBox>
        </GraphWrapper>
      </Wrapper>
    </Container>
  );
};

export default Ranking;

// 컨테이너 #ranking
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// wrapper .ranking____header____tail
const Wrapper = styled.div`
  display: flex;
  width: 80%;
  min-width: 500px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 순위표 .ranking_list_table
const ListTable = styled.div`
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

// 선택 박스 .select_wrapper
const SelectWrapper = styled.div`
  display: flex;
  height: 7%;
`;

// 드롭다운 .dropdown
const Dropdown = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

// 버튼 .dropbtn
// span .dropbtn_text img .dropbtn_img
const DropBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: max(15px, 0.6vw);
  color: white;
  background-color: #4e4e4e;
  width: 22%;
  height: 40%;
  min-height: 20px;
  border-radius: 5px 5px 0px 0px;
  outline: none;

  span {
    width: 100%;
  }

  img {
    display: flex;
    width: 15%;
    min-width: 18px;
    max-width: 25px;
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

// 드롭다운 메뉴 #myDropdown / .dropdown-content
const Menu = styled.div`
  display: ${(props) => (props.toggle ? "block" : "none")};
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px 0px 5px 5px;

  span {
    background-color: #1a1919;
    color: white;
    padding: 12px 16px;
    display: block;

    &:hover {
      background-color: #353535;
    }
  }

  show {
    display: block;
  }
`;

// 테이블 .ranking_table_wrapper
const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70%;
`;

// 테이블 .ranking_table
// th 1 .column__rank
// th 2 .column__nick
// th 3 .column__record
// th 4 .column__time
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

// 마이 랭킹 .ranking_table_myRanking
const MyRank = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 25%;

  tbody tr {
    &:hover {
      background-color: #2a1a1a;
    }
  }
`;

// 말풍선1 .myRanking_table_arrow
const Bubble1 = styled.div`
  display: none;
  border-radius: 8px;
  background: white;
  border: solid transparent;
  color: black;
  border-width: 15px;
  z-index: 10;
`;

// 말풍선2 .myRanking_table_arrow2
const Bubble2 = styled.div`
  display: none;
  border-radius: 8px;
  background: white;
  border: solid transparent;
  color: black;
  border-width: 15px;
  z-index: 10;
`;

// 말풍선 .myRanking_table_triangle
const Triangle = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px;
  border-color: white transparent transparent transparent;
  z-index: 10;
`;

// 마이 테이블 .myRanking_table
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

// 그래프 .ranking_tail
const GraphWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  max-width: 900px;
  min-width: 300px;
  height: 17rem;
`;

// 그래프 박스 .ranking_detail2
const GraphBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 95%;
  background: #f0f5f9;
  box-shadow: 0 2px 5px 0 rgb(96 96 96 / 16%),
    2px 10px 23px 0 rgb(96 96 96 / 13%);
  padding: 10px;
`;

// 상단 .detail_body2_header
const Header = styled.div`
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

// 이름 .detail_body2_header_top
// div1 .header_me_text div2 .header_me
const UserName = styled.div`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  div {
    &:nth-child(1) {
      font-size: max(0.5em, 0.6vw);
    }
    &:nth-child(2) {
      width: 5%;
      height: 100%;
      background: #30a9de;
      margin-right: 10px;
    }
  }
`;

// 1등 이름 .detail_body2_header_bottom
// div1 .header_top1_text div2 .header_top1
const RankerName = styled.div`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  div {
    &:nth-child(1) {
      font-size: max(0.5em, 0.6vw);
    }
    &:nth-child(2) {
      width: 5%;
      height: 100%;
      background: #e53a40;
      margin-right: 10px;
    }
  }
`;

// 그래프 출력 .detail_body2
const GraphContainer = styled.div`
  height: 90%;
`;
