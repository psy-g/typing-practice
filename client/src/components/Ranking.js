import React from "react";
import "./Ranking.css";
import arrow from "../image/arrow2.png";

import styled from "styled-components";
import backgroundImg from "../image/rankback.png";

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

// import React, { Component } from "react";
// import Nav from "./Nav";
// import "./Ranking.css";
// import axios from "axios";
// import arrow from "../image/arrow2.png";

// class Ranking extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       myItems: [],
//       myRecord: "",
//       init: "님의 손길",
//       myInit: [],
//       myRanking: "",
//       bestRecordArray: [],
//       myRecordArray: [],
//       bestAverage: "",
//       myAverage: "",
//       bestName: "",
//       myName: "",
//     };

//     this.print = this.print.bind(this);
//   }

//   print() {
//     const items = [];
//     const printRank = [];
//     const select = document.querySelector(".select_start");
//     const selectValue = select.options[select.selectedIndex].text;

//     if (selectValue) {
//       axios
//         .post("http://localhost:8080/ranking/print", {
//           title: selectValue,
//         })
//         // .post("http://a6e13414648b.ngrok.io/ranking/print", {
//         //   title: selectValue,
//         // })
//         // .post("https://tajachija.tk:8080/ranking/print", {
//         //   title: selectValue,
//         // })
//         .then((res) => {
//           res.data.data.forEach((el) => {
//             printRank.push({
//               name: el.name,
//               average: el.average,
//               time: el.time,
//             });
//           });
//           for (const [index, value] of printRank.entries()) {
//             items.push(
//               <tr className={`rank__${index}`}>
//                 <td className="rank__rank">{index + 1}</td>
//                 <td className="rank__name">{value.name}</td>
//                 <td className="rank__record">{value.average}타수</td>
//                 <td className="rank__time">{value.time}초</td>
//               </tr>
//             );
//           }
//           this.setState({ items: items });
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//     } else {
//       alert("에러");
//     }

//     setTimeout(() => {
//       this.detail();
//     }, 500);
//   }

//   init() {
//     const items = [];
//     const printRank = [];
//     const myRank = [];
//     const loginUser = [];
//     const nickname = window.localStorage.getItem("nick");
//     const best = [];
//     const my = [];

//     axios
//       .post("http://localhost:8080/ranking/print", {
//         title: "님의 손길",
//         name: nickname,
//       })
//       // .post("http://a6e13414648b.ngrok.io/ranking/print", {
//       //   title: "님의 손길",
//       //   name: nickname,
//       // })
//       // .post("https://tajachija.tk/ranking/print", {
//       //   title: "님의 손길",
//       //   name: nickname,
//       // })
//       .then((res) => {
//         res.data.data.forEach((el) => {
//           printRank.push({
//             name: el.name,
//             average: el.average,
//             time: el.time,
//           });
//         });

//         best.push(
//           res.data.data[0].one,
//           res.data.data[0].two,
//           res.data.data[0].three,
//           res.data.data[0].four,
//           res.data.data[0].five,
//           res.data.data[0].six,
//           res.data.data[0].seven
//         );

//         this.setState({
//           bestRecordArray: best,
//           bestAverage: res.data.data[0].average,
//           bestName: res.data.data[0].name,
//         });

//         for (let i = 0; i < res.data.data.length; i++) {
//           if (res.data.data[i].name === nickname) {
//             this.setState({ myRanking: i + 1 });
//           }
//         }

//         for (const [index, value] of printRank.entries()) {
//           items.push(
//             <tr className={`rank__${index}`} onClick={this.clickRank}>
//               <td className="rank__rank">{index + 1}</td>
//               <td className="rank__name">{value.name}</td>
//               <td className="rank__record">{value.average}타수</td>
//               <td className="rank__time">{value.time}초</td>
//             </tr>
//           );
//         }
//         this.setState({ items: items });

//         res.data.myRank.forEach((el) => {
//           myRank.push({
//             name: el.name,
//             average: el.average,
//             time: el.time,
//           });
//         });

