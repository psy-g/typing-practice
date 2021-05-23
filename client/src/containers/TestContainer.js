import React, { useEffect, useState } from "react";
import Test from "../components/Test";
import { requestRandom } from "../modules/test";
import { useDispatch } from "react-redux";

const TestContainer = () => {
  const dispatch = useDispatch();
  // 문제
  const [problem, setProblem] = useState([""]);
  const [filterTitle, setFilterTitle] = useState();
  const [count, setCount] = useState(0);
  const title = ["광야", "님의 손길", "진달래꽃"];

  // 기록
  const [recordTime, setRecordTime] = useState();
  const [winnerRecord, setWinnerRecord] = useState();
  const [time, setTime] = useState();

  // 타미어
  const [timer, setTimer] = useState("");

  // 키보드 이벤트 체크
  // const [keyEvent, setKeyEvent] = useState(false);

  useEffect(() => {
    requestProblem();
    keyboardEvent();
  }, []);

  // 키보드 이벤트
  const keyboardEvent = () => {
    const inputBox = document.getElementsByTagName("textarea")[0];
    // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비

    // const keyEvent = document.querySelector(".typing");

    inputBox.addEventListener("keypress", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode === 13) {
          if (document.getElementsByName("problem")[0].innerHTML.length === 0) {
            requestProblem();
            if (e.preventDefault) e.preventDefault();
            return false;
          } else {
            // 타이머 멈추고 시간 저장
            stop();
            const resultTime = document
              .getElementsByName("timer")[0]
              .innerHTML.split(":");

            setTime(Number(`${resultTime[0]}.${resultTime[1]}`));

            console.log("time", time);

            // this.setState({
            //   time: Number(`${resultTime[0]}.${resultTime[1]}`),
            // });
            // this.compare();

            // if (this.state.count === 7) {
            //   this.rankPrint();
            //   // 2초 후에 렌더링 시킬 메소드 추가
            // }

            if (e.preventDefault) e.preventDefault();
            return false;
          }
        }
      }
    });

    let eventCheck = false;

    // 키보드 버튼 색상 on
    inputBox.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      console.log("eventCheck", eventCheck);

      if (key) {
        // 229 키코드 : 한글 입력
        if (e.keyCode === 229) {
          // if (!keyEvent) {
          if (!eventCheck) {
            timerStart();
            // setKeyEvent(true);
            eventCheck = true;
            // 색상 초기화
            // for (
            //   let i = 0;
            //   i <
            //   document.querySelector(".header_problem_count").children.length;
            //   i++
            // ) {
            //   document.querySelector(
            //     `.header_problem_count .t${i}`
            //   ).style.color = "white";
            // }
          }
          key.classList.add("pressed");
        }
      }
      // else {
      //   if (!eventCheck) {
      //     timerStart();
      //     eventCheck = true;
      //     // 색상 초기화
      //     // for (
      //     //   let i = 0;
      //     //   i < document.querySelector(".header_problem_count").children.length;
      //     //   i++
      //     // ) {
      //     //   document.querySelector(`.header_problem_count .t${i}`).style.color =
      //     //     "white";
      //     // }
      //   }
      // }
    });

    // 키보드 버튼 색상 off
    inputBox.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
    });
  };

  // 문제 요청(시간 초기화, 카운트 초기화)
  const requestProblem = (e) => {
    // e.preventDefault();
    const inputBox = document.getElementsByTagName("textarea")[0];

    // 입력 값 리셋
    inputBox.value = "";

    // 색상 초기화
    // const divChange = document.querySelector(".header_problem_count").children
    //   .length;

    // for (let i = 0; i < divChange; i++) {
    //   document.querySelector(`.header_problem_count .t${i}`).style.color =
    //     "white";
    // }

    // this.setState({ keyEvent: false, count: 0, recordTime: 0 });
    // setKeyEvent(true);
    // eventCheck = false;
    setCount(0);
    setRecordTime(0);
    // stop();
    // init();

    const random = title[Math.floor(Math.random() * title.length)];

    if (random) {
      dispatch(requestRandom({ title: random }))
        .then((res) => {
          let result = [];
          let filter = "";

          res.payload.data.data.forEach((el) => {
            result.push(el.problem);
            filter = el.title;
          });

          // 다른 사람 기록 체크
          if (res.payload.data.winner) {
            setProblem(result);
            setFilterTitle(filter);
            setWinnerRecord(res.payload.data.winner.time);
          } else {
            setProblem(result);
            setFilterTitle(filter);
          }
        })
        .catch((err) => {
          if (err) alert("서버에 문제가 있습니다");
        });
    }

    stop();
    init();
  };

  // 문제 생성(엘리먼트)
  // const createDiv = () => {
  //   const tt = String(problem[count]);
  //   const ttt = tt.split("");
  //   const tttt = ttt.map((el, index) => (
  //     <span className={"t" + index}>{el}</span>
  //   ));
  // };

  // 타이머 시작
  const timerStart = () => {
    const show = document.getElementsByName("timer")[0];

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

    // this.setState({ timer: timer });
    setTimer(timer);

    console.log("timer", timer);
  };

  // 타이머 정지
  const stop = () => {
    console.log("stop 실행", timer);

    clearInterval(timer);
  };

  // 타이머 초기화
  const init = () => {
    document.getElementsByName("timer")[0].innerHTML = "00:00";
  };

  console.log("==", time);

  return (
    <Test
      requestProblem={requestProblem}
      problem={problem}
      filterTitle={filterTitle}
      count={count}
    />
  );
};

export default TestContainer;
