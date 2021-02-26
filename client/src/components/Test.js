import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";
import TestRank from "./TestRank";
import Result from "./Result";
import { withRouter } from "react-router-dom";
import axios from "axios";
import randomBtn from "../image/power.png";
import running from "../image/run2.gif";
import running2 from "../image/run1.gif";
import styled from "styled-components";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      problem: [],
      count: 0,
      filterProblem: [],
      answer: "",
      time: 0,
      accuracy: "",
      speed: "",
      title: ["말리꽃", "오아시스", "눈 녹듯"],
      filterTitle: "",
      timer: "",
      keyEvent: false,
      recordTime: 0,
      recordresultSpeed: 0,
      average: 0,
      id: window.localStorage.getItem("id"),
      winnerRecord: 0,
      items: "",
    };

    this.requestProblem = this.requestProblem.bind(this);
    this.ranking = this.ranking.bind(this);
    this.rankPrint = this.rankPrint.bind(this);
    // this.runStart1 = this.runStart1.bind(this);
    // this.runStart2 = this.runStart2.bind(this);
    // this.runStop = this.runStop.bind(this);
    // this.runRestart = this.runRestart.bind(this);
    // this.runChallenge = this.runChallenge.bind(this);
  }

  // 정확도 계산
  compare() {
    const { problem, count, answer, time } = this.state;

    // 수 계산(타수*60/걸린시간(초))
    // 48글자 * 60초 / 10초
    // 2880 / 10 => 288타

    const resultSpeed = (problem[count].length * 60) / time;

    console.log("시간은?", resultSpeed);

    if (problem[count] === answer) {
      this.setState({
        accuracy: "100%",
        speed: `${Math.floor(resultSpeed)}타수`,
        keyEvent: false,
        recordTime: this.state.recordTime + time,
        recordresultSpeed: this.state.recordresultSpeed + resultSpeed,
      });
      this.setState({ count: count + 1 }, function () {});
      document.querySelector(".typing").value = "";

      // this.runChallenge();

      console.log("카운트", this.state.count);
      console.log("기록", this.state.recordresultSpeed);
    } else {
      // alert("오타가 있습니다");
      this.setState({
        accuracy: "오타가 있습니다",
        speed: "오타가 있습니다",
        keyEvent: false,
      });
      document.querySelector(".typing").value = "";
      // this.setState({ speed: "오타가 있습니다" });
      // this.setState({ keyEvent: false });
      // 오타가 있습니다 출력하는게 나을듯? 오타 있으면 타수 의미가 없지 않나..
    }
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  openModal = () => {
    this.ranking();
    setTimeout(() => {
      this.setState({
        isModalOpen: true,
      });
    }, 2000); // 시간. 2초 후 실행
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  // timer
  init() {
    document.getElementById("show").innerHTML = "00:00:00";
  }

  start() {
    const show = document.getElementById("show");

    let hour = 0;
    let min = 0;
    let sec = 0;
    let timer;
    let time = 0;

    timer = setInterval(function () {
      time++;

      min = Math.floor(time / 60);
      hour = Math.floor(min / 60);
      sec = time % 60;
      min = min % 60;

      let th = hour;
      let tm = min;
      let ts = sec;
      if (th < 10) {
        th = "0" + hour;
      }
      if (tm < 10) {
        tm = "0" + min;
      }
      if (ts < 10) {
        ts = "0" + sec;
      }

      show.innerHTML = th + ":" + tm + ":" + ts;
    }, 1000);

    this.setState({ timer: timer });
  }

  stop() {
    const { timer } = this.state;

    clearInterval(timer);
  }

  reset() {
    const { timer } = this.state;

    clearInterval(timer);
    this.init();
  }

  keyboardEvent() {
    // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비
    console.log("확인", this.state.keyEvent);
    //
    const keyboardEvent = document.querySelector(".typing");

    keyboardEvent.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        // if (key.id === "Delete") {
        //   this.reset();
        //   this.start();
        // }

        // if (key.id === "Enter") {
        if (e.keyCode === 13) {
          if (
            document.querySelector(".header_problem_count").innerHTML === ""
          ) {
            this.requestProblem();
            if (e.preventDefault) e.preventDefault();
            return false;
          } else {
            // this.runStop();
            this.stop();

            const resultTime = document.getElementById("show").innerHTML;

            this.setState({ time: Number(resultTime.substring(6)) });
            this.compare();

            if (this.state.count === 2) {
              // this.ranking();
              this.rankPrint();
              // 2초 후에 렌더링 시킬 메소드 추가
            }

            if (e.preventDefault) e.preventDefault();
            return false;
          }
        } else {
          if (!this.state.keyEvent) {
            this.start();
            // this.runStart1();
            // this.runStart2();
            // this.runRestart();
            this.setState({ keyEvent: true });
          }
          key.classList.add("pressed");
        }
      }
    });

    keyboardEvent.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
    });
  }

  // 랜덤(시간 초기화, 카운트 초기화)
  requestProblem() {
    document.querySelector(".typing").value = "";
    this.setState({ keyEvent: false, count: 0, recordTime: 0 });
    this.stop();
    this.init();

    const { title } = this.state;
    const random = title[Math.floor(Math.random() * title.length)];

    // if (title) {
    if (random) {
      axios
        .post("http://localhost:8080/problem/random", { title: random })
        // .post("http://localhost:8080/problem/random", this.state)
        .then((res) => {
          let filterProblem = [];
          let filter = "";

          res.data.data.forEach((el) => {
            filterProblem.push(el.problem);
            filter = el.title;
          });

          this.setState({ problem: filterProblem });
          this.setState({ filterTitle: filter });
          this.setState({ winnerRecord: res.data.winner.time });
        })
        .catch((err) => {
          if (err) {
            alert("문제 요청 에러");
          }
        });
    } else {
      alert("에러");
    }
  }

  ranking() {
    const { id, filterTitle } = this.state;
    const items = [];
    const printRank = [];

    if (id) {
      axios
        .post("http://localhost:8080/ranking/register", this.state)
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          console.log("==", printRank);

          this.setState({ printRank: printRank });
        })
        .catch((err) => {
          console.log(err.response);
        });

      // 게스트
    } else {
      // alert("회원가입이 필요합니다");
      axios
        .post("http://localhost:8080/ranking/print", { title: filterTitle })
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          for (const [index, value] of printRank.entries()) {
            items.push(
              <div className={`result_rank__${index}`}>
                <div className="result_rank__rank">{index + 1}</div>
                <div className="result_rank__name">{value.name}</div>
                <div className="result_rank__record">
                  {value.average}타수 {value.time}초
                </div>
              </div>
            );
          }
          this.setState({ items: items });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  rankPrint() {
    this.ranking();

    setTimeout(() => {
      const { printRank } = this.state;

      // console.log("==3=3=3=3==", items[0].props.children);

      const target = document.querySelector(
        ".header_problem_result_print_rank_top3"
      );

      const newDiv = document.createElement("div");

      newDiv.className = "header_problem_result_print_rank_top3_print";
      newDiv.innerHTML = `
<div class="header_problem_result_print_rank_ranker_column">
<div class="header_problem_result_print_rank_top1_ranker">1ST</div>
<div class="header_problem_result_print_rank_top2_ranker">2ND</div>
<div class="header_problem_result_print_rank_top3_ranker">3RD</div>
</div>
<div class="header_problem_result_print_rank_speed_column">
<div class="header_problem_result_print_rank_top1_speed">${printRank[0].average}</div>
<div class="header_problem_result_print_rank_top2_speed">${printRank[1].average}</div>
<div class="header_problem_result_print_rank_top3_speed">${printRank[2].average}</div>
</div>
<div class="header_problem_result_print_rank_time_column">
<div class="header_problem_result_print_rank_top1_time">${printRank[0].time}</div>
<div class="header_problem_result_print_rank_top3_time">${printRank[2].time}</div>
<div class="header_problem_result_print_rank_top2_time">${printRank[1].time}</div>
</div>
<div class="header_problem_result_print_rank_name_column">
<div class="header_problem_result_print_rank_top1_name">${printRank[0].name}</div>
<div class="header_problem_result_print_rank_top2_name">${printRank[1].name}</div>
<div class="header_problem_result_print_rank_top3_name">${printRank[2].name}</div>
</div>
</div>
`;

      target.prepend(newDiv);
    }, 2000); // 시간. 2초 후 실행
  }

  componentDidMount() {
    this.keyboardEvent();
  }

  render() {
    const {
      accuracy,
      speed,
      problem,
      count,
      filterTitle,
      recordresultSpeed,
      recordTime,
    } = this.state;

    const nickname = window.localStorage.getItem("nick");
    // console.log("=====", this.state.winnerRecord);

    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_header">
            <div className="header_problem">
              <div className="header_problem_score">
                <div className="header_problem_score_speed">
                  <div className="header_problem_score_speed_column">속도</div>
                  <div className="header_problem_score_speed_result">
                    {speed}
                  </div>
                </div>
                <div className="header_title">{filterTitle}</div>
                <div className="header_problem_score_accuracy">
                  <div className="header_problem_score_accuracy_column">
                    정확도
                  </div>
                  <div className="header_problem_score_accuracy_result">
                    {accuracy}
                  </div>
                </div>
              </div>
              <div className="header_titleAndProblem">
                {count !== 2 ? (
                  <div className="header_problem_count">{problem[count]}</div>
                ) : (
                  <div className="header_titleAndProblem_print">
                    <div className="header_titleAndProblem_print_header">
                      기록
                    </div>
                    <div className="header_titleAndProblem_print_body">
                      <div className="header_titleAndProblem_print_body_speed">
                        <div className="header_titleAndProblem_print_body_speed_column">
                          평균
                        </div>
                        <div className="header_titleAndProblem_print_body_speed_result">
                          {Math.round(recordresultSpeed / count)}타수
                        </div>
                      </div>
                      <div className="header_titleAndProblem_print_body_time">
                        <div className="header_titleAndProblem_print_body_time_column">
                          시간
                        </div>
                        <div className="header_titleAndProblem_print_body_time_result">
                          {recordTime}초
                        </div>
                      </div>
                      <div className="header_titleAndProblem_print_body_name">
                        <div className="header_titleAndProblem_print_body_name_column">
                          이름
                        </div>
                        {nickname ? (
                          <div className="header_titleAndProblem_print_body_name_result">
                            {nickname}
                          </div>
                        ) : (
                          <div className="header_titleAndProblem_print_body_name_result">
                            Guest
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="header_problem_result_print_rank">
                      <div className="header_problem_result_print_rank_text">
                        🏆 TOP 3
                      </div>
                      <div className="header_problem_result_print_rank_top3"></div>
                      {/* <div onClick={this.openModal} className="text">
                        🏆 순위
                      </div> */}
                      {/* <Result
                        isOpen={this.state.isModalOpen}
                        time={this.state.recordTime}
                        average={recordresultSpeed / count}
                        title={this.state.filterTitle}
                        items={this.state.items}
                        close={this.closeModal}
                      /> */}
                    </div>
                  </div>
                )}
              </div>
              <div className="header_problem_tail">
                <textarea
                  type="text"
                  className="typing"
                  onChange={this.handleInputValue("answer")}
                ></textarea>
                <span id="show">00:00:00</span>
              </div>
            </div>
            <div className="header_problem_result">
              <div className="header_timer">
                <div className="start_button">
                  <img
                    className="random_start"
                    src={randomBtn}
                    width="50px"
                    height="50px"
                    alt="randomBtn"
                    onClick={this.requestProblem}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="test_input">
            <div id="keyboard">
              <div id="ㅂ" className="btn_1">
                ㅂ
              </div>
              <div id="ㅈ" className="btn_2">
                ㅈ
              </div>
              <div id="ㄷ" className="btn_3">
                ㄷ
              </div>
              <div id="ㄱ" className="btn_1">
                ㄱ
              </div>
              <div id="ㅅ" className="btn_1">
                ㅅ
              </div>
              <div id="ㅛ" className="btn_1">
                ㅛ
              </div>
              <div id="ㅕ" className="btn_1">
                ㅕ
              </div>
              <div id="ㅑ" className="btn_1">
                ㅑ
              </div>
              <div id="ㅐ" className="btn_1">
                ㅐ
              </div>
              <div id="ㅔ" className="btn_1">
                ㅔ
              </div>
              {/* <div id="Delete" className="btn_1">
                Del
              </div> */}
              <div id="Enter" className="btn_1">
                ↲
              </div>
              <div id="ㅁ" className="btn_11">
                ㅁ
              </div>
              <div id="ㅔ" className="btn_1">
                ㄴ
              </div>
              <div id="ㅇ" className="btn_1">
                ㅇ
              </div>
              <div id="ㄹ" className="btn_1">
                ㄹ
              </div>
              <div id="ㅎ" className="btn_1">
                ㅎ
              </div>
              <div id="ㅗ" className="btn_1">
                ㅗ
              </div>
              <div id="ㅓ" className="btn_1">
                ㅓ
              </div>
              <div id="ㅏ" className="btn_1">
                ㅏ
              </div>
              <div id="ㅣ" className="btn_1">
                ㅣ
              </div>
              <div id="ㅋ" className="btn_4">
                ㅋ
              </div>
              <div id="ㅌ" className="btn_1">
                ㅌ
              </div>
              <div id="ㅊ" className="btn_1">
                ㅊ
              </div>
              <div id="ㅍ" className="btn_1">
                ㅍ
              </div>
              <div id="ㅠ" className="btn_1">
                ㅠ
              </div>
              <div id="ㅜ" className="btn_1">
                ㅜ
              </div>
              <div id="ㅡ" className="btn_1">
                ㅡ
              </div>
              {/* <div id="Delete" className="btn_1">
                /
              </div> */}
              {/* <div id="Backspace" className="btn_1">
                {`<-`}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//   animation-duration: 10s;
//   animation-duration: ${(props) => props.runtime}s;
//   animation-timing-function: linear;
//   animation-play-state: paused; // 엔터 누를 때 정지 시키기?

// const Running = styled.div`
//   position: absolute;
//   animation-name: slidein;
//   animation-duration: ${(props) => props.runtime}s;
//   animation-direction: normal;
//   animation-timing-function: linear;
//   @keyframes slidein {
//     0% {
//       left: 310px;
//     }
//     100% {
//       left: 1000px;
//     }
// `;

// const Running = styled.div`
//   padding-top: 100px;
//   align-items: left;
//   padding-left: ${(props) => {
//     if (props.runtime === 0) return "0px";
//     if (props.runtime === 1) return "10px";
//     if (props.runtime === 2) return "20px";
//     if (props.runtime === 3) return "30px";
//     if (props.runtime === 3) return "40px";
//     if (props.runtime === 4) return "50px";
//     if (props.runtime === 5) return "60px";
//     if (props.runtime === 6) return "70px";
//     if (props.runtime === 7) return "80px";
//     if (props.runtime === 8) return "90px";
//     if (props.runtime === 9) return "100px";
//     else return "0px";
//   }};
// `;

export default withRouter(Test);

// return (
//   <div>
//     <Nav />
//     <div id="test">
//       <div className="test_header">
//         <div className="header_problem">
//           <div className="header_problem_score">
//             <div className="header_problem_score_speed">
//               <div className="header_problem_score_speed_column">속도</div>
//               <div className="header_problem_score_speed_result">
//                 {speed}
//               </div>
//             </div>
//             <div className="header_problem_score_accuracy">
//               <div className="header_problem_score_accuracy_column">
//                 정확도
//               </div>
//               <div className="header_problem_score_accuracy_result">
//                 {accuracy}
//               </div>
//             </div>
//           </div>
//           <div className="header_titleAndProblem">
//             <div className="header_title">{filterTitle}</div>
//             <div className="header_problem_count">{problem[count]}</div>
//           </div>
//           <textarea
//             type="text"
//             className="typing"
//             onChange={this.handleInputValue("answer")}
//           ></textarea>
//           <span id="show">00:00:00</span>
//         </div>
//         <div className="header_problem_result">
//           {count === 2 ? (
//             <div className="header_problem_result_print">
//               <div className="header_problem_result_print_header">결과</div>
//               <div className="header_problem_result_print_body">
//                 <div className="header_problem_result_print_body_speed">
//                   <div className="header_problem_result_print_body_speed_column">
//                     평균
//                   </div>
//                   <div className="header_problem_result_print_body_speed_result">
//                     {Math.round(recordresultSpeed / count)}타수
//                   </div>
//                 </div>
//                 <div className="header_problem_result_print_body_time">
//                   <div className="header_problem_result_print_body_time_column">
//                     걸린 시간
//                   </div>
//                   <div className="header_problem_result_print_body_time_result">
//                     {recordTime}초
//                   </div>
//                 </div>
//               </div>
//               <div className="header_problem_result_print_rank">
//                 <div onClick={this.openModal} className="text">
//                   🏆 순위
//                 </div>
//                 <Result
//                   isOpen={this.state.isModalOpen}
//                   time={this.state.recordTime}
//                   average={recordresultSpeed / count}
//                   title={this.state.filterTitle}
//                   items={this.state.items}
//                   close={this.closeModal}
//                 />
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="header_timer">
//                 <div className="start_button">
//                   <img
//                     className="random_start"
//                     src={randomBtn}
//                     width="50px"
//                     height="50px"
//                     alt="randomBtn"
//                     onClick={this.requestProblem}
//                   />
//                   {/* <input
//                     type="button"
//                     value="랜덤"
//                     className="random_start"
//                     onClick={this.requestProblem}
//                   ></input> */}
//                   {/* <select type="button" className="select_start">
//                     <option value="select">선택</option>
//                     <option value="select_1">눈 녹듯</option>
//                     <option value="select_2">말리꽃</option>
//                     <option value="select_3">오아시스</option>
//                   </select> */}
//                   {/* <div className="stop" onClick={this.runStop}>
//                     스톱
//                   </div>
//                   <div className="restart" onClick={this.runRestart}>
//                     재시작
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="test_input">
//         {/* <div className="test_run">
//           <div className="test_run_1st">
//             <img
//               className="runImg"
//               src={running}
//               width="150px"
//               height="100px"
//               alt="1st"
//             />
//           </div>
//           <div className="test_run_challenger">
//             <img
//               className="run_challenger"
//               src={running2}
//               width="110px"
//               height="80px"
//               alt="challenge"
//             />
//           </div>
//         </div> */}
//         {/* <textarea
//           type="text"
//           className="typing"
//           onChange={this.handleInputValue("answer")}
//         ></textarea> */}
//         {/* <div className="header_problem_score">
//           <div className="result">
//             속도: {speed} <br></br>정확도: {accuracy}
//           </div>
//         </div> */}
//         <div id="keyboard">
//           <div id="ㅂ" className="btn_1">
//             ㅂ
//           </div>
//           <div id="ㅈ" className="btn_2">
//             ㅈ
//           </div>
//           <div id="ㄷ" className="btn_3">
//             ㄷ
//           </div>
//           <div id="ㄱ" className="btn_1">
//             ㄱ
//           </div>
//           <div id="ㅅ" className="btn_1">
//             ㅅ
//           </div>
//           <div id="ㅛ" className="btn_1">
//             ㅛ
//           </div>
//           <div id="ㅕ" className="btn_1">
//             ㅕ
//           </div>
//           <div id="ㅑ" className="btn_1">
//             ㅑ
//           </div>
//           <div id="ㅐ" className="btn_1">
//             ㅐ
//           </div>
//           <div id="ㅔ" className="btn_1">
//             ㅔ
//           </div>
//           {/* <div id="Delete" className="btn_1">
//             Del
//           </div> */}
//           <div id="Enter" className="btn_1">
//             Del
//           </div>
//           <div id="ㅁ" className="btn_11">
//             ㅁ
//           </div>
//           <div id="ㅔ" className="btn_1">
//             ㄴ
//           </div>
//           <div id="ㅇ" className="btn_1">
//             ㅇ
//           </div>
//           <div id="ㄹ" className="btn_1">
//             ㄹ
//           </div>
//           <div id="ㅎ" className="btn_1">
//             ㅎ
//           </div>
//           <div id="ㅗ" className="btn_1">
//             ㅗ
//           </div>
//           <div id="ㅓ" className="btn_1">
//             ㅓ
//           </div>
//           <div id="ㅏ" className="btn_1">
//             ㅏ
//           </div>
//           <div id="ㅣ" className="btn_1">
//             ㅣ
//           </div>
//           <div id="ㅋ" className="btn_4">
//             ㅋ
//           </div>
//           <div id="ㅌ" className="btn_1">
//             ㅌ
//           </div>
//           <div id="ㅊ" className="btn_1">
//             ㅊ
//           </div>
//           <div id="ㅍ" className="btn_1">
//             ㅍ
//           </div>
//           <div id="ㅠ" className="btn_1">
//             ㅠ
//           </div>
//           <div id="ㅜ" className="btn_1">
//             ㅜ
//           </div>
//           <div id="ㅡ" className="btn_1">
//             ㅡ
//           </div>
//           <div id="Delete" className="btn_1">
//             /
//           </div>
//         </div>
//       </div>
//       {/* <div className="test_submit"></div> */}
//     </div>
//   </div>
// );
// }
// }

// 달리기 관련
// 달리기(시작, 일시정지, 재시작)
// runStart1() {
//   const running1 = document.querySelector(".runImg");

//   running1.style.animationDuration = `${this.state.winnerRecord}s`;
// }

// runStart2() {
//   const { time } = this.state;
//   const running2 = document.querySelector(".run_challenger");

//   if (time === 0)
//     running2.style.animationDuration = `${this.state.winnerRecord}s`;
//   else running2.style.animationDuration = `${this.state.time * 2}s`;
// }

// runStop() {
//   const running1 = document.querySelector(".runImg");
//   const running2 = document.querySelector(".run_challenger");

//   running1.style.animationPlayState = "paused";
//   running2.style.animationPlayState = "paused";
// }

// runRestart() {
//   const running1 = document.querySelector(".runImg");
//   const running2 = document.querySelector(".run_challenger");

//   running1.style.animationPlayState = "running";
//   running2.style.animationPlayState = "running";
// }

// // 1등 기록 - 지난 시간(지난 문제 경과 시간) = 시간(..)
// runChallenge() {
//   const running2 = document.querySelector(".run_challenger");

//   // const newDuration = this.state.recordTime * 2;
//   const newDuration = this.state.time * 2;

//   running2.style.animationDuration = `${newDuration}s`;
//   // running.style.animationDuration = "60s";
// }

// 랭킹 코드
// if (id) {
//   axios
//     .post("http://localhost:8080/ranking/register", this.state)
//     .then((res) => {
//       res.data.data.forEach((el) => {
//         printRank.push({
//           name: el.name,
//           average: el.average,
//           time: el.time,
//         });
//       });
//       for (const [index, value] of printRank.entries()) {
//         items.push(
//           // <div className={`rank__${index}`}>
//           //   {index + 1}등 {value.name} {value.average}타수 {value.time}초
//           // </div>
//           <div className={`result_rank__${index}`}>
//             <div className="result_rank__rank">{index + 1}</div>
//             <div className="result_rank__name">{value.name}</div>
//             <div className="result_rank__record">
//               {value.average}타수 {value.time}초
//             </div>
//           </div>
//         );
//       }
//       this.setState({ items: items });
//     })
//     .catch((err) => {
//       console.log(err.response);
//     });

//   // 게스트
// } else {
//   // alert("회원가입이 필요합니다");
//   axios
//     .post("http://localhost:8080/ranking/print", { title: filterTitle })
//     .then((res) => {
//       res.data.data.forEach((el) => {
//         printRank.push({
//           name: el.name,
//           average: el.average,
//           time: el.time,
//         });
//       });
//       for (const [index, value] of printRank.entries()) {
//         items.push(
//           <div className={`result_rank__${index}`}>
//             <div className="result_rank__rank">{index + 1}</div>
//             <div className="result_rank__name">{value.name}</div>
//             <div className="result_rank__record">
//               {value.average}타수 {value.time}초
//             </div>
//           </div>
//         );
//       }
//       this.setState({ items: items });
//     })
//     .catch((err) => {
//       console.log(err.response);
//     });
// }

// `
// <div class="header_problem_result_print_rank_top1">
// <div class="header_problem_result_print_rank_top1_speed">${printRank[0].average}</div>
// <div class="header_problem_result_print_rank_top1_time">${printRank[0].time}</div>
// <div class="header_problem_result_print_rank_top1_name">${printRank[0].name}</div>
// </div>
// <div class="header_problem_result_print_rank_top2">
// <div class="header_problem_result_print_rank_top2_speed">${printRank[1].average}</div>
// <div class="header_problem_result_print_rank_top2_time">${printRank[1].time}</div>
// <div class="header_problem_result_print_rank_top2_name">${printRank[1].name}</div>
// </div>
// <div class="header_problem_result_print_rank_top3">
// <div class="header_problem_result_print_rank_top3_speed">${printRank[2].average}</div>
// <div class="header_problem_result_print_rank_top3_time">${printRank[2].time}</div>
// <div class="header_problem_result_print_rank_top3_name">${printRank[2].name}</div>
// </div>
// </div>
// `;
