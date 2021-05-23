import React, { useEffect, useState } from "react";
import Test from "../components/Test";
import { requestRandom } from "../modules/test";
import { useDispatch, useSelector } from "react-redux";

const TestContainer = () => {
  const dispatch = useDispatch();

  // 닉네임
  const nickname = useSelector((state) => state.user.data.nick);
  const isLogged = useSelector((state) => state.user.isLogged);

  // 문제
  const [problem, setProblem] = useState([""]);
  const [filterTitle, setFilterTitle] = useState();
  const [count, setCount] = useState(0);
  const title = ["광야", "님의 손길", "진달래꽃"];

  // 기록
  const [recordTime, setRecordTime] = useState();
  const [winnerRecord, setWinnerRecord] = useState();
  const [time, setTime] = useState();
  const [speed, setSpeed] = useState();
  const [accuracy, setAccuracy] = useState();

  // 최종 누적 기록
  const [records, setRecords] = useState({ speed: 0, time: 0, arr: "" });

  // 타미어
  const [timer, setTimer] = useState("");
  // const timer = "";

  //
  let problem_data;
  let count_data = 0;
  let time_data = 0;
  let accumulate_time = 0;
  let accumulate_speed = 0;
  let accumulate_array = [];

  // 키보드 이벤트 체크
  // const [keyEvent, setKeyEvent] = useState(false);
  // let keyEvent = false;

  useEffect(() => {
    requestProblem();
    keyboardEvent();
    testValid();
  }, []);

  // 정확도 계산
  const compare = () => {
    // const { problem, count, answer, time, recordArray } = this.state;
    const problemCheck = document.getElementsByName("problem")[0];
    const inputBox = document.getElementsByTagName("textarea")[0];
    const answer = inputBox.value;

    // 반짝이는 듯속에 나는 두 손 모아 빌었지(50유효타수, 4초)
    // 50타 * 60초 / 4초 => 750타
    // 백스페이스 7번
    // 일단 스페이스 빼자
    // 스페이스는 하나만 인정(배열에는 스페이스 하나당 세개씩 들어감)
    // 빈 칸 3칸이면 undefinded가 9개 들어감
    // 수 계산(타수*60/걸린시간(초))
    // 48글자 * 60초 / 10초
    // 2880 / 10 => 288타
    // 타수
    // 현재속도 = (타수(자음, 모음 분리) - 백스페이스 * 2) / 경과시간(초) * 60초
    // 한컴타자는 백스페이스 * 3
    // const tasu = getConstantVowel(problem[count]);
    const tasu = getConstantVowel(problem_data[count_data]);
    const inputAnswer = getConstantVowel(answer);
    // const tasuJS = JSON.stringify(tasu);
    // const inputAnswerJS = JSON.stringify(inputAnswer);
    // 타수
    // const resultSpeed = (tasu.length * 60) / time;
    const resultSpeed = (inputAnswer.length * 60) / time_data;

    // console.log("tasu", tasu);
    // console.log("input", inputAnswer);

    // 정확도
    if (JSON.stringify(tasu) === JSON.stringify(inputAnswer)) {
      // this.setState({
      //   accuracy: "100%",
      //   speed: `${Math.floor(resultSpeed)}타수`,
      //   keyEvent: false,
      //   recordTime: this.state.recordTime + time,
      //   recordresultSpeed: this.state.recordresultSpeed + resultSpeed,
      // });
      // this.setState({ count: count + 1 }, function () {});

      count_data++;
      accumulate_time += time_data;
      accumulate_speed += Math.floor(resultSpeed);
      accumulate_array.push(Math.floor(resultSpeed));

      setCount(count_data);
      setSpeed(`${Math.floor(resultSpeed)}타수`);
      setRecords({
        ...records,
        time: accumulate_time,
        speed: accumulate_speed,
        arr: accumulate_array,
      });
      setAccuracy(`100%`);

      // recordArray.push(Math.floor(resultSpeed));
      // this.setState({ recordArray: recordArray });
      if (count_data < 7) inputBox.value = "";
      // 색 초기화
      // if (this.state.count < 7) {
      if (count_data < 7) {
        // for (
        //   let i = 0;
        //   i < document.querySelector(".header_problem_count").children.length;
        //   i++
        // )
        for (let i = 0; i < problemCheck.children.length; i++) {
          document.getElementsByName("problem")[0].childNodes[i].style.color =
            "white";
          // document.querySelector(`.header_problem_count .t${i}`).style.color =
          //   "white";
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
      //   this.setState({
      //     accuracy: `${acc}%`,
      //     speed: `${Math.floor((inputAnswer.length * 60) / time)}타수`,
      //     keyEvent: false,
      //   });
      setAccuracy(`${acc}%`);
      setSpeed(`${Math.floor(resultSpeed)}타수`);

      inputBox.value = "";

      // 색상 초기화
      if (count_data < 7) {
        for (let i = 0; i < problemCheck.children.length; i++) {
          document.getElementsByName("problem")[0].childNodes[i].style.color =
            "white";
        }
      }
    }
  };

  // 글자 색상 변경(정확도)
  const testValid = () => {
    // const problemCheck = document.querySelector(".header_problem_count");
    // const problemValid = document.querySelector(".typing");
    const problemCheck = document.getElementsByName("problem")[0];
    const problemValid = document.getElementsByTagName("textarea")[0];

    problemValid.addEventListener("input", (e) => {
      // if (problemCheck.childNodes.length > 9) {
      if (problemCheck) {
        const input = e.target.value;
        const problem = problem_data[count_data];
        const newProblem = problem.split("");
        const inputArray = input.split("");

        // 입력된 값을 배열로 만들어서 비교
        for (let i = 0; i < inputArray.length; i++) {
          if (inputArray.length <= newProblem.length) {
            if (inputArray[i] === newProblem[i]) {
              document.getElementsByName("problem")[0].childNodes[
                i
              ].style.color = "#efdc05";
            } else {
              document.getElementsByName("problem")[0].childNodes[
                i
              ].style.color = "#e53a40";
            }
          }
        }
      }
    });
  };

  // 키보드 이벤트
  const keyboardEvent = () => {
    const inputBox = document.getElementsByTagName("textarea")[0];
    let keyEvent = false;

    // event = false 처음에 이벤트 발생시키면 true로 바꾸고 문제가 넘어가거나
    // 틀렸을 경우 다시 false로 바꾸고 다시 실행 시킬 준비

    // 한글 입력은 안받음
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

            keyEvent = false;
            setTime(Number(`${resultTime[0]}.${resultTime[1]}`));
            time_data = Number(`${resultTime[0]}.${resultTime[1]}`);
            compare();

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

    // let eventCheck = false;

    // 키보드 버튼 색상 on
    inputBox.addEventListener("keydown", (e) => {
      const key = document.getElementById(e.key);

      // console.log("eventCheck", eventCheck);
      // console.log("=keyEvent=", keyEvent);

      if (key) {
        // 229 키코드 : 한글 입력
        if (e.keyCode === 229) {
          if (!keyEvent) {
            // if (!eventCheck) {
            timerStart();
            keyEvent = true;
            // setKeyEvent(true);
            // eventCheck = true;

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
  const requestProblem = () => {
    // e.preventDefault();
    const inputBox = document.getElementsByTagName("textarea")[0];
    const problemCheck = document.getElementsByName("problem")[0];

    // 입력 값 리셋
    inputBox.value = "";

    // 색상 초기화
    for (let i = 0; i < problemCheck.children.length; i++) {
      document.getElementsByName("problem")[0].childNodes[i].style.color =
        "white";
    }

    // this.setState({ keyEvent: false, count: 0, recordTime: 0 });
    // setKeyEvent(true);
    // eventCheck = false;
    // console.log("요청", keyEvent);

    setCount(0);
    // setRecordTime(0);
    stop();
    init();

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
            problem_data = result;
          } else {
            setProblem(result);
            setFilterTitle(filter);
            problem_data = result;
          }
        })
        .catch((err) => {
          if (err) alert("서버에 문제가 있습니다");
        });
    }
  };

  // 새로고침
  const requestRefresh = () => {
    window.location.reload();
  };

  let temp;
  // 타이머 시작
  const timerStart = () => {
    const show = document.getElementsByName("timer")[0];

    let sec = 0;
    // let timer;
    let time = 0;
    let ms = 0;

    // timer = setInterval(function () {
    temp = setInterval(function () {
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
    // setTimer(timer);
  };

  // 타이머 정지
  const stop = () => {
    clearInterval(temp);
  };

  // 타이머 초기화
  const init = () => {
    document.getElementsByName("timer")[0].innerHTML = "00:00";
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
  };

  // console.log("누적기록 체크", records);

  return (
    <Test
      nickname={nickname}
      checkLogin={isLogged}
      requestProblem={requestProblem}
      requestRefresh={requestRefresh}
      problem={problem}
      filterTitle={filterTitle}
      count={count}
      speed={speed}
      accuracy={accuracy}
      records={records}
    />
  );
};

export default TestContainer;