//         for (const ele of myRank) {
//           loginUser.push(
//             <tr>
//               <td className="myRanking_rank">{this.state.myRanking}</td>
//               <td className="myRanking_name">{ele.name}</td>
//               <td className="myRanking_record">{ele.average}타수</td>
//               <td className="myRanking_time">{ele.time}초</td>
//             </tr>
//           );
//         }

//         if (loginUser.length !== 0) {
//           this.setState({ myItems: loginUser });
//         } else {
//           {
//             !nickname
//               ? loginUser.push(
//                   <tr className="myRanking_hover">
//                     <td className="myRanking_rank"></td>
//                     <td className="myRanking_name">Guest</td>
//                     <td className="myRanking_record">0타수</td>
//                     <td className="myRanking_time">0초</td>
//                   </tr>
//                 )
//               : loginUser.push(
//                   <tr className="myRanking_hover2">
//                     <td className="myRanking_rank"></td>
//                     <td className="myRanking_name">{nickname}</td>
//                     <td className="myRanking_record">0타수</td>
//                     <td className="myRanking_time">0초</td>
//                   </tr>
//                 );
//           }

//           this.setState({ myItems: loginUser });
//         }
//         // 유저 기록이 있으면
//         if (res.data.myRank.length > 0) {
//           my.push(
//             res.data.myRank[0].one,
//             res.data.myRank[0].two,
//             res.data.myRank[0].three,
//             res.data.myRank[0].four,
//             res.data.myRank[0].five,
//             res.data.myRank[0].six,
//             res.data.myRank[0].seven
//           );

//           this.setState({
//             myRecordArray: my,
//             myAverage: res.data.myRank[0].average,
//             myName: res.data.myRank[0].name,
//           });
//         }
//       });

//     setTimeout(() => {
//       this.detail();
//     }, 500);
//   }

//   detail() {
//     // const test = document.querySelectorAll(".ranking_table");
//     const nickname = window.localStorage.getItem("nick");

//     // 1등, 로그인 유저 기록
//     const {
//       bestRecordArray,
//       myRecordArray,
//       bestAverage,
//       myAverage,
//     } = this.state;

//     // 1등 기록, 이름
//     // const bestRecord = document.querySelector(".rank__0 .rank__record")
//     //   .innerHTML;
//     // const bestName = document.querySelector(".rank__0 .rank__name").innerHTML;

//     // 1등 타수
//     // const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);
//     const bestPercent = Math.floor((bestAverage / 750) * 100);

//     // 1등, 유저 배열
//     const bestArr = [];
//     const myArr = [];
//     var noRecord = "x";
//     var noRecord2 = "기록x";

//     for (let i = 0; i < bestRecordArray.length; i++) {
//       bestArr.push(Math.floor((bestRecordArray[i] / 750) * 100));
//     }

//     for (let i = 0; i < myRecordArray.length; i++) {
//       myArr.push(Math.floor((myRecordArray[i] / 750) * 100));
//     }

//     // 비회원
//     if (nickname === null) {
//       const target = document.querySelector(".detail_body2");

//       target.innerHTML = "";

//       const newDiv = document.createElement("div");

//       newDiv.className = "graph-wrapper2";
//       newDiv.innerHTML = `
//       <div class="percent-indicator2">
//         <div class="per-0"></div>
//         <div class="per-20"></div>
//         <div class="per-40"></div>
//         <div class="per-60"></div>
//         <div class="per-80"></div>
//         <div class="per-100"></div>
//       </div>
//         <div class="graph2_container">
//           <ul class="graph2">
//         <span>
//           <li class="item1"></li>
//           <li class="item2"></li>
//         </span>
//         <span>
//           <li class="item3"></li>
//           <li class="item4"></li>
//         </span>
//         <span>
//           <li class="item5"></li>
//           <li class="item6"></li>
//         </span>
//         <span>
//           <li class="item7"></li>
//           <li class="item8"></li>
//         </span>
//         <span>
//           <li class="item9"></li>
//           <li class="item10"></li>
//         </span>
//         <span>
//           <li class="item11"></li>
//           <li class="item12"></li>
//         </span>
//         <span>
//           <li class="item13"></li>
//           <li class="item14"></li>
//         </span>
//         <span>
//           <li class="item15"></li>
//           <li class="item16"></li>
//         </span>
//           </ul>
//         <ul class="graph2_problem_count">
//           <span>1</span>
//           <span>2</span>
//           <span>3</span>
//           <span>4</span>
//           <span>5</span>
//           <span>6</span>
//           <span>7</span>
//           <span>합계</span>
//         </ul>
//         `;
//       target.prepend(newDiv);

