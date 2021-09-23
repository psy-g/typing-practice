import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { requestRandom } from "modules/test";
import { registerRanking, printRanking } from "modules/ranking";

import { tasuCalculator } from "utils/Compare";
import { useStopwatch } from "utils/Stopwatch";

import { ProblemInfo } from "constant";

export const useTestService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const isLogged = useSelector((state) => state.user.isLogged);
  const textareaInput = useRef();
  const keyEvent = useRef(false);
  const enterKey = useRef(false);
  const problemList = useRef([]);
  const problemCount = useRef(0);

  const { elapsedTime, startTimer, stopTimer, resetTimer } = useStopwatch();

  const [toggle, setToggle] = useState(false);
  const titleArr = [ProblemInfo.NO1, ProblemInfo.NO2, ProblemInfo.NO3];
  const [check, setCheck] = useState(false);
  const [proceeding, setProceeding] = useState({
    accuracy: "",
    problem: "",
    count: 0,
    speed: "",
    time: 0,
    title: "문제 선택",
    recordArr: [],
    recordTime: [],
  });

  useEffect(() => {
    // keyboardEvent();
  }, []);

  const selectHandler = () => {
    setToggle(!toggle);
  };

  const requestProblem = (value) => {
    const random = !value
      ? titleArr[Math.floor(Math.random() * titleArr.length)]
      : value;

    // if (textareaInput.current) textareaInput.current.value = "";

    if (random) {
      dispatch(requestRandom({ title: random }))
        .then((res) => {
          let data = [];
          let title = "";

          res.payload.data.data.forEach((el) => {
            data.push(el.problem);
            problemList.current.push(el.problem);
            title = el.title;
          });

          setProceeding({
            ...proceeding,
            problem: data,
            title: title,
            count: 0,
          });
        })
        .catch((err) => {
          if (err) alert("server error");
        });
    }
  };

  const keydownEvent = () => {
    textareaInput.current.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode !== 13 && keyEvent.current) {
          key.classList.add("pressed");
        }
        if (e.keyCode !== 13 && !keyEvent.current) {
          e.preventDefault();
          // setCheck(true);
          keyEvent.current = false;
          startTimer();
        }
        if (e.keyCode === 13) {
          e.preventDefault();
          stopTimer();
          compare();
        }
      }
    });
  };

  const keyupEvent = () => {
    textareaInput.current.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
    });
  };

  const keyboardEvent = () => {
    textareaInput.current.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode !== 13 && keyEvent.current) {
          key.classList.add("pressed");
        }
        if (e.keyCode !== 13 && !keyEvent.current) {
          e.preventDefault();
          // setCheck(true);
          keyEvent.current = false;
          startTimer();
        }
        if (e.keyCode === 13) {
          e.preventDefault();
          stopTimer();
          compare();
        }
      }
    });

    textareaInput.current.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
    });

    // 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비

    // 한글 입력은 안받음
    // textareaInput.current.addEventListener("keypress", (e) => {
    //   const key = document.getElementById(e.key);

    //   if (key) {
    //     if (e.keyCode === 13 && !enterKey.current) {
    //       // 타이머 멈추고 시간 저장
    //       keyEvent.current = false;
    //       stopTimer();
    //       compare();

    //       // 자음 + 시프트 버튼 누를 시 색상 강제로 초기화
    //       // if (document.querySelector(".pressed")) {
    //       //   document.querySelector(".pressed").classList.remove("pressed");
    //       // }

    //       // if (problemCount.current === 7) rankPrint();

    //       if (e.preventDefault) e.preventDefault();
    //       return false;
    //     }
    //   }
    // });

    // // 키보드 버튼 색상 on
    // textareaInput.current.addEventListener("keydown", (e) => {
    //   const key = document.getElementById(e.key);

    //   if (key) {
    //     // 229 키코드 : 한글 입력
    //     if (e.keyCode === 229) {
    //       if (!keyEvent.current) {
    //         startTimer();
    //         keyEvent.current = true;
    //       }
    //       key.classList.add("pressed");
    //     }
    //   } else {
    //     if (!keyEvent.current) {
    //       startTimer();
    //       keyEvent.current = true;
    //     }
    //   }
    // });

    // // 키보드 버튼 색상 off
    // textareaInput.current.addEventListener("keyup", (e) => {
    //   const key = document.getElementById(e.key);

    //   if (key) key.classList.remove("pressed");
    // });
  };

  const compare = () => {
    const answer = textareaInput.current.value;
    // const tasu = tasuCalculator(problemList.current[problemCount.current]);
    // const inputAnswer = tasuCalculator(answer);
    // const resultSpeed = Math.floor((inputAnswer.length * 60) / elapsedTime);

    console.log("answer", answer);
    console.log("elapsedTime", elapsedTime);

    // // 정확도
    // if (JSON.stringify(tasu) === JSON.stringify(inputAnswer)) {
    //   console.log("정답입니다");
    //   console.log("타수", resultSpeed);

    //   problemCount.current += 1;
    //   setProceeding({
    //     // title: title_data.current,
    //     // problem: problem_data.current,
    //     ...proceeding,
    //     recordArr: proceeding.recordArr.push(resultSpeed),
    //     recordTime: proceeding.recordTime.push(elapsedTime),
    //     time: proceeding.time + elapsedTime,
    //     count: proceeding.count++,
    //     speed: `${resultSpeed}타수`,
    //     accuracy: "100%",
    //   });
    //   // // 색상 초기화
    //   // if (count_data.current < 7) {
    //   //   textareaInput.current.value = "";
    //   //   initColor();
    //   // }
    // } else {
    //   console.log("오답입니다");
    //   let right = 0;
    //   for (let i = 0; i < inputAnswer.length; i++) {
    //     if (JSON.stringify(tasu[i]) === JSON.stringify(inputAnswer[i])) {
    //       right++;
    //     }
    //   }
    //   const acc = ((right / tasu.length) * 100).toFixed(1);
    //   setProceeding({
    //     ...proceeding,
    //     time: elapsedTime,
    //     speed: `${resultSpeed}타수`,
    //     accuracy: `${acc}%`,
    //   });
    //   // textareaInput.current.value = "";
    //   // 색상 초기화
    //   // initColor();
    // }
  };

  return {
    proceeding,
    toggle,
    elapsedTime,
    isLogged,
    textareaInput,
    keyupEvent,
    keydownEvent,
    requestProblem,
    selectHandler,
  };
};
