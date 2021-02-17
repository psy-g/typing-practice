import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";
// import Result from "./Result";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      // problem:
      //   "얼마나 더 견뎌야 하는지 짙은 어둠을 헤매고 있어 내가 바란 꿈이라는 것은 없는 걸까?",
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
    };

    this.requestProblem = this.requestProblem.bind(this);
  }

  // 정확도 계산
  compare() {
    const { problem, count, answer, time } = this.state;

    // const resetInput = document.querySelector(".typing").value;

    // console.log("input", resetInput);

    // 타수 계산(타수*60/걸린시간(초))
    // 48글자 * 60초 / 10초
    // 2880 / 10 => 288타

    // const resultSpeed = 2880 / time;
    const resultSpeed = (problem[count].length * 60) / time;

    console.log("시간은?", resultSpeed);

    if (problem[count] === answer) {
      this.setState({ accuracy: "100%" });
      this.setState({ speed: `${resultSpeed}타수` });
      this.setState({ count: count + 1 }, function () {});
      document.querySelector(".typing").value = "";
      this.setState({ keyEvent: false });
    } else {
      // alert("오타가 있습니다");
      this.setState({ accuracy: "오타가 있습니다" });
      this.setState({ speed: "오타가 있습니다" });
      document.querySelector(".typing").value = "";
      this.setState({ keyEvent: false });
      // 오타가 있습니다 출력하는게 나을듯? 오타 있으면 타수 의미가 없지 않나..
    }

    console.log("problem", problem);
    console.log("answer", answer);
    // console.log("time", time);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
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

    console.log("stop", timer);

    clearInterval(timer);
  }

  reset() {
    const { timer } = this.state;

    clearInterval(timer);
    // time = 0;
    this.init();
  }

  keyboardEvent() {
    // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비
    console.log("확인", this.state.keyEvent);
    //
    const keyboardEvent = document.querySelector(".typing");

    keyboardEvent.addEventListener("keydown", (e) => {
      // keyboardEvent.addEventListener("keypress", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        // if (key.id === "Delete") {
        //   this.reset();
        //   this.start();
        // }

        // if (key.id === "Enter") {
        if (e.keyCode === 13) {
          if (document.querySelector(".header_problem").innerHTML === "") {
            this.requestProblem();
            if (e.preventDefault) e.preventDefault();
            return false;
          } else {
            this.stop();
            const resultTime = document.getElementById("show").innerHTML;
            // console.log("입력시간", Number(resultTime.substring(6)));
            this.setState({ time: Number(resultTime.substring(6)) });
            // this.setState({ time: resultTime });
            this.compare();
            // console.log("=====", keyboardEvent.value);
            if (e.preventDefault) e.preventDefault();
            return false;
          }
        } else {
          if (!this.state.keyEvent) {
            this.start();
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

  requestProblem() {
    const { title } = this.state;

    // console.log("타이틀", title);

    if (title) {
      axios
        .post("http://localhost:8080/problem/random", this.state)
        .then((res) => {
          // this.setState({ problem: res.data.data });
          // console.log("문제", this.state.problem);
          // console.log("문제", this.state.problem[0].problem);
          let filterProblem = [];
          let filter = "";

          res.data.data.forEach((el) => {
            filterProblem.push(el.problem);
            filter = el.title;
          });

          this.setState({ problem: filterProblem });
          this.setState({ filterTitle: filter });

          // console.log("====", filter);
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

  problem() {
    const { problem, filterProblem } = this.state;
  }

  componentDidMount() {
    // this.timer();
    this.keyboardEvent();
  }

  render() {
    const { accuracy, speed, problem, count, filterTitle } = this.state;

    // problem.forEach((el) => {
    //   filterProblem.push(el.problem);
    // });

    // console.log("??", count);

    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_header">
            <div className="header_title">{filterTitle}</div>
            {/* <div className="header_problem">{this.state.problem}</div> */}
            <div className="header_problem">{problem[count]}</div>
            <div className="header_timer">
              {/* <p id="show">0</p> */}
              <span id="show">00:00:00</span>
              <span>초</span>
              <div className="start_button">
                <input
                  type="button"
                  value="랜덤"
                  className="random_start"
                  onClick={this.requestProblem}
                ></input>
                {/* <input
                  type="button"
                  value="start"
                  className="timer_start"
                ></input>
                <input
                  type="button"
                  value="stop"
                  className="timer_stop"
                ></input> */}
                {/* <input
                  type="button"
                  value="reset"
                  className="timer_reset"
                ></input> */}
                <select type="button" className="select_start">
                  <option value="select">선택</option>
                  <option value="select_1">눈 녹듯</option>
                  {/* <option value="select_1" onChange={alert("안뇽")}>
                    눈 녹듯
                  </option> */}
                  <option value="select_2">말리꽃</option>
                  <option value="select_3">오아시스</option>
                </select>
                {/* <input
                  type="button"
                  value="선택"
                  className="select_start"
                ></input> */}
              </div>
            </div>
          </div>
          <div className="test_input">
            <textarea
              type="text"
              className="typing"
              onChange={this.handleInputValue("answer")}
            ></textarea>
            <div className="row">
              <div className="result">
                속도: {speed} <br></br>정확도: {accuracy}
              </div>
              {/* <div className="btn_result">
                <div onClick={this.openModal} className="text">
                  결과확인
                </div>
                <Result
                  isOpen={this.state.isModalOpen}
                  close={this.closeModal}
                />
              </div> */}
            </div>
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
                Del
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
              <div id="Delete" className="btn_1">
                /
              </div>
            </div>
          </div>
          <div className="test_submit"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Test);