//       for (let i = 0; i < bestArr.length; i++) {
//         document.querySelector(
//           `.graph2 .item${i * 2 + 1}`
//         ).style.height = `20%`;
//         document.querySelector(
//           `.graph2 .item${i * 2 + 1}`
//         ).style.animation = `p-20 3s`;

//         document.styleSheets[0].addRule(
//           `li.item${i * 2 + 1}::before`,
//           'content: "' + noRecord + '";'
//         );

//         if (bestArr[i] > 100) bestArr[i] = 999;

//         document.querySelector(
//           `.graph2 .item${i * 2 + 2}`
//         ).style.height = `${bestArr[i]}%`;
//         document.querySelector(
//           `.graph2 .item${i * 2 + 2}`
//         ).style.animation = `p-${bestArr[i]} 3s`;

//         document.styleSheets[0].addRule(
//           `li.item${i * 2 + 2}::before`,
//           'content: "' + bestRecordArray[i] + '";'
//         );
//       }
//       // console.log("=============", bestPercent);

//       document.querySelector(".graph2 .item15").style.height = `20%`;
//       document.querySelector(".graph2 .item15").style.animation = `p-20 5s`;
//       document.querySelector(
//         ".graph2 .item16"
//       ).style.height = `${bestPercent}%`;
//       document.querySelector(
//         ".graph2 .item16"
//       ).style.animation = `p-${bestPercent} 5s`;

//       document.styleSheets[0].addRule(
//         `li.item15::before`,
//         'content: "' + noRecord2 + '";'
//       );

//       document.styleSheets[0].addRule(
//         `li.item16::before`,
//         'content: "' + bestAverage + '";'
//       );
//     }
//     // 회원
//     else {
//       const target = document.querySelector(".detail_body2");

//       target.innerHTML = "";

//       // 로그인(기록 없음)
//       if (myRecordArray.length === 0) {
//         const newDiv = document.createElement("div");

//         newDiv.className = "graph-wrapper2";
//         newDiv.innerHTML = `
//         <div class="percent-indicator2">
//         <div class="per-0"></div>
//         <div class="per-20"></div>
//         <div class="per-40"></div>
//         <div class="per-60"></div>
//         <div class="per-80"></div>
//         <div class="per-100"></div>
//       </div>
//         <div class="graph2_container">
//           <ul class="graph2">
//         <span>
//           <li class="item1"></li>
//           <li class="item2"></li>
//         </span>
//         <span>
//           <li class="item3"></li>
//           <li class="item4"></li>
//         </span>
//         <span>
//           <li class="item5"></li>
//           <li class="item6"></li>
//         </span>
//         <span>
//           <li class="item7"></li>
//           <li class="item8"></li>
//         </span>
//         <span>
//           <li class="item9"></li>
//           <li class="item10"></li>
//         </span>
//         <span>
//           <li class="item11"></li>
//           <li class="item12"></li>
//         </span>
//         <span>
//           <li class="item13"></li>
//           <li class="item14"></li>
//         </span>
//         <span>
//           <li class="item15"></li>
//           <li class="item16"></li>
//         </span>
//           </ul>
//         <ul class="graph2_problem_count">
//           <span>1</span>
//           <span>2</span>
//           <span>3</span>
//           <span>4</span>
//           <span>5</span>
//           <span>6</span>
//           <span>7</span>
//           <span>합계</span>
//         </ul>
//         `;
//         target.prepend(newDiv);

