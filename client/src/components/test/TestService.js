import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { requestRandom } from "modules/test";
import { registerRanking, printRanking } from "modules/ranking";
import { useTimer } from "utils/Timer";
import { tasuCalculator } from "utils/Compare";

import { ProblemInfo } from "constant";

export const useTestService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const isLogged = useSelector((state) => state.user.isLogged);
  const textareaInput = useRef();
  const problemList = useRef([]);
  const problemCount = useRef(0);
  const { ms, sec, min, time, timerStart, timerStop } = useTimer();

  const [toggle, setToggle] = useState(false);
  const titleArr = [ProblemInfo.NO1, ProblemInfo.NO2, ProblemInfo.NO3];
  const [timeSwitch, setTimeSwitch] = useState(0);
  const [proceeding, setProceeding] = useState({
    accuracy: "",
    problem: "",
    count: 0,
    speed: "",
    time: 0,
    title: ProblemInfo.NO1,
    recordArr: [],
    recordTime: [],
  });

  console.log("timer", time.current, "problem", proceeding);

  useEffect(() => {
    keyboardEvent();
  }, []);

  const selectHandler = () => {
    setToggle(!toggle);
    timerStop();
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

  const keyboardEvent = () => {
    textareaInput.current.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode !== 13) {
          key.classList.add("pressed");
        }
        if (e.keyCode === 13 && problemCount.current === 0) {
          // requestProblem();
          e.preventDefault();
        }
        if (e.keyCode === 13 && time.current > 0) {
          compare();
          e.preventDefault();
        }
      }
    });

    textareaInput.current.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
      if (e.keyCode === 46) timerStart();
    });
  };

  const compare = () => {
    timerStop();
    const answer = textareaInput.current.value;

    const tasu = tasuCalculator(problemList.current[problemCount.current]);
    const inputAnswer = tasuCalculator(answer);
    const resultSpeed = Math.floor((inputAnswer.length * 60) / time.current);

    console.log("정답", JSON.stringify(tasu));
    console.log("입력", JSON.stringify(inputAnswer));

    // 정확도
    if (JSON.stringify(tasu) === JSON.stringify(inputAnswer)) {
      problemCount.current += 1;

      setProceeding({
        // title: title_data.current,
        // problem: problem_data.current,
        ...proceeding,
        recordArr: proceeding.recordArr.push(resultSpeed),
        recordTime: proceeding.recordTime.push(time.current),
        time: proceeding.time + time.current,
        count: problemCount.current,
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
        time: time.current,
        speed: `${resultSpeed}타수`,
        accuracy: `${acc}%`,
      });

      textareaInput.current.value = "";

      // 색상 초기화
      // initColor();
    }
  };

  return {
    proceeding,
    toggle,
    timeSwitch,
    isLogged,
    textareaInput,
    requestProblem,
    selectHandler,
  };
};
