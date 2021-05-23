// import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import randomBtn from "../image/power.png";

import React, { useEffect } from "react";

import styled from "styled-components";
import backgroundImg from "../image/rankback.png";
import powerBtn1 from "../image/power.png";
import powerBtn2 from "../image/power_on.png";

const Test = ({ requestProblem, problem, filterTitle, count }) => {
  const speed = 1;
  const accuracy = 150;
  const nickname = "테스트";
  const recordresultSpeed = 200;
  const recordTime = 50;
  const checkLogin = true;

  // // 문제 생성(엘리먼트)
  // const createDiv = () => {
  //   const tt = String(problem[count]);
  //   const ttt = tt.split("");
  //   const tttt = ttt.map((el, index) => (
  //     <span className={"t" + index}>{el}</span>
  //   ));
  // };

  return (
    <Container>
      <Wrapper>
        <Top>
          <ScoreBoard>
            <Speed>
              <div>타수</div>
              <div>{speed}</div>
            </Speed>
            <TitleWrapper>
              {count < 7 ? (
                <Title
                // onClick={this.selectButton}
                >
                  {filterTitle}
                  <div id="problemDropdown" className="problem-content">
                    <span
                    // onClick={this.selectProblem("님의 손길")}
                    >
                      님의 손길
                    </span>
                    <span
                    // onClick={this.selectProblem("광야")}
                    >
                      광야
                    </span>
                    <span
                    // onClick={this.selectProblem("진달래꽃")}
                    >
                      진달래꽃
                    </span>
                  </div>
                </Title>
              ) : (
                <Title>{filterTitle}</Title>
              )}
              {(count < 7 && filterTitle === "님의 손길") ||
              (count < 7 && filterTitle === "광야") ||
              (count < 7 && filterTitle === "진달래꽃") ? (
                <Counter>{count + 1} / 7</Counter>
              ) : (
                <Counter></Counter>
              )}
            </TitleWrapper>
            <AccuracyWrapper>
              <div>정확도</div>
              <div>{accuracy}</div>
            </AccuracyWrapper>
          </ScoreBoard>
          <PrintWrapper>
            {count < 7 ? (
              <ProblemBox>
                <ProblemKeyboard>
                  {/* {tttt.length !== 9 ? (
                    <div className="header_problem_count">{tttt}</div>
                  ) : (
                    <div className="header_problem_count"></div>
                  )} */}
                  <PrintProblem name="problem">{problem[count]}</PrintProblem>
                  <textarea
                    type="text"
                    // onChange={this.handleInputValue("answer")}
                    spellcheck="false"
                    // maxlength={tt.length}
                    autoFocus
                  ></textarea>
                </ProblemKeyboard>
              </ProblemBox>
            ) : (
              <PrintResult>
                {nickname ? (
                  <UserInfo>{nickname}님의 기록</UserInfo>
                ) : (
                  <UserInfo>Guest님의 기록</UserInfo>
                )}
                <RecordPrintBox>
                  <SpeedRecord>
                    <div>평균</div>
                    <div>{Math.round(recordresultSpeed / count)}타수</div>
                  </SpeedRecord>
                  <TimeRecord>
                    <div>시간</div>
                    <div>{recordTime.toFixed(1)}초 걸렸습니다</div>
                  </TimeRecord>
                </RecordPrintBox>
              </PrintResult>
            )}
          </PrintWrapper>
          {count < 7 ? (
            <PrintRankBox>
              <Timer name="timer">00:00</Timer>
            </PrintRankBox>
          ) : (
            <PrintRankBox>
              <PrintRank>
                <div>
                  순위 <Link to="/ranking">🏆</Link>
                </div>
                <div></div>
              </PrintRank>
            </PrintRankBox>
          )}
        </Top>
        <Bottom>
          <Left></Left>
          <Center>
            {count < 7 ? (
              <>
                {!checkLogin ? (
                  <PowerBtn1
                    alt="randomBtn"
                    onClick={requestProblem}
                    // onClick={this.requestProblem}
                  />
                ) : (
                  <PowerBtn2
                    alt="randomBtn"
                    onClick={requestProblem}
                    // onClick={this.requestProblem}
                  />
                )}
              </>
            ) : (
              <>
                {!checkLogin ? (
                  <PowerBtn1
                    alt="randomBtn"
                    onClick={requestProblem}
                    // onClick={this.requestRefresh}
                  />
                ) : (
                  <PowerBtn1
                    alt="randomBtn"
                    onClick={requestProblem}
                    // onClick={this.requestRefresh}
                  />
                )}
              </>
            )}
          </Center>
          <Right>
            <p className="header_problem_result_right_triangle"></p>
            <p className="header_problem_result_right_arrow">랜덤</p>
          </Right>
        </Bottom>
        {count < 7 ? (
          // {count !== 2 ? (
          <KeyBoardWrapper>
            <Keyboard>
              <div id="ㅂ">ㅂ</div>
              <div id="ㅈ">ㅈ</div>
              <div id="ㄷ">ㄷ</div>
              <div id="ㄱ">ㄱ</div>
              <div id="ㅅ">ㅅ</div>
              <div id="ㅛ">ㅛ</div>
              <div id="ㅕ">ㅕ</div>
              <div id="ㅑ">ㅑ</div>
              <div id="ㅐ">ㅐ</div>
              <div id="ㅔ">ㅔ</div>
              <div id="Enter">↲</div>
              <div id="ㅁ">ㅁ</div>
              <div id="ㄴ">ㄴ</div>
              <div id="ㅇ">ㅇ</div>
              <div id="ㄹ">ㄹ</div>
              <div id="ㅎ">ㅎ</div>
              <div id="ㅗ">ㅗ</div>
              <div id="ㅓ">ㅓ</div>
              <div id="ㅏ">ㅏ</div>
              <div id="ㅣ">ㅣ</div>
              <div id="ㅋ">ㅋ</div>
              <div id="ㅌ">ㅌ</div>
              <div id="ㅊ">ㅊ</div>
              <div id="ㅍ">ㅍ</div>
              <div id="ㅠ">ㅠ</div>
              <div id="ㅜ">ㅜ</div>
              <div id="ㅡ">ㅡ</div>
            </Keyboard>
          </KeyBoardWrapper>
        ) : (
          <KeyBoardWrapper>
            <Keyboard>
              <div id="ㅂ">ㅂ</div>
              <div id="ㅈ">ㅈ</div>
              <div id="ㄷ">ㄷ</div>
              <div id="ㄱ">ㄱ</div>
              <div id="ㅅ">ㅅ</div>
              <div id="ㅛ">ㅛ</div>
              <div id="ㅕ">ㅕ</div>
              <div id="ㅑ">ㅑ</div>
              <div id="ㅐ">ㅐ</div>
              <div id="ㅔ">ㅔ</div>
              <div id="Enter">↲</div>
              <div id="ㅁ">ㅁ</div>
              <div id="ㄴ">ㄴ</div>
              <div id="ㅇ">ㅇ</div>
              <div id="ㄹ">ㄹ</div>
              <div id="ㅎ">ㅎ</div>
              <div id="ㅗ">ㅗ</div>
              <div id="ㅓ">ㅓ</div>
              <div id="ㅏ">ㅏ</div>
              <div id="ㅣ">ㅣ</div>
              <div id="ㅋ">ㅋ</div>
              <div id="ㅌ">ㅌ</div>
              <div id="ㅊ">ㅊ</div>
              <div id="ㅍ">ㅍ</div>
              <div id="ㅠ">ㅠ</div>
              <div id="ㅜ">ㅜ</div>
              <div id="ㅡ">ㅡ</div>
            </Keyboard>
          </KeyBoardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Test;

// 컨테이너
const Container = styled.div`
  width: 100%;
  height: 90vh;
`;

// wrapeer - .test_____header____tail
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// 모니터 화면 상단 - .header_problem
const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  max-width: 960px;
  height: 55vh;
  text-align: center;
  background: url(${backgroundImg});
  z-index: 1;
  border: solid 15px #383a3f;
  border-bottom-width: 25px;
  border-top-width: 25px;
  border-radius: 0.6rem 0.6rem 0 0;
  font-size: 20px;
  color: white;
`;

// 스코어보드(타수, 문제 제목, 정확도) - .header_problem_score
const ScoreBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 65%;
  height: 20%;
`;

// 타수 - .header_problem_score_speed
// div 1 - header_problem_score_speed_column
// div 2 - header_problem_score_speed_result
const Speed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;

// 문제 박스 - .header_title
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

// 제목 - .header_title_title
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #efdc05;
  font-size: max(0.6em, 1.3vw);
  width: 100%;
  position: relative;
  cursor: pointer;
`;

// 카운터 - .header_title_count
const Counter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  font-size: max(0.5em, 1.1vw);
`;

// 정확도 박스 - .header_problem_score_accuracy
// div1 - .header_problem_score_accuracy_column
// div2 - .header_problem_score_accuracy_result
const AccuracyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;

// 문제, 결과 출력 박스 - .header_titleAndProblem
const PrintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 40%;
`;

// 문제, 키보드 입력 박스 - .header_problem_count_header
const ProblemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 70%;
`;

// 문제, 키보드 입력 -.problemAndTyping
// textarea - .typing
const ProblemKeyboard = styled.div`
  width: 80%;

  textarea {
    width: 100%;
    margin-top: 5px;
    height: 5vh;
    overflow: hidden;
    resize: none;
    color: white;
    background-color: black;
    border-radius: 5px;
    font-size: max(0.7em, 1.5vw);
    border-left: none;
    border-right: none;
  }
`;

// 문제 출력 -.header_problem_count
const PrintProblem = styled.div`
  display: inline-block;
  font-size: max(0.7em, 1.5vw);
  width: 99%;
  text-align: left;
`;

// 결과 출력 박스 - .header_titleAndProblem_print
// div1 - .header_titleAndProblem_print_header
const PrintResult = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
`;

// 유저 - .header_titleAndProblem_print_header
const UserInfo = styled.div`
  width: 100%;
  color: #efdc05;
  font-size: max(0.7em, 1.4vw);
`;

// 기록 박스 - .header_titleAndProblem_print_body
const RecordPrintBox = styled.div`
  display: grid;
  grid-template-rows: 1.5fr 1.5fr 1.5fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: left;
  color: #e53a40;
  font-size: max(0.8em, 1.4vw);
`;

// 스피드(기록) - .header_titleAndProblem_print_body_speed
// div1 - .header_titleAndProblem_print_body_speed_column
// div2 - .header_titleAndProblem_print_body_speed_result
const SpeedRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(2) {
      color: white;
      text-align: left;
    }
  }
`;

// 스피드(기록) - .header_titleAndProblem_print_body_time
// div1 - .header_titleAndProblem_print_body_time_column
// div2 - .header_titleAndProblem_print_body_time_result
const TimeRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(2) {
      color: white;
      text-align: left;
    }
  }
`;

// 랭킹 출력 박스 - .header_problem_tail
const PrintRankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  height: 40%;
`;

// 랭킹 출력 - .header_problem_result_print_rank
// div1 - .header_problem_result_print_rank_text
// div2 - .header_problem_result_print_rank_top3
const PrintRank = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    &:nth-child(1) {
      color: #efdc05;
      font-size: max(0.7em, 1.4vw);
      height: 10%;
    }
    &:nth-child(2) {
      height: 90%;
    }
  }
`;

// 타이머 - #show
const Timer = styled.span`
  margin-top: 5px;
  font-size: max(0.8em, 1vw);
`;

// 모니터 하단 - .header_problem_result
const Bottom = styled.div`
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

// 하단 좌 - .header_problem_result_left
const Left = styled.div``;

// 하단 우 -.header_problem_result_right
// p1 -.header_problem_result_right_triangle
// p2 -.header_problem_result_right_arrow
const Right = styled.div`
  display: none;

  p {
    &:nth-child(1) {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      border-color: transparent white transparent transparent;
      z-index: 10;
      margin: 0px;
    }
    &:nth-child(2) {
      border-radius: 8px;
      background: white;
      border: solid transparent;
      color: black;
      border-width: 10px;
      z-index: 10;
      margin: 0px;
    }
  }
`;

// 하단 중 -.header_problem_result_center
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover + ${Right} {
    display: flex;
    justify-content: left;
    align-items: center;
  }
`;

// 버튼(로그인, 비로그인 구별)
// .tail_button_test_login_true
// .tail_button_test_login_false
const PowerBtn1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn1});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 전원 버튼2(로그인)
const PowerBtn2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn2});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 하단 키보드 박스 - .test_input
const KeyBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 20vh;
`;

// 키보드 - #keyboard
const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  align-content: center;
  grid-gap: 0.2rem;
  padding: 0.7rem;
  width: 30vw;
  max-width: 800px;
  min-width: 380px;
  min-height: 15vh;
  background: #cadbe9;
  border-radius: 0.8rem;

  div {
    font-size: 0.8vw;
    text-align: center;
    color: #fffff3;
    background: #090707;
    border-radius: 0.6rem;
    padding: 30%;
    transition: all 0.3s ease;
    &:nth-child(12) {
      grid-column: 2;
    }
    &:nth-child(21) {
      grid-column: 3;
    }
  }
  .pressed {
    background-color: #e53a40;
    transform: scale(1.2);
  }
`;

//

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       problem: [],
//       count: 0,
//       filterProblem: [],
//       answer: "",
//       time: 0,
//       accuracy: "",
//       speed: "",
//       title: ["광야", "님의 손길", "진달래꽃"],
//       filterTitle: "선택",
//       timer: "",
//       keyEvent: false,
//       recordTime: 0,
//       recordresultSpeed: 0,
//       average: 0,
//       id: window.localStorage.getItem("id"),
//       winnerRecord: 0,
//       items: "",
//       recordArray: [],
//       timeArray: [],
//     };

//     this.requestProblem = this.requestProblem.bind(this);
//     this.requestRefresh = this.requestRefresh.bind(this);
//     this.ranking = this.ranking.bind(this);
//     this.rankPrint = this.rankPrint.bind(this);
//   }

//   // 정확도 계산
//   compare() {
//     const { problem, count, answer, time, recordArray } = this.state;

//     // 반짝이는 듯속에 나는 두 손 모아 빌었지(50유효타수, 4초)
//     // 50타 * 60초 / 4초 => 750타?
//     // 백스페이스 7번

//     // 일단 스페이스 빼자
//     // 스페이스는 하나만 인정(배열에는 스페이스 하나당 세개씩 들어감)
//     // 빈 칸 3칸이면 undefinded가 9개 들어감

//     // 수 계산(타수*60/걸린시간(초))
//     // 48글자 * 60초 / 10초
//     // 2880 / 10 => 288타

//     // 타수
//     // 현재속도 = (타수(글자수) - 백스페이스 * 2) / 경과시간(초) * 60초
//     // 글컴타자는 백스페이스 * 3
//     const tasu = this.getConstantVowel(problem[count]);
//     const tasuJS = JSON.stringify(tasu);
//     const inputAnswer = this.getConstantVowel(answer);
//     const inputAnswerJS = JSON.stringify(inputAnswer);

//     // 타수
//     const resultSpeed = (tasu.length * 60) / time;

//     // 정확도
//     // if (problem[count] === answer) {
//     if (tasuJS === inputAnswerJS) {
//       this.setState({
//         accuracy: "100%",
//         speed: `${Math.floor(resultSpeed)}타수`,
//         keyEvent: false,
//         recordTime: this.state.recordTime + time,
//         recordresultSpeed: this.state.recordresultSpeed + resultSpeed,
//       });
//       this.setState({ count: count + 1 }, function () {});

//       recordArray.push(Math.floor(resultSpeed));
//       this.setState({ recordArray: recordArray });

//       if (this.state.count < 7) document.querySelector(".typing").value = "";
//       // if (this.state.count < 2) document.querySelector(".typing").value = "";

//       // 색 초기화
//       if (this.state.count < 7) {
//         // if (this.state.count < 2) {
//         for (
//           let i = 0;
//           i < document.querySelector(".header_problem_count").children.length;
//           i++
//         ) {
//           document.querySelector(`.header_problem_count .t${i}`).style.color =
//             "white";
//         }
//       }
//     } else {
//       let right = 0;

//       for (let i = 0; i < inputAnswer.length; i++) {
//         if (JSON.stringify(tasu[i]) === JSON.stringify(inputAnswer[i])) {
//           right++;
//         }
//       }

//       const acc = ((right / tasu.length) * 100).toFixed(1);

//       this.setState({
//         accuracy: `${acc}%`,
//         speed: `${Math.floor((inputAnswer.length * 60) / time)}타수`,
//         keyEvent: false,
//       });
//       document.querySelector(".typing").value = "";
//     }
//   }

//   handleInputValue = (key) => (e) => {
//     this.setState({ [key]: e.target.value });
//   };

//   // 키보드 이벤트
//   keyboardEvent() {
//     // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
//     // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비
//     // console.log("확인", this.state.keyEvent);

//     const keyboardEvent = document.querySelector(".typing");

//     keyboardEvent.addEventListener("keypress", (e) => {
//       const key = document.getElementById(e.key);

//       if (key) {
//         if (e.keyCode === 13) {
//           if (
//             document.querySelector(".header_problem_count").innerHTML === "" ||
//             document.querySelector(".header_problem_count").childNodes
//               .length === 9
//           ) {
//             this.requestProblem();
//             if (e.preventDefault) e.preventDefault();
//             return false;
//           } else {
//             this.stop();

//             const resultTime = document
//               .getElementById("show")
//               .innerHTML.split(":");

//             this.setState({
//               time: Number(`${resultTime[0]}.${resultTime[1]}`),
//             });
//             this.compare();

//             if (this.state.count === 7) {
//               // if (this.state.count === 2) {
//               this.rankPrint();
//               // 2초 후에 렌더링 시킬 메소드 추가
//             }

//             if (e.preventDefault) e.preventDefault();
//             return false;
//           }
//         }
//       }
//     });

//     keyboardEvent.addEventListener("keydown", (e) => {
//       const key = document.getElementById(e.key);

//       // console.log("인풋", e);
//       // console.log("isComposing:", e.isComposing);

//       if (key) {
//         // if (64 < e.keyCode < 91) {
//         if (e.keyCode === 229) {
//           if (!this.state.keyEvent) {
//             this.start();
//             this.setState({ keyEvent: true });

//             // 색상 초기화
//             for (
//               let i = 0;
//               i <
//               document.querySelector(".header_problem_count").children.length;
//               i++
//             ) {
//               document.querySelector(
//                 `.header_problem_count .t${i}`
//               ).style.color = "white";
//             }
//           }
//           key.classList.add("pressed");
//         }
//       } else {
//         if (!this.state.keyEvent) {
//           this.start();
//           this.setState({ keyEvent: true });

//           // 색상 초기화
//           for (
//             let i = 0;
//             i < document.querySelector(".header_problem_count").children.length;
//             i++
//           ) {
//             document.querySelector(`.header_problem_count .t${i}`).style.color =
//               "white";
//           }
//         }
//       }
//     });

//     //
//     // keyboardEvent.addEventListener("keydown", (e) => {
//     //   const key = document.getElementById(e.key);

//     //   // console.log("키코드:", e.keyCode);
//     //   // console.log("인풋", e);
//     //   // console.log("isComposing:", e.isComposing);

//     //   if (key) {
//     //     if (e.keyCode === 13) {
//     //       if (
//     //         document.querySelector(".header_problem_count").innerHTML === "" ||
//     //         document.querySelector(".header_problem_count").childNodes
//     //           .length === 9
//     //       ) {
//     //         this.requestProblem();
//     //         if (e.preventDefault) e.preventDefault();
//     //         return false;
//     //       } else {
//     //         this.stop();

//     //         const resultTime = document
//     //           .getElementById("show")
//     //           .innerHTML.split(":");

//     //         this.setState({
//     //           time: Number(`${resultTime[0]}.${resultTime[1]}`),
//     //         });
//     //         this.compare();

//     //         if (this.state.count === 7) {
//     //           // if (this.state.count === 2) {
//     //           this.rankPrint();
//     //           // 2초 후에 렌더링 시킬 메소드 추가
//     //         }

//     //         if (e.preventDefault) e.preventDefault();
//     //         return false;
//     //       }
//     //     } else {
//     //       if (!this.state.keyEvent) {
//     //         this.start();
//     //         this.setState({ keyEvent: true });

//     //         // 색상 초기화
//     //         for (
//     //           let i = 0;
//     //           i <
//     //           document.querySelector(".header_problem_count").children.length;
//     //           i++
//     //         ) {
//     //           document.querySelector(
//     //             `.header_problem_count .t${i}`
//     //           ).style.color = "white";
//     //         }
//     //       }
//     //       key.classList.add("pressed");
//     //     }
//     //   }
//     // });

//     keyboardEvent.addEventListener("keyup", (e) => {
//       // keyboardEvent.addEventListener("keyup", (e) => {
//       const key = document.getElementById(e.key);

//       if (key) key.classList.remove("pressed");
//     });
//   }

//   // 랜덤(시간 초기화, 카운트 초기화)
//   requestProblem() {
//     document.querySelector(".typing").value = "";
//     const divChange = document.querySelector(".header_problem_count").children
//       .length;

//     for (let i = 0; i < divChange; i++) {
//       document.querySelector(`.header_problem_count .t${i}`).style.color =
//         "white";
//     }

//     this.setState({ keyEvent: false, count: 0, recordTime: 0 });
//     this.stop();
//     this.init();

//     const { title } = this.state;
//     const random = title[Math.floor(Math.random() * title.length)];

//     // if (title) {
//     if (random) {
//       axios
//         .post("http://localhost:8080/problem/random", { title: random })
//         // .post("http://d5932f4fad26.ngrok.io/problem/random", { title: random })
//         // .post("https://tajachija.tk/problem/random", { title: random })
//         .then((res) => {
//           let filterProblem = [];
//           let filter = "";

//           res.data.data.forEach((el) => {
//             filterProblem.push(el.problem);
//             filter = el.title;
//           });

//           if (res.data.winner) {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//             this.setState({ winnerRecord: res.data.winner.time });
//           } else {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             alert("문제 요청 에러");
//           }
//         });
//     } else {
//       alert("에러");
//     }
//   }

//   // 문제 선택
//   selectProblem = (value) => (e) => {
//     document.querySelector(".typing").value = "";

//     const divChange = document.querySelector(".header_problem_count").children
//       .length;

//     for (let i = 0; i < divChange; i++) {
//       document.querySelector(`.header_problem_count .t${i}`).style.color =
//         "white";
//     }

//     this.setState({ keyEvent: false, count: 0, recordTime: 0 });
//     this.stop();
//     this.init();

//     if (value) {
//       axios
//         .post("http://localhost:8080/problem/random", { title: value })
//         // .post("http://d5932f4fad26.ngrok.io/problem/random", { title: value })
//         // .post("https://tajachija.tk/problem/random", { title: value })
//         .then((res) => {
//           let filterProblem = [];
//           let filter = "";

//           res.data.data.forEach((el) => {
//             filterProblem.push(el.problem);
//             filter = el.title;
//           });

//           if (res.data.winner) {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//             this.setState({ winnerRecord: res.data.winner.time });
//           } else {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             alert("문제 요청 에러");
//           }
//         });
//     } else {
//       alert("에러");
//     }
//   };

//   selectButton() {
//     document.querySelector("#problemDropdown").classList.toggle("show");

//     if (document.querySelector(".show")) {
//       document.querySelector(".header_title_count").style.display = "none";
//     } else {
//       document.querySelector(".header_title_count").style.display = "flex";
//     }

//     window.onclick = function (event) {
//       if (!event.target.matches(".header_title_title")) {
//       }
//     };
//   }

//   // 문제 요청 새로고침(개선)
//   requestRefresh() {
//     window.location.reload();
//   }

//   // 문제 요청 새로고침(기존)
//   requestRefresh2() {
//     // 키보드 이벤트가 발생을 안함..일단 보류
//     // document.querySelector(".typing").value = "";
//     document.querySelector(".header_problem_score_speed_result").innerHTML = "";
//     document.querySelector(".header_problem_score_accuracy_result").innerHTML =
//       "";

//     this.setState({ keyEvent: false, count: 0, recordTime: 0 });
//     this.stop();
//     this.init();

//     const { title } = this.state;
//     const random = title[Math.floor(Math.random() * title.length)];

//     if (random) {
//       axios
//         .post("http://localhost:8080/problem/random", { title: random })
//         // .post("http://d5932f4fad26.ngrok.io/problem/random", { title: random })
//         // .post("https://tajachija.tk/problem/random", { title: random })
//         .then((res) => {
//           let filterProblem = [];
//           let filter = "";

//           res.data.data.forEach((el) => {
//             filterProblem.push(el.problem);
//             filter = el.title;
//           });

//           if (res.data.winner) {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//             this.setState({ winnerRecord: res.data.winner.time });
//           } else {
//             this.setState({ problem: filterProblem });
//             this.setState({ filterTitle: filter });
//           }
//         })
//         .catch((err) => {
//           if (err) {
//             alert("문제 요청 에러");
//           }
//         });
//     } else {
//       alert("에러");
//     }
//   }

//   // 순위 요청
//   ranking() {
//     const { id, filterTitle } = this.state;
//     const printRank = [];

//     if (id) {
//       axios
//         .post("http://localhost:8080/ranking/register", this.state)
//         // .post("http://d5932f4fad26.ngrok.io/ranking/register", this.state)
//         // .post("https://tajachija.tk/ranking/register", this.state)
//         .then((res) => {
//           res.data.data.forEach((el) => {
//             printRank.push({
//               name: el.name,
//               average: el.average,
//               time: el.time,
//             });
//           });

//           this.setState({ printRank: printRank });
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });

//       // 게스트
//     } else {
//       // alert("회원가입이 필요합니다");
//       axios
//         .post("http://localhost:8080/ranking/print", {
//           title: filterTitle,
//           name: null,
//         })
//         // .post("http://d5932f4fad26.ngrok.io/ranking/print", {
//         //   title: filterTitle,
//         //   name: null,
//         // })
//         // .post("https://tajachija.tk/ranking/print", {
//         //   title: filterTitle,
//         //   name: null,
//         // })
//         .then((res) => {
//           res.data.data.forEach((el) => {
//             printRank.push({
//               name: el.name,
//               average: el.average,
//               time: el.time,
//             });
//           });

//           this.setState({ printRank: printRank });
//         })
//         .catch((err) => {
//           console.log(err.response);
//         });
//     }
//   }

//   // 순위 출력
//   rankPrint() {
//     this.ranking();

//     setTimeout(() => {
//       const { printRank } = this.state;

//       const target = document.querySelector(
//         ".header_problem_result_print_rank_top3"
//       );

//       const newDiv = document.createElement("div");

//       newDiv.className = "header_problem_result_print_rank_top3_print";

//       let PrintRankLenth = printRank.length;
//       if (PrintRankLenth > 3) PrintRankLenth = 3;

//       for (let i = 0; i < PrintRankLenth; i++) {
//         newDiv.innerHTML += `
//         <div id="header_problem_result_print_rank_top3_print_print_${i}">
//           <div class="header_problem_result_print_rank_top_ranker">${i + 1}등
//         </div>
//         <div class="header_problem_result_print_rank_speed_column">
//         <div class="header_problem_result_print_rank_top_speed">${
//           printRank[i].average
//         }타수</div>
//         </div>
//         <div class="header_problem_result_print_rank_time_column">
//         <div class="header_problem_result_print_rank_top_time">${
//           printRank[i].time
//         }초</div>
//          </div>
//         <div class="header_problem_result_print_rank_name_column">
//         <div class="header_problem_result_print_rank_top_name">${
//           printRank[i].name
//         }</div>
//         </div>
//         </div>
//         `;
//       }

//       target.prepend(newDiv);
//     }, 2000); // 시간. 2초 후 실행
//   }

//   // 정확도 체크
//   testValid() {
//     const problemValid = document.querySelector(".typing");
//     const problemCheck = document.querySelector(".header_problem_count");

//     problemValid.addEventListener("input", (e) => {
//       if (problemCheck.childNodes.length > 9) {
//         const input = e.target.value;
//         // const inputLen = e.target.value.length;
//         const newProblem = this.state.problem[this.state.count].split("");
//         const inputArray = input.split("");

//         // console.log("입력", input);
//         // console.log("길이", inputLen);
//         // console.log("문제", newProblem);
//         // console.log("입력배열", inputArray);
//         // 수정
//         // 입력된 값을 배열로 만들어서 비교

//         // 개선
//         for (let i = 0; i < inputArray.length; i++) {
//           if (inputArray.length <= newProblem.length) {
//             if (inputArray[i] === newProblem[i]) {
//               document.querySelector(
//                 `.header_problem_count .t${i}`
//               ).style.color = "#efdc05";
//             } else {
//               document.querySelector(
//                 `.header_problem_count .t${i}`
//               ).style.color = "#e53a40";
//             }
//           }
//         }

//         // 기존
//         // let counter = inputLen + 3;
//         // let limit = newProblem.length + 4;

//         // if (counter > 3 && counter < limit) {
//         //   if (input[counter - 4] === newProblem[counter - 4]) {
//         //     document.querySelector(
//         //       `.header_problem_count .t${counter - 4}`
//         //     ).style.color = "#efdc05";
//         //   } else {
//         //     document.querySelector(
//         //       `.header_problem_count .t${counter - 4}`
//         //     ).style.color = "#e53a40";
//         //   }
//         // }
//       }
//     });
//   }

//   getConstantVowel(kor) {
//     const f = [
//       "ㄱ", // -31439
//       "ㄲ", // -31438
//       "ㄴ", // -31436
//       "ㄷ", // -31433
//       "ㄸ", // -31432
//       "ㄹ", // -31431
//       "꽃", // -31423
//       "ㅂ", // -31422
//       "ㅃ", // -31421
//       "ㅅ", // -31419
//       "ㅆ", // -31418
//       "스", // -31417
//       "ㅈ", // -31416
//       "ㅉ", // -31415
//       "ㅊ", // -31414
//       "ㅋ", // -31413
//       "ㅌ", // -31412
//       "ㅍ", // -31411
//       "ㅎ", // -31410
//     ];
//     const s = [
//       "ㅏ",
//       "ㅐ",
//       "ㅑ",
//       "ㅒ",
//       "ㅓ",
//       "ㅔ",
//       "ㅕ",
//       "ㅖ",
//       "ㅗ",
//       "ㅘ",
//       "ㅙ",
//       "ㅚ",
//       "ㅛ",
//       "ㅜ",
//       "ㅝ",
//       "ㅞ",
//       "ㅟ",
//       "ㅠ",
//       "ㅡ",
//       "ㅢ",
//       "ㅣ",
//     ];
//     const t = [
//       "",
//       "ㄱ",
//       "ㄲ",
//       "ㄳ",
//       "ㄴ",
//       "ㄵ",
//       "ㄶ",
//       "ㄷ",
//       "ㄹ",
//       "ㄺ",
//       "ㄻ",
//       "ㄼ",
//       "ㄽ",
//       "ㄾ",
//       "ㄿ",
//       "ㅀ",
//       "ㅁ",
//       "ㅂ",
//       "ㅄ",
//       "ㅅ",
//       "ㅆ",
//       "문",
//       "ㅈ",
//       "ㅊ",
//       "ㅋ",
//       "ㅌ",
//       "ㅍ",
//       "ㅎ",
//     ];

//     const ga = 44032;
//     let result = [];

//     for (let i = 0; i < kor.length; i++) {
//       let uni = kor[i].charCodeAt(0);
//       uni = uni - ga;

//       // 자음 입력 하나만 된 것 => ("강", "ㅎ") "ㅎ"의 경우
//       if (uni < 0) {
//         if (uni === -31439) {
//           result.push(f[0]);
//         }
//         if (uni === -31438) {
//           result.push(f[1]);
//         }
//         if (uni === -31436) {
//           result.push(f[2]);
//         }
//         if (uni === -31433) {
//           result.push(f[3]);
//         }
//         if (uni === -31432) {
//           result.push(f[4]);
//         }
//         if (uni === -31431) {
//           result.push(f[5]);
//         }
//         if (uni === -31423) {
//           result.push(f[6]);
//         }
//         if (uni === -31422) {
//           result.push(f[7]);
//         }
//         if (uni === -31421) {
//           result.push(f[8]);
//         }
//         if (uni === -31419) {
//           result.push(f[9]);
//         }
//         if (uni === -31418) {
//           result.push(f[10]);
//         }
//         if (uni === -31417) {
//           result.push(f[11]);
//         }
//         if (uni === -31416) {
//           result.push(f[12]);
//         }
//         if (uni === -31415) {
//           result.push(f[13]);
//         }
//         if (uni === -31414) {
//           result.push(f[14]);
//         }
//         if (uni === -31413) {
//           result.push(f[15]);
//         }
//         if (uni === -31412) {
//           result.push(f[16]);
//         }
//         if (uni === -31411) {
//           result.push(f[17]);
//         }
//         if (uni === -31410) {
//           result.push(f[18]);
//         }
//       } else {
//         let fn = parseInt(uni / 588);
//         let sn = parseInt((uni - fn * 588) / 28);
//         let tn = parseInt(uni % 28);

//         if (tn === 0) {
//           result.push(f[fn], s[sn]);
//         } else {
//           result.push(f[fn], s[sn], t[tn]);
//         }
//       }
//     }

//     let final = result.filter((item) => {
//       return item !== null && item !== undefined;
//       // && item !== "";
//     });

//     return final;
//   }

//   componentDidMount() {
//     this.keyboardEvent();
//     this.testValid();
//   }

//   render() {
//     const {
//       accuracy,
//       speed,
//       problem,
//       count,
//       filterTitle,
//       recordresultSpeed,
//       recordTime,
//     } = this.state;

//     const tt = String(problem[count]);
//     const ttt = tt.split("");
//     const tttt = ttt.map((el, index) => (
//       <span className={"t" + index}>{el}</span>
//     ));

//     const nickname = window.localStorage.getItem("nick");
//     const checkLogin = window.localStorage.getItem("isLogin");

//     return (
//       <div>
//         <div id="test">
//           <div className="test_____header____tail">
//             <div className="header_problem">
//               <div className="header_problem_score">
//                 <div className="header_problem_score_speed">
//                   <div className="header_problem_score_speed_column">타수</div>
//                   <div className="header_problem_score_speed_result">
//                     {speed}
//                   </div>
//                 </div>
//                 <div className="header_title">
//                   {count < 7 ? (
//                     <div
//                       className="header_title_title"
//                       onClick={this.selectButton}
//                     >
//                       {filterTitle}
//                       <div id="problemDropdown" className="problem-content">
//                         <span onClick={this.selectProblem("님의 손길")}>
//                           님의 손길
//                         </span>
//                         <span onClick={this.selectProblem("광야")}>광야</span>
//                         <span onClick={this.selectProblem("진달래꽃")}>
//                           진달래꽃
//                         </span>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="header_title_title">{filterTitle}</div>
//                   )}
//                   {(count < 7 && filterTitle === "님의 손길") ||
//                   (count < 7 && filterTitle === "광야") ||
//                   (count < 7 && filterTitle === "진달래꽃") ? (
//                     <div className="header_title_count">{count + 1} / 7</div>
//                   ) : (
//                     <div className="header_title_count"></div>
//                   )}
//                 </div>
//                 <div className="header_problem_score_accuracy">
//                   <div className="header_problem_score_accuracy_column">
//                     정확도
//                   </div>
//                   <div className="header_problem_score_accuracy_result">
//                     {accuracy}
//                   </div>
//                 </div>
//               </div>
//               <div className="header_titleAndProblem">
//                 {count < 7 ? (
//                   <div className="header_problem_count_header">
//                     <div className="problemAndTyping">
//                       {tttt.length !== 9 ? (
//                         <div className="header_problem_count">{tttt}</div>
//                       ) : (
//                         <div className="header_problem_count"></div>
//                       )}
//                       <textarea
//                         type="text"
//                         className="typing"
//                         onChange={this.handleInputValue("answer")}
//                         spellcheck="false"
//                         maxlength={tt.length}
//                         autoFocus
//                       ></textarea>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="header_titleAndProblem_print">
//                     {nickname ? (
//                       <div className="header_titleAndProblem_print_header">
//                         {nickname}님의 기록
//                       </div>
//                     ) : (
//                       <div className="header_titleAndProblem_print_header">
//                         Guest님의 기록
//                       </div>
//                     )}
//                     <div className="header_titleAndProblem_print_body">
//                       <div className="header_titleAndProblem_print_body_speed">
//                         <div className="header_titleAndProblem_print_body_speed_column">
//                           평균
//                         </div>
//                         <div className="header_titleAndProblem_print_body_speed_result">
//                           {Math.round(recordresultSpeed / count)}타수
//                         </div>
//                       </div>
//                       <div className="header_titleAndProblem_print_body_time">
//                         <div className="header_titleAndProblem_print_body_time_column">
//                           시간
//                         </div>
//                         <div className="header_titleAndProblem_print_body_time_result">
//                           {recordTime.toFixed(1)}초 걸렸습니다
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               {count < 7 ? (
//                 <div className="header_problem_tail">
//                   <span id="show">00:00</span>
//                 </div>
//               ) : (
//                 <div className="header_problem_tail">
//                   <div className="header_problem_result_print_rank">
//                     <div className="header_problem_result_print_rank_text">
//                       순위 <Link to="/ranking">🏆</Link>
//                     </div>
//                     <div className="header_problem_result_print_rank_top3"></div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="header_problem_result">
//               <div className="header_problem_result_left"></div>
//               <div className="header_problem_result_center">
//                 {" "}
//                 {count < 7 ? (
//                   <div className="start_button">
//                     {!checkLogin ? (
//                       <div
//                         className="tail_button_test_login_false"
//                         src={randomBtn}
//                         width="50px"
//                         height="50px"
//                         alt="randomBtn"
//                         onClick={this.requestProblem}
//                       />
//                     ) : (
//                       <div
//                         className="tail_button_test_login_true"
//                         src={randomBtn}
//                         width="50px"
//                         height="50px"
//                         alt="randomBtn"
//                         onClick={this.requestProblem}
//                       />
//                     )}
//                   </div>
//                 ) : (
//                   <div className="start_button">
//                     {!checkLogin ? (
//                       <div
//                         className="tail_button_test_login_false"
//                         src={randomBtn}
//                         width="50px"
//                         height="50px"
//                         alt="randomBtn"
//                         onClick={this.requestRefresh}
//                       />
//                     ) : (
//                       <div
//                         className="tail_button_test_login_true"
//                         src={randomBtn}
//                         width="50px"
//                         height="50px"
//                         alt="randomBtn"
//                         onClick={this.requestRefresh}
//                       />
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="header_problem_result_right">
//                 <p className="header_problem_result_right_triangle"></p>
//                 <p className="header_problem_result_right_arrow">랜덤</p>
//               </div>
//             </div>
//             {count < 7 ? (
//               <div className="test_input">
//                 <div id="keyboard">
//                   <div id="ㅂ" className="btn_1">
//                     ㅂ
//                   </div>
//                   <div id="ㅈ" className="btn_2">
//                     ㅈ
//                   </div>
//                   <div id="ㄷ" className="btn_3">
//                     ㄷ
//                   </div>
//                   <div id="ㄱ" className="btn_1">
//                     ㄱ
//                   </div>
//                   <div id="ㅅ" className="btn_1">
//                     ㅅ
//                   </div>
//                   <div id="ㅛ" className="btn_1">
//                     ㅛ
//                   </div>
//                   <div id="ㅕ" className="btn_1">
//                     ㅕ
//                   </div>
//                   <div id="ㅑ" className="btn_1">
//                     ㅑ
//                   </div>
//                   <div id="ㅐ" className="btn_1">
//                     ㅐ
//                   </div>
//                   <div id="ㅔ" className="btn_1">
//                     ㅔ
//                   </div>
//                   <div id="Enter" className="btn_1">
//                     ↲
//                   </div>
//                   <div id="ㅁ" className="btn_11">
//                     ㅁ
//                   </div>
//                   <div id="ㄴ" className="btn_1">
//                     ㄴ
//                   </div>
//                   <div id="ㅇ" className="btn_1">
//                     ㅇ
//                   </div>
//                   <div id="ㄹ" className="btn_1">
//                     ㄹ
//                   </div>
//                   <div id="ㅎ" className="btn_1">
//                     ㅎ
//                   </div>
//                   <div id="ㅗ" className="btn_1">
//                     ㅗ
//                   </div>
//                   <div id="ㅓ" className="btn_1">
//                     ㅓ
//                   </div>
//                   <div id="ㅏ" className="btn_1">
//                     ㅏ
//                   </div>
//                   <div id="ㅣ" className="btn_1">
//                     ㅣ
//                   </div>
//                   <div id="ㅋ" className="btn_4">
//                     ㅋ
//                   </div>
//                   <div id="ㅌ" className="btn_1">
//                     ㅌ
//                   </div>
//                   <div id="ㅊ" className="btn_1">
//                     ㅊ
//                   </div>
//                   <div id="ㅍ" className="btn_1">
//                     ㅍ
//                   </div>
//                   <div id="ㅠ" className="btn_1">
//                     ㅠ
//                   </div>
//                   <div id="ㅜ" className="btn_1">
//                     ㅜ
//                   </div>
//                   <div id="ㅡ" className="btn_1">
//                     ㅡ
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="test_input">
//                 <div id="keyboard">
//                   <div id="ㅂ" className="btn_1_end">
//                     ㅂ
//                   </div>
//                   <div id="ㅈ" className="btn_2_end">
//                     ㅈ
//                   </div>
//                   <div id="ㄷ" className="btn_3_end">
//                     ㄷ
//                   </div>
//                   <div id="ㄱ" className="btn_1_end">
//                     ㄱ
//                   </div>
//                   <div id="ㅅ" className="btn_1_end">
//                     ㅅ
//                   </div>
//                   <div id="ㅛ" className="btn_1_end">
//                     ㅛ
//                   </div>
//                   <div id="ㅕ" className="btn_1_end">
//                     ㅕ
//                   </div>
//                   <div id="ㅑ" className="btn_1_end">
//                     ㅑ
//                   </div>
//                   <div id="ㅐ" className="btn_1_end">
//                     ㅐ
//                   </div>
//                   <div id="ㅔ" className="btn_1_end">
//                     ㅔ
//                   </div>
//                   <div id="Enter" className="btn_1_end">
//                     ↲
//                   </div>
//                   <div id="ㅁ" className="btn_11_end">
//                     ㅁ
//                   </div>
//                   <div id="ㅔ" className="btn_1_end">
//                     ㄴ
//                   </div>
//                   <div id="ㅇ" className="btn_1_end">
//                     ㅇ
//                   </div>
//                   <div id="ㄹ" className="btn_1_end">
//                     ㄹ
//                   </div>
//                   <div id="ㅎ" className="btn_1_end">
//                     ㅎ
//                   </div>
//                   <div id="ㅗ" className="btn_1_end">
//                     ㅗ
//                   </div>
//                   <div id="ㅓ" className="btn_1_end">
//                     ㅓ
//                   </div>
//                   <div id="ㅏ" className="btn_1_end">
//                     ㅏ
//                   </div>
//                   <div id="ㅣ" className="btn_1_end">
//                     ㅣ
//                   </div>
//                   <div id="ㅋ" className="btn_4_end">
//                     ㅋ
//                   </div>
//                   <div id="ㅌ" className="btn_1_end">
//                     ㅌ
//                   </div>
//                   <div id="ㅊ" className="btn_1_end">
//                     ㅊ
//                   </div>
//                   <div id="ㅍ" className="btn_1_end">
//                     ㅍ
//                   </div>
//                   <div id="ㅠ" className="btn_1_end">
//                     ㅠ
//                   </div>
//                   <div id="ㅜ" className="btn_1_end">
//                     ㅜ
//                   </div>
//                   <div id="ㅡ" className="btn_1_end">
//                     ㅡ
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(Test);