//         for (let i = 0; i < bestArr.length; i++) {
//           document.querySelector(
//             `.graph2 .item${i * 2 + 1}`
//           ).style.height = `20%`;
//           document.querySelector(
//             `.graph2 .item${i * 2 + 1}`
//           ).style.animation = `p-20 3s`;

//           document.styleSheets[0].addRule(
//             `li.item${i * 2 + 1}::before`,
//             'content: "' + noRecord + '";'
//           );

//           if (bestArr[i] > 100) bestArr[i] = 999;

//           document.querySelector(
//             `.graph2 .item${i * 2 + 2}`
//           ).style.height = `${bestArr[i]}%`;
//           document.querySelector(
//             `.graph2 .item${i * 2 + 2}`
//           ).style.animation = `p-${bestArr[i]} 3s`;

//           document.styleSheets[0].addRule(
//             `li.item${i * 2 + 2}::before`,
//             'content: "' + bestRecordArray[i] + '";'
//           );
//         }

//         document.querySelector(".graph2 .item15").style.height = `20%`;
//         document.querySelector(".graph2 .item15").style.animation = `p-20 5s`;
//         document.querySelector(
//           ".graph2 .item16"
//         ).style.height = `${bestPercent}%`;
//         document.querySelector(
//           ".graph2 .item16"
//         ).style.animation = `p-${bestPercent} 5s`;

//         document.styleSheets[0].addRule(
//           `li.item15::before`,
//           'content: "' + noRecord2 + '";'
//         );

//         document.styleSheets[0].addRule(
//           `li.item16::before`,
//           'content: "' + bestAverage + '";'
//         );
//       }
//       // 로그인(기록 있음)
//       else {
//         const myPercent = Math.floor((myAverage / 750) * 100);
//         const newDiv = document.createElement("div");

//         newDiv.className = "graph-wrapper2";
//         newDiv.innerHTML = `
//         <div class="percent-indicator2">
//         <div class="per-0"></div>
//         <div class="per-20"></div>
//         <div class="per-40"></div>
//         <div class="per-60"></div>
//         <div class="per-80"></div>
//         <div class="per-100"></div>
//       </div>
//         <div class="graph2_container">
//           <ul class="graph2">
//         <span>
//           <li class="item1"></li>
//           <li class="item2"></li>
//         </span>
//         <span>
//           <li class="item3"></li>
//           <li class="item4"></li>
//         </span>
//         <span>
//           <li class="item5"></li>
//           <li class="item6"></li>
//         </span>
//         <span>
//           <li class="item7"></li>
//           <li class="item8"></li>
//         </span>
//         <span>
//           <li class="item9"></li>
//           <li class="item10"></li>
//         </span>
//         <span>
//           <li class="item11"></li>
//           <li class="item12"></li>
//         </span>
//         <span>
//           <li class="item13"></li>
//           <li class="item14"></li>
//         </span>
//         <span>
//           <li class="item15"></li>
//           <li class="item16"></li>
//         </span>
//           </ul>
//         <ul class="graph2_problem_count">
//           <span>1</span>
//           <span>2</span>
//           <span>3</span>
//           <span>4</span>
//           <span>5</span>
//           <span>6</span>
//           <span>7</span>
//           <span>합계</span>
//         </ul>
//         `;
//         target.prepend(newDiv);

//         for (let i = 0; i < bestArr.length; i++) {
//           if (myArr[i] > 100) myArr[i] = 999;

//           document.querySelector(
//             `.graph2 .item${i * 2 + 1}`
//           ).style.height = `${myArr[i]}%`;
//           document.querySelector(
//             `.graph2 .item${i * 2 + 1}`
//           ).style.animation = `p-${myArr[i]} 3s`;

//           document.styleSheets[0].addRule(
//             `li.item${i * 2 + 1}::before`,
//             'content: "' + myRecordArray[i] + '";'
//           );
//           if (bestArr[i] > 100) bestArr[i] = 999;

//           document.querySelector(
//             `.graph2 .item${i * 2 + 2}`
//           ).style.height = `${bestArr[i]}%`;
//           document.querySelector(
//             `.graph2 .item${i * 2 + 2}`
//           ).style.animation = `p-${bestArr[i]} 3s`;

