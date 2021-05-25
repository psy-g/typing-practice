import React, { useEffect, useState, useRef } from "react";
import Test from "../components/Test";
import { requestRandom } from "../modules/test";
import { registerRanking, printRanking } from "../modules/ranking";
import { useDispatch, useSelector } from "react-redux";

const TestContainer = () => {
  const dispatch = useDispatch();

  // 유저 정보, 로그인, 제목
  // const id = useSelector((state) => state.user.data.id);
  // const nickname = useSelector((state) => state.user.data.nick);
  const nickname = window.localStorage.getItem("nick");
  // const isLogged = useSelector((state) => state.user.isLogged); // ??
  const isLogged = window.localStorage.getItem("isLogged");
  const id = window.localStorage.getItem("id");

  // 문제
  const [problem, setProblem] = useState([""]);
  const [filterTitle, setFilterTitle] = useState("");
  const title = ["광야", "님의 손길", "진달래꽃"];

  const textareaInput = useRef();
  const problemPrint = useRef();
  const timerPrint = useRef();
  const rankTarget = useRef();
  const selectBtn = useRef();

  // 기록
  // const [winnerRecord, setWinnerRecord] = useState();
  // const [time, setTime] = useState();
  // const [print, setPrint] = useState();

  const keyEvent = useRef(false);
  const problem_data = useRef("");
  const title_data = useRef("");
  const count_data = useRef(0);
  const time_data = useRef(0);
  const timer_data = useRef(0);
  const accumulate_time = useRef(0);
  const accumulate_speed = useRef(0);
  const accumulate_array = useRef([]);
  const enterKey = useRef(false);
  const rankerPrint = useRef([]);

  // 개선
  const [element, setElement] = useState({
    problem: "",
    title: "",
    speed: "",
    accuracy: "",
    time: 0,
    count: 0,
    recordArr: [],
    recordTime: "",
  });

  useEffect(() => {
    requestProblem();
    keyboardEvent();
    testValid();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 정확도 계산
  const compare = () => {
    const answer = textareaInput.current.value;

    // 반짝이는 듯속에 나는 두 손 모아 빌었지(50유효타수, 4초)
    // 50타 * 60초 / 4초 => 750타
    // 백스페이스 7번
    // 스페이스는 하나만 인정(배열에는 스페이스 하나당 세개씩 들어감)
    // 빈 칸 3칸이면 undefinded가 9개 들어감
    // 타수 계산(타수 * 60 / 걸린시간(초))
    // 48글자 * 60초 / 10초 ::::: 2880 / 10 => 288타
    // 현재속도 = (타수(자음, 모음 분리) - 백스페이스 * 2) / 경과시간(초) * 60초
    // 한컴타자는 백스페이스 * 3
    const tasu = getConstantVowel(problem_data.current[count_data.current]);
    const inputAnswer = getConstantVowel(answer);

    // 타수
    const resultSpeed = (inputAnswer.length * 60) / time_data.current;

    // 정확도
    if (JSON.stringify(tasu) === JSON.stringify(inputAnswer)) {
      count_data.current += 1;
      accumulate_time.current += time_data.current;
      accumulate_array.current.push(Math.floor(resultSpeed));
      accumulate_speed.current += Math.floor(resultSpeed);

      setElement({
        title: title_data.current,
        problem: problem_data.current,
        speed: `${Math.floor(resultSpeed)}타수`,
        time: accumulate_time.current,
        recordArr: accumulate_array.current,
        accumulateTime: accumulate_time.current,
        accumulateSpeed: accumulate_speed.current,
        count: count_data.current,
        accuracy: "100%",
      });

      // 색상 초기화
      if (count_data.current < 7) {
        textareaInput.current.value = "";
        initColor();
      }
    } else {
      let right = 0;
      for (let i = 0; i < inputAnswer.length; i++) {
        if (JSON.stringify(tasu[i]) === JSON.stringify(inputAnswer[i])) {
          right++;
        }
      }
      const acc = ((right / tasu.length) * 100).toFixed(1);

      setElement({
        title: title_data.current,
        problem: problem_data.current,
        speed: `${Math.floor(resultSpeed)}타수`,
        accuracy: `${acc}%`,
        time: accumulate_time.current,
        recordArr: accumulate_array.current,
        accumulateTime: accumulate_time.current,
        accumulateSpeed: accumulate_speed.current,
        count: count_data.current,
      });

      textareaInput.current.value = "";

      // 색상 초기화
      initColor();
    }
  };

  // 글자 색상 변경(정확도)
  const testValid = () => {
    if (textareaInput.current) {
      textareaInput.current.addEventListener("input", (e) => {
        if (problemPrint.current.childNodes.length > 9) {
          const input = e.target.value;
          const problem = problem_data.current[count_data.current];
          const newProblem = problem.split("");
          const inputArray = input.split("");

          // 입력된 값을 배열로 만들어서 비교
          for (let i = 0; i < inputArray.length; i++) {
            if (inputArray.length <= newProblem.length) {
              if (inputArray[i] === newProblem[i]) {
                problemPrint.current.childNodes[i].style.color = "#efdc05";
              } else {
                problemPrint.current.childNodes[i].style.color = "#e53a40";
              }
            }
          }
        }
      });
    }
  };

  // 키보드 이벤트
  const keyboardEvent = () => {
    // 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비

    // 한글 입력은 안받음
    textareaInput.current.addEventListener("keypress", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        if (e.keyCode === 13 && !enterKey.current) {
          // 아무것도 입력하지 않은 상태에서 엔터 누른 경우
          // if (problemPrint.current.innerHTML.length === 0) {
          if (
            problemPrint.current.innerHTML === "" ||
            problemPrint.current.childNodes.length === 9
          ) {
            requestProblem();
            if (e.preventDefault) e.preventDefault();
            return false;
          } else {
            // 타이머 멈추고 시간 저장
            timerStop();
            const resultTime = timerPrint.current.innerHTML.split(":");

            // setTime(Number(`${resultTime[0]}.${resultTime[1]}`));
            time_data.current = Number(`${resultTime[0]}.${resultTime[1]}`);
            keyEvent.current = false;

            compare();

            // 자음 + 시프트 버튼 누를 시 색상 강제로 초기화
            if (document.querySelector(".pressed")) {
              document.querySelector(".pressed").classList.remove("pressed");
            }

            if (count_data.current === 7) {
              // ranking();
              rankPrint();
            }

            if (e.preventDefault) e.preventDefault();
            return false;
          }
        }
      }
    });

    // 키보드 버튼 색상 on
    textareaInput.current.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      if (key) {
        // 229 키코드 : 한글 입력
        if (e.keyCode === 229) {
          if (!keyEvent.current) {
            // if (!eventCheck) {
            timerStart();
            keyEvent.current = true;
          }
          key.classList.add("pressed");
        }
      }
    });

    // 키보드 버튼 색상 off
    textareaInput.current.addEventListener("keyup", (e) => {
      const key = document.getElementById(e.key);

      if (key) key.classList.remove("pressed");
    });
  };

  // 문제 요청(시간 초기화, 카운트 초기화)
  const requestProblem = () => {
    // 입력 값 리셋
    if (textareaInput.current) {
      textareaInput.current.value = "";

      // 색상 초기화
      if (problemPrint.current) {
        for (let i = 0; i < problemPrint.current.children.length; i++) {
          problemPrint.current.childNodes[i].style.color = "white";
        }
      }
    }

    // 기존 변수 리셋
    keyEvent.current = false;
    problem_data.current = "";
    title_data.current = "";
    count_data.current = 0;
    time_data.current = 0;
    // timer_data.current = 0;
    accumulate_time.current = 0;
    accumulate_speed.current = 0;
    accumulate_array.current = [];

    timerStop();
    timerInit();

    // console.log("===", value);

    let random = title[Math.floor(Math.random() * title.length)];

    // 문제 선택
    // if (value) random = value;

    if (random) {
      dispatch(requestRandom({ title: random }))
        .then((res) => {
          let result = [];
          let filter = "";

          res.payload.data.data.forEach((el) => {
            result.push(el.problem);
            filter = el.title;
          });

          problem_data.current = result;
          title_data.current = filter;

          // 다른 사람 기록 체크
          if (res.payload.data.winner) {
            setProblem(result);
            setFilterTitle(filter);
            // setWinnerRecord(res.payload.data.winner.time);

            setElement({
              ...element,
              problem: problem_data.current,
              title: title_data.current,
              count: 0,
            });
          } else {
            setProblem(result);
            setFilterTitle(filter);

            setElement({
              ...element,
              problem: problem_data.current,
              title: title_data.current,
              count: 0,
            });
          }
        })
        .catch((err) => {
          if (err) alert("서버에 문제가 있습니다");
        });
    }
  };

  // 문제 선택 요청
  const selectProblem = (value) => () => {
    requestProblem(value);
  };

  // 제목 선택 버튼
  const selectButton = () => {
    selectBtn.current.classList.toggle("show");
    if (document.querySelector(".show")) {
      selectBtn.current.style.display = "flex";
    } else {
      selectBtn.current.style.display = "none";
    }
  };

  // 색상 초기화
  const initColor = () => {
    for (let i = 0; i < problemPrint.current.children.length; i++) {
      problemPrint.current.childNodes[i].style.color = "white";
    }
  };

  // 순위 등록 요청
  const ranking = () => {
    // 회원
    if (isLogged) {
      let body = {
        id: id,
        recordTime: accumulate_time.current,
        recordresultSpeed: accumulate_speed.current,
        count: 7,
        filterTitle: title_data.current,
        recordArray: accumulate_array.current,
      };

      dispatch(registerRanking(body))
        .then((res) => {
          // console.log("res.payload.data", res.payload.data);

          res.payload.data.data.forEach((el) => {
            rankerPrint.current.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });

          // console.log(res.payload.data);
          // printRank.current = res.payload.data;
          // setPrint(res.payload.data);

          // this.setState({ printRank: printRank });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // 비회원
    else {
      dispatch(printRanking({ title: title_data.current, name: nickname }))
        .then((res) => {
          res.payload.data.data.forEach((el) => {
            rankerPrint.current.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // // 순위 출력
  const rankPrint = () => {
    if (document.querySelector(".pressed")) {
      document.querySelector(".pressed").classList.remove("pressed");
    }

    // ranking();

    setTimeout(() => {
      const target = rankTarget.current;
      const newDiv = document.createElement("div");

      let PrintRankLenth = rankerPrint.current.length;
      if (PrintRankLenth > 3) PrintRankLenth = 3;

      for (let i = 0; i < PrintRankLenth; i++) {
        newDiv.innerHTML += `
            <div>
              <span>${rankerPrint.current[i].time}초</span>
              <span>${rankerPrint.current[i].average}타수</span>
              <span>${rankerPrint.current[i].name}</span>
              <span>#${i + 1}</span>
            </div>
            `;
      }

      target.prepend(newDiv);
    }, 2000); // 시간. 2초 후 실행
  };

  // 새로고침
  const requestRefresh = () => {
    window.location.reload();
  };

  // 타이머 시작
  const timerStart = () => {
    let sec = 0;
    // let timer;
    let time = 0;
    let ms = 0;

    timer_data.current = setInterval(function () {
      // time 0.01초씩 증가
      time++;

      let ts = sec;
      let tm = ms;

      ms = time % 100;

      if (time % 100 === 0) sec++;
      if (sec < 10) ts = "0" + sec;
      if (ms < 10 || ms === 100) tm = "0" + ms;

      // show.innerHTML = ts + ":" + tm;
      timerPrint.current.innerHTML = ts + ":" + tm;
    }, 10);

    // this.setState({ timer: timer });
    // setTimer(temp);
  };

  // 타이머 정지
  const timerStop = () => {
    clearInterval(timer_data.current);
  };

  // 타이머 초기화
  const timerInit = () => {
    timerPrint.current.innerHTML = "00:00";
  };

  const getConstantVowel = (kor) => {
    const f = [
      "ㄱ", // -31439
      "ㄲ", // -31438
      "ㄴ", // -31436
      "ㄷ", // -31433
      "ㄸ", // -31432
      "ㄹ", // -31431
      "ㅁ", // -31423
      "ㅂ", // -31422
      "ㅃ", // -31421
      "ㅅ", // -31419
      "ㅆ", // -31418
      "ㅇ", // -31417
      "ㅈ", // -31416
      "ㅉ", // -31415
      "ㅊ", // -31414
      "ㅋ", // -31413
      "ㅌ", // -31412
      "균", // -31411
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
  };

  // console.log(
  //   "체크",
  //   "id:",
  //   id,
  //   "title:",
  //   filterTitle,
  //   "accumulate_array:",
  //   records.arr
  // );

  return (
    <Test
      element={element}
      nickname={nickname}
      checkLogin={isLogged}
      requestProblem={requestProblem}
      requestRefresh={requestRefresh}
      problem={problem}
      filterTitle={filterTitle}
      selectBtn={selectBtn}
      selectButton={selectButton}
      selectProblem={selectProblem}
      textareaInput={textareaInput}
      problemPrint={problemPrint}
      timerPrint={timerPrint}
      rankTarget={rankTarget}
    />
  );
};

export default TestContainer;
