import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import randomBtn from "../image/power.png";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: [],
      count: 0,
      filterProblem: [],
      answer: "",
      time: 0,
      accuracy: "",
      speed: "",
      title: ["광야", "님의 손길", "진달래꽃"],
      filterTitle: "",
      timer: "",
      keyEvent: false,
      recordTime: 0,
      recordresultSpeed: 0,
      average: 0,
      id: window.localStorage.getItem("id"),
      winnerRecord: 0,
      items: "",
      recordArray: [],
      timeArray: [],
    };

    this.requestProblem = this.requestProblem.bind(this);
    this.requestRefresh = this.requestRefresh.bind(this);
    this.ranking = this.ranking.bind(this);
    this.rankPrint = this.rankPrint.bind(this);
  }

  // 정확도 계산
  compare() {
    const { problem, count, answer, time, recordArray } = this.state;

    // 반짝이는 듯속에 나는 두 손 모아 빌었지(50유효타수, 4초)
    // 50타 * 60초 / 4초 => 750타?
    // 백스페이스 7번

    // 일단 스페이스 빼자
    // 스페이스는 하나만 인정(배열에는 스페이스 하나당 세개씩 들어감)
    // 빈 칸 3칸이면 undefinded가 9개 들어감

    // 수 계산(타수*60/걸린시간(초))
    // 48글자 * 60초 / 10초
    // 2880 / 10 => 288타

    // 타수
    // 현재속도 = (타수(글자수) - 백스페이스 * 2) / 경과시간(초) * 60초
    // 한컴타자는 백스페이스 * 3
    const tasu = this.getConstantVowel(problem[count]);
    const tasuJS = JSON.stringify(tasu);
    const inputAnswer = this.getConstantVowel(answer);
    const inputAnswerJS = JSON.stringify(inputAnswer);

    // 타수
    const resultSpeed = (tasu.length * 60) / time;

    // 정확도
    // if (problem[count] === answer) {
    if (tasuJS === inputAnswerJS) {
      this.setState({
        accuracy: "100%",
        speed: `${Math.floor(resultSpeed)}타수`,
        keyEvent: false,
        recordTime: this.state.recordTime + time,
        recordresultSpeed: this.state.recordresultSpeed + resultSpeed,
      });
      this.setState({ count: count + 1 }, function () {});

      recordArray.push(Math.floor(resultSpeed));
      this.setState({ recordArray: recordArray });

      if (this.state.count < 7) document.querySelector(".typing").value = "";
      // if (this.state.count < 2) document.querySelector(".typing").value = "";

      // 색 초기화
      if (this.state.count < 7) {
        // if (this.state.count < 2) {
        for (
          let i = 0;
          i < document.querySelector(".header_problem_count").children.length;
          i++
        ) {
          document.querySelector(`.header_problem_count .t${i}`).style.color =
            "white";
        }
      }
    } else {
      let right = 0;

      for (let i = 0; i < inputAnswer.length; i++) {
        if (JSON.stringify(tasu[i]) === JSON.stringify(inputAnswer[i])) {
          right++;
        }
      }

      const acc = ((right / tasu.length) * 100).toFixed(1);

      this.setState({
        accuracy: `${acc}%`,
        speed: `${Math.floor((inputAnswer.length * 60) / time)}타수`,
        keyEvent: false,
      });
      document.querySelector(".typing").value = "";
    }
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  // 타이머 초기화
  init() {
    document.getElementById("show").innerHTML = "00:00";
  }

  // 타이머 시작
  start() {
    const show = document.getElementById("show");

    let sec = 0;
    let timer;
    let time = 0;
    let ms = 0;

    timer = setInterval(function () {
      // time 0.01초씩 증가
      time++;

      let ts = sec;
      let tm = ms;

      ms = time % 100;

      if (time % 100 === 0) sec++;
      if (sec < 10) ts = "0" + sec;
      if (ms < 10 || ms === 100) tm = "0" + ms;

      show.innerHTML = ts + ":" + tm;
    }, 10);

    this.setState({ timer: timer });
  }

  // 타이머 정지
  stop() {
    const { timer } = this.state;

    clearInterval(timer);
  }

  // 키보드 이벤트
  keyboardEvent() {
    // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비
    // console.log("확인", this.state.keyEvent);
    const keyboardEvent = document.querySelector(".typing");

    keyboardEvent.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode === 13) {
          if (
            document.querySelector(".header_problem_count").innerHTML === "" ||
            document.querySelector(".header_problem_count").childNodes
              .length === 9
          ) {
            this.requestProblem();
            if (e.preventDefault) e.preventDefault();
            return false;
          } else {
            this.stop();

            const resultTime = document
              .getElementById("show")
              .innerHTML.split(":");

            this.setState({
              time: Number(`${resultTime[0]}.${resultTime[1]}`),
            });
            this.compare();

            if (this.state.count === 7) {
              // if (this.state.count === 2) {
              this.rankPrint();
              // 2초 후에 렌더링 시킬 메소드 추가
            }

            if (e.preventDefault) e.preventDefault();
            return false;
          }
        } else {
          if (!this.state.keyEvent) {
            this.start();
            this.setState({ keyEvent: true });

            // 색상 초기화
            for (
              let i = 0;
              i <
              document.querySelector(".header_problem_count").children.length;
              i++
            ) {
              document.querySelector(
                `.header_problem_count .t${i}`
              ).style.color = "white";
            }
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
    const divChange = document.querySelector(".header_problem_count").children
      .length;

    for (let i = 0; i < divChange; i++) {
      document.querySelector(`.header_problem_count .t${i}`).style.color =
        "white";
    }

    this.setState({ keyEvent: false, count: 0, recordTime: 0 });
    this.stop();
    this.init();

    const { title } = this.state;
    const random = title[Math.floor(Math.random() * title.length)];

    // if (title) {
    if (random) {
      axios
        // .post("http://localhost:8080/problem/random", { title: random })
        .post("https://tajachija.tk:8080/problem/random", { title: random })
        .then((res) => {
          let filterProblem = [];
          let filter = "";

          res.data.data.forEach((el) => {
            filterProblem.push(el.problem);
            filter = el.title;
          });

          if (res.data.winner) {
            this.setState({ problem: filterProblem });
            this.setState({ filterTitle: filter });
            this.setState({ winnerRecord: res.data.winner.time });
          } else {
            this.setState({ problem: filterProblem });
            this.setState({ filterTitle: filter });
          }
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

  // 문제 요청 새로고침
  requestRefresh() {
    document.querySelector(".typing").value = "";

    this.setState({ keyEvent: false, count: 0, recordTime: 0 });
    this.stop();
    this.init();

    const { title } = this.state;
    const random = title[Math.floor(Math.random() * title.length)];

    if (random) {
      axios
        // .post("http://localhost:8080/problem/random", { title: random })
        .post("https://tajachija.tk:8080/problem/random", { title: random })
        .then((res) => {
          let filterProblem = [];
          let filter = "";

          res.data.data.forEach((el) => {
            filterProblem.push(el.problem);
            filter = el.title;
          });

          if (res.data.winner) {
            this.setState({ problem: filterProblem });
            this.setState({ filterTitle: filter });
            this.setState({ winnerRecord: res.data.winner.time });
          } else {
            this.setState({ problem: filterProblem });
            this.setState({ filterTitle: filter });
          }
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

  // 순위 요청
  ranking() {
    const { id, filterTitle } = this.state;
    const printRank = [];

    if (id) {
      axios
        // .post("http://localhost:8080/ranking/register", this.state)
        .post("https://tajachija.tk:8080/ranking/register", this.state)
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });

          this.setState({ printRank: printRank });
        })
        .catch((err) => {
          console.log(err.response);
        });

      // 게스트
    } else {
      // alert("회원가입이 필요합니다");
      axios
        // .post("http://localhost:8080/ranking/print", {
        //   title: filterTitle,
        //   name: null,
        // })
        .post("https://tajachija.tk:8080/ranking/print", {
          title: filterTitle,
          name: null,
        })
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });

          this.setState({ printRank: printRank });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  // 순위 출력
  rankPrint() {
    this.ranking();

    setTimeout(() => {
      const { printRank } = this.state;

      const target = document.querySelector(
        ".header_problem_result_print_rank_top3"
      );

      const newDiv = document.createElement("div");

      newDiv.className = "header_problem_result_print_rank_top3_print";

      let PrintRankLenth = printRank.length;
      if (PrintRankLenth > 3) PrintRankLenth = 3;

      for (let i = 0; i < PrintRankLenth; i++) {
        newDiv.innerHTML += `
        <div id="header_problem_result_print_rank_top3_print_print_${i}">
          <div class="header_problem_result_print_rank_top_ranker}">${i + 1}등
        </div>
        <div class="header_problem_result_print_rank_speed_column">
        <div class="header_problem_result_print_rank_top_speed">${
          printRank[i].average
        }타수</div>
        </div>
        <div class="header_problem_result_print_rank_time_column">
        <div class="header_problem_result_print_rank_top_time">${
          printRank[i].time
        }초</div>
         </div>
        <div class="header_problem_result_print_rank_name_column">
        <div class="header_problem_result_print_rank_top_name">${
          printRank[i].name
        }</div>
        </div>
        </div>
        `;
      }

      // printRank.forEach(function (el, index) {
      //   newDiv.innerHTML += `
      //     <div id="header_problem_result_print_rank_top3_print_print_${index}">
      //     <div class="header_problem_result_print_rank_top_ranker}">${
      //       index + 1
      //     }등
      //     </div>
      //     <div class="header_problem_result_print_rank_speed_column">
      //     <div class="header_problem_result_print_rank_top_speed">${
      //       el.average
      //     }타수</div>
      //     </div>
      //     <div class="header_problem_result_print_rank_time_column">
      //     <div class="header_problem_result_print_rank_top_time">${
      //       el.time
      //     }초</div>
      //      </div>
      //     <div class="header_problem_result_print_rank_name_column">
      //     <div class="header_problem_result_print_rank_top_name">${
      //       el.name
      //     }</div>
      //     </div>
      //     </div>

      //     `;
      // });

      target.prepend(newDiv);
    }, 2000); // 시간. 2초 후 실행
  }

  // 정확도 체크
  testValid() {
    const problemValid = document.querySelector(".typing");
    const problemCheck = document.querySelector(".header_problem_count");

    problemValid.addEventListener("input", (e) => {
      if (problemCheck.childNodes.length > 9) {
        const input = e.target.value;
        const inputLen = e.target.value.length;
        const newProblem = this.state.problem[this.state.count].split("");

        // 조건문 개선
        let counter = inputLen + 3;
        let limit = newProblem.length + 4;

        if (counter > 3 && counter < limit) {
          if (input[counter - 4] === newProblem[counter - 4]) {
            document.querySelector(
              `.header_problem_count .t${counter - 4}`
            ).style.color = "#efdc05";
          } else {
            document.querySelector(
              `.header_problem_count .t${counter - 4}`
            ).style.color = "#e53a40";
          }
        }
      }
    });
  }

  getConstantVowel(kor) {
    const f = [
      "ㄱ", // -31439
      "ㄲ", // -31438
      "ㄴ", // -31436
      "ㄷ", // -31433
      "ㄸ", // -31432
      "ㄹ", // -31431
      "꽃", // -31423
      "ㅂ", // -31422
      "ㅃ", // -31421
      "ㅅ", // -31419
      "ㅆ", // -31418
      "스", // -31417
      "ㅈ", // -31416
      "ㅉ", // -31415
      "ㅊ", // -31414
      "ㅋ", // -31413
      "ㅌ", // -31412
      "ㅍ", // -31411
      "ㅎ", // -31410
    ];
    const s = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    const t = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    const ga = 44032;
    let result = [];

    for (let i = 0; i < kor.length; i++) {
      let uni = kor[i].charCodeAt(0);
      uni = uni - ga;

      // 자음 입력 하나만 된 것 => ("강", "ㅎ") "ㅎ"의 경우
      if (uni < 0) {
        if (uni === -31439) {
          result.push(f[0]);
        }
        if (uni === -31438) {
          result.push(f[1]);
        }
        if (uni === -31436) {
          result.push(f[2]);
        }
        if (uni === -31433) {
          result.push(f[3]);
        }
        if (uni === -31432) {
          result.push(f[4]);
        }
        if (uni === -31431) {
          result.push(f[5]);
        }
        if (uni === -31423) {
          result.push(f[6]);
        }
        if (uni === -31422) {
          result.push(f[7]);
        }
        if (uni === -31421) {
          result.push(f[8]);
        }
        if (uni === -31419) {
          result.push(f[9]);
        }
        if (uni === -31418) {
          result.push(f[10]);
        }
        if (uni === -31417) {
          result.push(f[11]);
        }
        if (uni === -31416) {
          result.push(f[12]);
        }
        if (uni === -31415) {
          result.push(f[13]);
        }
        if (uni === -31414) {
          result.push(f[14]);
        }
        if (uni === -31413) {
          result.push(f[15]);
        }
        if (uni === -31412) {
          result.push(f[16]);
        }
        if (uni === -31411) {
          result.push(f[17]);
        }
        if (uni === -31410) {
          result.push(f[18]);
        }
      } else {
        let fn = parseInt(uni / 588);
        let sn = parseInt((uni - fn * 588) / 28);
        let tn = parseInt(uni % 28);

        if (tn === 0) {
          result.push(f[fn], s[sn]);
        } else {
          result.push(f[fn], s[sn], t[tn]);
        }
      }
    }

    let final = result.filter((item) => {
      return item !== null && item !== undefined;
      // && item !== "";
    });

    return final;
  }

  componentDidMount() {
    this.keyboardEvent();
    this.testValid();
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

    const tt = String(problem[count]);
    const ttt = tt.split("");
    const tttt = ttt.map((el, index) => (
      <span className={"t" + index}>{el}</span>
    ));

    const nickname = window.localStorage.getItem("nick");
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_____header____tail">
            {/* <div className="test_header"> */}

            <div className="header_problem">
              <div className="header_problem_score">
                <div className="header_problem_score_speed">
                  <div className="header_problem_score_speed_column">타수</div>
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
                {count !== 7 ? (
                  // {count !== 2 ? (
                  <div className="header_problem_count_header">
                    {tttt.length !== 9 ? (
                      <div className="problemAndTyping">
                        <div className="header_problem_count">{tttt}</div>
                        <textarea
                          type="text"
                          className="typing"
                          onChange={this.handleInputValue("answer")}
                          autoFocus
                        ></textarea>
                      </div>
                    ) : (
                      <div className="problemAndTyping">
                        <div className="header_problem_count"></div>
                        <textarea
                          type="text"
                          className="typing"
                          onChange={this.handleInputValue("answer")}
                          autoFocus
                        ></textarea>
                      </div>
                    )}
                  </div>
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
                          {recordTime.toFixed(1)}초
                        </div>
                      </div>
                      <div className="header_titleAndProblem_print_body_name">
                        <div className="header_titleAndProblem_print_body_name_column">
                          닉네임
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
                        <Link to="/ranking">🏆</Link> TOP 3
                      </div>
                      <div className="header_problem_result_print_rank_top3"></div>
                    </div>
                  </div>
                )}
              </div>
              {count !== 7 ? (
                // {count !== 2 ? (
                <div className="header_problem_tail">
                  {/* <textarea
                    type="text"
                    className="typing"
                    onChange={this.handleInputValue("answer")}
                    autoFocus
                  ></textarea> */}
                  <span id="show">00:00:00</span>
                </div>
              ) : (
                <div className="header_problem_tail_end">
                  <textarea
                    type="text"
                    className="typing"
                    onChange={this.handleInputValue("answer")}
                    disabled
                  ></textarea>
                  <span id="show">00:00:00</span>
                </div>
              )}
            </div>
            <div className="header_problem_result">
              <div className="header_timer">
                {count !== 7 ? (
                  // {count !== 2 ? (
                  <div className="start_button">
                    {!checkLogin ? (
                      <div
                        className="tail_button_test_login_false"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestProblem}
                      />
                    ) : (
                      <div
                        className="tail_button_test_login_true"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestProblem}
                      />
                    )}

                    {/* <img
                        className="random_start"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestProblem}
                      /> */}
                  </div>
                ) : (
                  <div className="start_button">
                    {!checkLogin ? (
                      <div
                        className="tail_button_test_login_false"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestRefresh}
                      />
                    ) : (
                      <div
                        className="tail_button_test_login_true"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestRefresh}
                      />
                    )}

                    {/* <img
                        className="random_start_rank"
                        src={randomBtn}
                        width="50px"
                        height="50px"
                        alt="randomBtn"
                        onClick={this.requestRefresh}
                      /> */}
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}

            {count !== 7 ? (
              // {count !== 2 ? (
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
                </div>
              </div>
            ) : (
              <div className="test_input">
                <div id="keyboard">
                  <div id="ㅂ" className="btn_1_end">
                    ㅂ
                  </div>
                  <div id="ㅈ" className="btn_2_end">
                    ㅈ
                  </div>
                  <div id="ㄷ" className="btn_3_end">
                    ㄷ
                  </div>
                  <div id="ㄱ" className="btn_1_end">
                    ㄱ
                  </div>
                  <div id="ㅅ" className="btn_1_end">
                    ㅅ
                  </div>
                  <div id="ㅛ" className="btn_1_end">
                    ㅛ
                  </div>
                  <div id="ㅕ" className="btn_1_end">
                    ㅕ
                  </div>
                  <div id="ㅑ" className="btn_1_end">
                    ㅑ
                  </div>
                  <div id="ㅐ" className="btn_1_end">
                    ㅐ
                  </div>
                  <div id="ㅔ" className="btn_1_end">
                    ㅔ
                  </div>
                  <div id="Enter" className="btn_1_end">
                    ↲
                  </div>
                  <div id="ㅁ" className="btn_11_end">
                    ㅁ
                  </div>
                  <div id="ㅔ" className="btn_1_end">
                    ㄴ
                  </div>
                  <div id="ㅇ" className="btn_1_end">
                    ㅇ
                  </div>
                  <div id="ㄹ" className="btn_1_end">
                    ㄹ
                  </div>
                  <div id="ㅎ" className="btn_1_end">
                    ㅎ
                  </div>
                  <div id="ㅗ" className="btn_1_end">
                    ㅗ
                  </div>
                  <div id="ㅓ" className="btn_1_end">
                    ㅓ
                  </div>
                  <div id="ㅏ" className="btn_1_end">
                    ㅏ
                  </div>
                  <div id="ㅣ" className="btn_1_end">
                    ㅣ
                  </div>
                  <div id="ㅋ" className="btn_4_end">
                    ㅋ
                  </div>
                  <div id="ㅌ" className="btn_1_end">
                    ㅌ
                  </div>
                  <div id="ㅊ" className="btn_1_end">
                    ㅊ
                  </div>
                  <div id="ㅍ" className="btn_1_end">
                    ㅍ
                  </div>
                  <div id="ㅠ" className="btn_1_end">
                    ㅠ
                  </div>
                  <div id="ㅜ" className="btn_1_end">
                    ㅜ
                  </div>
                  <div id="ㅡ" className="btn_1_end">
                    ㅡ
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Test);