//           document.styleSheets[0].addRule(
//             `li.item${i * 2 + 2}::before`,
//             'content: "' + bestRecordArray[i] + '";'
//           );
//         }

//         document.querySelector(
//           ".graph2 .item15"
//         ).style.height = `${myPercent}%`;
//         document.querySelector(
//           ".graph2 .item15"
//         ).style.animation = `p-${myPercent} 5s`;
//         document.querySelector(
//           ".graph2 .item16"
//         ).style.height = `${bestPercent}%`;
//         document.querySelector(
//           ".graph2 .item16"
//         ).style.animation = `p-${bestPercent} 5s`;

//         document.styleSheets[0].addRule(
//           `li.item15::before`,
//           'content: "' + myAverage + '";'
//         );

//         document.styleSheets[0].addRule(
//           `li.item16::before`,
//           'content: "' + bestAverage + '";'
//         );
//       }
//     }
//   }

//   remove() {
//     const target = document.querySelector(".detail_body");

//     target.innerHTML = "";
//   }

//   print2 = (value) => (e) => {
//     const best = [];
//     const my = [];

//     const items = [];
//     const loginUser = [];
//     const printRank = [];
//     const selectValue = value;

//     const myRank = [];

//     const nickname = window.localStorage.getItem("nick");

//     this.setState({ init: value });

//     document.querySelector(".header_top1_text").innerHTML = `1등&nbsp;&nbsp;`;

//     if (selectValue) {
//       axios
//         .post("http://localhost:8080/ranking/print", {
//           title: selectValue,
//           name: nickname,
//         })
//         // .post("http://a6e13414648b.ngrok.io/ranking/print", {
//         //   title: selectValue,
//         //   name: nickname,
//         // })
//         // .post("https://tajachija.tk/ranking/print", {
//         //   title: selectValue,
//         //   name: nickname,
//         // })
//         .then((res) => {
//           res.data.data.forEach((el) => {
//             printRank.push({
//               name: el.name,
//               average: el.average,
//               time: el.time,
//             });
//           });

//           best.push(
//             res.data.data[0].one,
//             res.data.data[0].two,
//             res.data.data[0].three,
//             res.data.data[0].four,
//             res.data.data[0].five,
//             res.data.data[0].six,
//             res.data.data[0].seven
//           );

//           this.setState({
//             bestRecordArray: best,
//             bestAverage: res.data.data[0].average,
//             bestName: res.data.data[0].name,
//           });

//           for (let i = 0; i < res.data.data.length; i++) {
//             if (res.data.data[i].name === nickname) {
//               this.setState({ myRanking: i + 1 });
//             }
//           }

//           for (const [index, value] of printRank.entries()) {
//             items.push(
//               <tr className={`rank__${index}`} onClick={this.clickRank}>
//                 <td className="rank__rank">{index + 1}</td>
//                 <td className="rank__name">{value.name}</td>
//                 <td className="rank__record">{value.average}타수</td>
//                 <td className="rank__time">{value.time}초</td>
//               </tr>
//             );
//           }
//           this.setState({ items: items });

//           res.data.myRank.forEach((el) => {
//             myRank.push({
//               name: el.name,
//               average: el.average,
//               time: el.time,
//             });
//           });

//           for (const ele of myRank) {
//             loginUser.push(
//               <tr>
//                 <td className="myRanking_rank">{this.state.myRanking}</td>
//                 <td className="myRanking_name">{ele.name}</td>
//                 <td className="myRanking_record">{ele.average}타수</td>
//                 <td className="myRanking_time">{ele.time}초</td>
//               </tr>
//             );
//           }

