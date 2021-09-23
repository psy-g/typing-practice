import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { requestRandom } from "modules/test";
import { registerRanking, printRanking } from "modules/ranking";
import { tasuCalculator } from "utils/Compare";
import { useStopwatch } from "utils/Stopwatch";
import { ProblemInfo } from "constant";

export const useTestService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const id = window.localStorage.getItem("id");
  const isLogged = useSelector((state) => state.user.isLogged);
  const textareaInput = useRef();
  const keyEvent = useRef(false);
  const problemList = useRef([]);

  const { elapsedTime, startTimer, stopTimer, resetTimer } = useStopwatch();

  const [toggle, setToggle] = useState(false);
  const titleArr = [ProblemInfo.NO1, ProblemInfo.NO2, ProblemInfo.NO3];
  const [rankerArr, setRankerArr] = useState([]);
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

  const selectHandler = () => {
    setToggle(!toggle);
  };

  const requestProblem = (value) => {
    const random = !value
      ? titleArr[Math.floor(Math.random() * titleArr.length)]
      : value;

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

  const keydownEvent = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      stopTimer();
      compare();

      if (proceeding.count === 6) requestRanking();
    }

    if (e.keyCode === 229 && !keyEvent.current) {
      resetTimer();
      startTimer();
      keyEvent.current = true;
    }
  };

  const keyupEvent = (e) => {
    // textareaInput.current.addEventListener("keyup", (e) => {
    //   const key = document.getElementById(e.key);
    //   if (key) key.classList.remove("pressed");
    // });
  };

  const compare = () => {
    const answer = textareaInput.current.value;
    const tasu = tasuCalculator(proceeding.problem[proceeding.count]);
    const inputAnswer = tasuCalculator(answer);
    const resultSpeed = Math.floor((inputAnswer.length * 60) / elapsedTime);

    // 정확도
    if (JSON.stringify(tasu) === JSON.stringify(inputAnswer)) {
      setProceeding({
        ...proceeding,
        recordArr: [...proceeding.recordArr, resultSpeed],
        recordTime: [...proceeding.recordTime, elapsedTime],
        time: proceeding.time + elapsedTime,
        count: proceeding.count + 1,
        speed: `${resultSpeed}타수`,
        accuracy: "100%",
      });
      // // 색상 초기화
      // if (count_data.current < 7) {
      //   textareaInput.current.value = "";
      //   initColor();
      // }
    } else {
      let right = 0;
      for (let i = 0; i < inputAnswer.length; i++) {
        if (JSON.stringify(tasu[i]) === JSON.stringify(inputAnswer[i])) {
          right++;
        }
      }
      const acc = ((right / tasu.length) * 100).toFixed(1);
      setProceeding({
        ...proceeding,
        time: elapsedTime,
        speed: `${resultSpeed}타수`,
        accuracy: `${acc}%`,
      });

      // 색상 초기화
      // initColor();
    }

    textareaInput.current.value = "";
    keyEvent.current = false;
  };

  const requestRanking = () => {
    console.log("랭킹요청");
    const tempArr = [];

    // 회원
    if (isLogged) {
      let body = {
        id: id,
        recordArray: proceeding.recordArr,
        recordTime: proceeding.recordTime.reduce((acc, cur) => acc + cur),
        recordresultSpeed: proceeding.recordArr.reduce((acc, cur) => acc + cur),
        filterTitle: proceeding.title,
        count: 7,
      };
      dispatch(registerRanking(body))
        .then((res) => {
          res.payload.data.data.forEach((el) => {
            tempArr.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          setRankerArr(tempArr);
        })
        .catch((err) => {
          if (err) alert("server error");
        });
    }
    // 비회원
    else {
      dispatch(printRanking({ title: proceeding.title, name: nickname }))
        .then((res) => {
          res.payload.data.data.forEach((el) => {
            tempArr.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          setRankerArr(tempArr);
        })
        .catch((err) => {
          if (err) alert("server error");
        });
    }
  };

  return {
    proceeding,
    toggle,
    elapsedTime,
    isLogged,
    rankerArr,
    textareaInput,
    keyupEvent,
    keydownEvent,
    requestProblem,
    selectHandler,
  };
};
