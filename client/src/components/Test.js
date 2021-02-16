import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";
// import Result from "./Result";
import { withRouter } from "react-router-dom";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      problem:
        "얼마나 더 견뎌야 하는지 짙은 어둠을 헤매고 있어 내가 바란 꿈이라는 것은 없는 걸까?",
      answer: "",
      time: "빠져버린",
      accuracy: "",
      speed: "",
    };
  }

  // 정확도 계산
  compare() {
    const { problem, answer, time } = this.state;

    // if (problem === answer) alert("100%");
    // else {
    //   alert("틀렸당");
    // }

    // 타수 계산(타수*60/걸린시간(초))
    // 48글자 * 60초 / 10초
    // 2880 / 10 => 288타

    // const resultSpeed = 2880 / time;
    const resultSpeed = (problem.length * 60) / time;

    console.log("시간은?", resultSpeed);

    if (problem === answer) {
      this.setState({ accuracy: "100%" });
      this.setState({ speed: `${resultSpeed}타수` });
    } else {
      // alert("오타가 있습니다");
      this.setState({ accuracy: "오타가 있습니다" });
      this.setState({ speed: "오타가 있습니다" });
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

  keyboardEvent() {
    const keyboardEvent = document.querySelector(".typing");
    // console.log("===", keyboard.children[0].innerHTML);
    // console.log("len", keyboard.children.length);

    // keyboardEvent.addEventListener("keydown", (e) => {
    //   // if (keyboard) keyboard.children[0].classList.add("pressed");
    //   const key = document.getElementById(e.key);
    //   if (key) key.classList.add("pressed");
    // });
    keyboardEvent.addEventListener("keydown", (e) => {
      // if (keyboard) keyboard.children[0].classList.add("pressed");
      const key = document.getElementById(e.key);

      // console.log("===del====", key.id);

      if (key) {
        // if (key.id === "Delete") {
        if (key.id === "Enter") {
          this.showResult();
          // this.props.history.push("/");
        } else {
          key.classList.add("pressed");
        }
      }
    });

    keyboardEvent.addEventListener("keyup", (e) => {
      // if (keyboard) keyboard.children[0].classList.remove("pressed");
      const key = document.getElementById(e.key);
      if (key) key.classList.remove("pressed");
    });

    //
    // keyboardEnter.addEventListener("keydown", (e) => {
    //   const key = document.getElementById(e.key);
    //   if (key) this.props.history.push("/");
    // });
  }

  showResult = () => {
    // const confirmResult = document.querySelector(".btn_result");
    // const confirmResult = document.querySelector(".row");

    this.compare();

    // confirmResult.click();

    // this.props.history.push("/");
  };

  // 타이머
  timer() {
    // const { time } = this.state;
    // const startButton = document.querySelector(".timer_start");
    const stopButton = document.querySelector(".timer_stop");
    const resetButton = document.querySelector(".timer_reset");

    // inputText.addEventListener("keydown", function (event) {
    //   console.log("Textarea two was changed.");
    // });

    let timer;

    // 시작
    function start() {
      const show = document.getElementById("show");
      const startSeconds = new Date().getSeconds();

      timer = setInterval(function () {
        show.innerHTML = new Date().getSeconds() - startSeconds;
      }, 1000);
    }

    // 중지
    function stop() {
      clearInterval(timer);
    }

    // 리셋
    function reset() {
      const show = document.getElementById("show");

      // this.startButton.onclick = this.start;
      clearInterval(timer);
      show.innerHTML = "0";
    }

    const inputText = document.querySelector(".typing");

    inputText.addEventListener(
      "keydown",
      function (e) {
        start();
      },
      { once: true }
    );

    // 시간 계산
    // inputText.addEventListener("keydown", function (e) {
    //   if (e.keyCode === 46) {
    //     stop();
    //     const timer = document.getElementById("show").innerHTML;
    //     console.log("====", timer);
    //   }
    // });
    inputText.addEventListener("keydown", (e) => {
      // const { time } = this.state;
      // if (e.keyCode === 46) { // delete
      if (e.keyCode === 13) {
        stop();
        const resultTime = document.getElementById("show").innerHTML;
        this.setState({ time: resultTime });
        // console.log("time", this.state.time);
      }
    });

    stopButton.onclick = function () {
      // alert("클릭했어요");
      stop();
    };

    resetButton.onclick = function () {
      // alert("클릭했어요");
      reset();
    };
  }

  componentDidMount() {
    this.timer();
    this.keyboardEvent();
  }

  render() {
    const { accuracy, speed } = this.state;

    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_header">
            <div className="header_problem">{this.state.problem}</div>
            <div className="header_timer">
              {/* <p id="show">0</p> */}
              <span id="show">0</span>
              <span>초</span>
              <input
                type="button"
                value="start"
                className="timer_start"
              ></input>
              <input type="button" value="stop" className="timer_stop"></input>
              <input
                type="button"
                value="reset"
                className="timer_reset"
              ></input>
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
              <div id="ㄴ" className="btn_1">
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
          <div className="test_submit"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Test);