//           if (loginUser.length !== 0) {
//             this.setState({ myItems: loginUser });
//           } else {
//             {
//               !nickname
//                 ? loginUser.push(
//                     <tr className="myRanking_hover">
//                       <td className="myRanking_rank"></td>
//                       <td className="myRanking_name">Guest</td>
//                       <td className="myRanking_record">0타수</td>
//                       <td className="myRanking_time">0초</td>
//                     </tr>
//                   )
//                 : loginUser.push(
//                     <tr className="myRanking_hover2">
//                       <td className="myRanking_rank"></td>
//                       <td className="myRanking_name">{nickname}</td>
//                       <td className="myRanking_record">0타수</td>
//                       <td className="myRanking_time">0초</td>
//                     </tr>
//                   );
//             }

//             this.setState({ myItems: loginUser });
//           }

//           // 유저 기록이 있으면
//           if (res.data.myRank.length > 0) {
//             my.push(
//               res.data.myRank[0].one,
//               res.data.myRank[0].two,
//               res.data.myRank[0].three,
//               res.data.myRank[0].four,
//               res.data.myRank[0].five,
//               res.data.myRank[0].six,
//               res.data.myRank[0].seven
//             );

//             this.setState({
//               myRecordArray: my,
//               myAverage: res.data.myRank[0].average,
//               myName: res.data.myRank[0].name,
//             });
//           }
//           // 유저 기록 없으면
//           else {
//             this.setState({ myRecordArray: my, myAverage: "", myName: "" });
//           }
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//     } else {
//       alert("에러");
//     }

//     document.querySelector(".dropdown-content").classList.remove("show");

//     setTimeout(() => {
//       this.detail();
//     }, 500);
//   };

//   clickRank() {
//     const clickRecord = [];
//     const clickArray = [];

//     window.onclick = function (event) {
//       if (event.target.closest(".ranking_table_body")) {
//         let clickName = event.target.parentNode.children[1].innerHTML;
//         let clickTitle = document.querySelector(".dropbtn_text").innerHTML;

//         axios
//           .post("http://localhost:8080/ranking/print", {
//             title: clickTitle,
//             name: clickName,
//           })
//           // .post("http://a6e13414648b.ngrok.io/ranking/print", {
//           //   title: clickTitle,
//           //   name: clickName,
//           // })
//           // .post("https://tajachija.tk/ranking/print", {
//           //   title: clickTitle,
//           //   name: clickName,
//           // })
//           .then((res) => {
//             clickArray.push(
//               res.data.myRank[0].one,
//               res.data.myRank[0].two,
//               res.data.myRank[0].three,
//               res.data.myRank[0].four,
//               res.data.myRank[0].five,
//               res.data.myRank[0].six,
//               res.data.myRank[0].seven
//             );

//             clickRecord.push(
//               res.data.myRank[0].name,
//               res.data.myRank[0].average
//             );

//             const percentArr = [];
//             const clickPercent = Math.floor((clickRecord[1] / 750) * 100);

//             document.querySelector(
//               ".header_top1_text"
//             ).innerHTML = `${clickRecord[0]}&nbsp;&nbsp;`;

//             for (let i = 0; i < clickArray.length; i++) {
//               percentArr.push(Math.floor((clickArray[i] / 750) * 100));
//             }

//             for (let i = 0; i < percentArr.length; i++) {
//               if (percentArr[i] > 100) percentArr[i] = 999;

//               document.querySelector(
//                 `.graph2 .item${i * 2 + 2}`
//               ).style.height = `${percentArr[i]}%`;
//               document.querySelector(
//                 `.graph2 .item${i * 2 + 2}`
//               ).style.animation = `p-${percentArr[i]} 3s`;

//               document.styleSheets[0].addRule(
//                 `li.item${i * 2 + 2}::before`,
//                 'content: "' + clickArray[i] + '";'
//               );
//             }

//             document.querySelector(
//               ".graph2 .item16"
//             ).style.height = `${clickPercent}%`;
//             document.querySelector(
//               ".graph2 .item16"
//             ).style.animation = `p-${clickPercent} 5s`;

//             document.styleSheets[0].addRule(
//               `li.item16::before`,
//               'content: "' + clickRecord[1] + '";'
//             );
//           })
//           .catch((err) => {
//             console.log(err.response);
//           });
//       }
//     };
//   }

//   printArrow() {
//     window.onmouseover = function (event) {
//       if (event.target.closest(".myRanking_hover")) {
//         document.querySelector(".myRanking_table_arrow").style.display =
//           "block";
//         document.querySelector(".myRanking_table_triangle").style.display =
//           "inline-block";
//       }

//       if (event.target.closest(".myRanking_hover2")) {
//         document.querySelector(".myRanking_table_arrow2").style.display =
//           "block";
//         document.querySelector(".myRanking_table_triangle").style.display =
//           "inline-block";
//       }
//     };

//     window.onmouseout = function (event) {
//       if (event.target.closest(".myRanking_hover")) {
//         document.querySelector(".myRanking_table_arrow").style.display = "none";
//         document.querySelector(".myRanking_table_triangle").style.display =
//           "none";
//       }

//       if (event.target.closest(".myRanking_hover2")) {
//         document.querySelector(".myRanking_table_arrow2").style.display =
//           "none";
//         document.querySelector(".myRanking_table_triangle").style.display =
//           "none";
//       }
//     };
//   }

//   componentDidMount() {
//     // this.print();
//     this.init();
//     this.printArrow();
//   }

//   render() {
//     const { items, myItems } = this.state;
//     const nick = window.localStorage.getItem("nick");

//     return (
//       <div>
//         <div id="ranking">
//           <div className="ranking____header____tail">
//             <div className="ranking_list_table">
//               <div className="select_wrapper">
//                 <div className="dropdown">
//                   <button className="dropbtn" onClick={this.selectBtn}>
//                     <span className="dropbtn_text">{this.state.init}</span>
//                     <img className="dropbtn_img" src={arrow} alt="arrow" />
//                   </button>
//                   <div id="myDropdown" className="dropdown-content">
//                     <span onClick={this.print2("님의 손길")}>님의 손길</span>
//                     <span onClick={this.print2("광야")}>광야</span>
//                     <span onClick={this.print2("진달래꽃")}>진달래꽃</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="ranking_table_wrapper">
//                 <table className="ranking_table">
//                   <thead>
//                     <tr>
//                       <th className="column__rank">순위</th>
//                       <th className="column__nick">닉네임</th>
//                       <th className="column__record">타수</th>
//                       <th className="column__time">시간</th>
//                     </tr>
//                   </thead>
//                   <tbody className="ranking_table_body">{items}</tbody>
//                 </table>
//               </div>

//               <div className="ranking_table_myRanking">
//                 <div className="myRanking_table_arrow">
//                   기록을 등록하기 위해서는 로그인이 필요합니다{" "}
//                 </div>
//                 <div className="myRanking_table_arrow2">기록이 없습니다 </div>
//                 <div className="myRanking_table_triangle"></div>
//                 <table className="myRanking_table">
//                   <tbody>{myItems}</tbody>
//                 </table>
//               </div>
//             </div>
//             {/* </div> */}
//             {nick === null ? (
//               <div className="ranking_tail">
//                 <div className="ranking_detail2">
//                   <div className="detail_body2_header">
//                     <div className="detail_body2_header_top">
//                       <div className="header_me_text">Guest&nbsp;&nbsp;</div>
//                       <div className="header_me"></div>
//                     </div>
//                     <div className="detail_body2_header_bottom">
//                       <div className="header_top1_text">1등&nbsp;&nbsp;</div>
//                       <div className="header_top1"></div>
//                     </div>
//                   </div>
//                   <div className="detail_body2"></div>
//                 </div>
//               </div>
//             ) : (
//               <div className="ranking_tail">
//                 <div className="ranking_detail2">
//                   <div className="detail_body2_header">
//                     <div className="detail_body2_header_top">
//                       <div className="header_me_text">{nick}&nbsp;&nbsp;</div>
//                       <div className="header_me"></div>
//                     </div>
//                     <div className="detail_body2_header_bottom">
//                       <div className="header_top1_text">1등&nbsp;&nbsp;</div>
//                       <div className="header_top1"></div>
//                     </div>
//                   </div>
//                   <div className="detail_body2"></div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Ranking;
