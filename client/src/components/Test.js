// import "./Test.css";
import { Link } from "react-router-dom";

import React from "react";

import styled from "styled-components";
import backgroundImg from "../image/rankback.png";
import powerBtn1 from "../image/power.png";
import powerBtn2 from "../image/power_on.png";

const Test = ({
  element,
  nickname,
  checkLogin,
  requestProblem,
  requestRefresh,
  filterTitle,
  selectBtn,
  selectButton,
  selectProblem,
  textareaInput,
  problemPrint,
  timerPrint,
  rankTarget,
}) => {
  const tt = String(element.problem[element.count]);
  const ttt = tt.split("");
  const tttt = ttt.map((el, index) => (
    <SplitProblem key={index}>{el}</SplitProblem>
  ));

  return (
    <Container>
      <Wrapper>
        <Top>
          <ScoreBoard>
            <Speed>
              <div>타수</div>
              <div>{element.speed}</div>
            </Speed>
            <TitleWrapper>
              {element.count < 7 ? (
                <Title onClick={selectButton}>
                  {element.title}
                  <ToggleMenu ref={selectBtn}>
                    <span onClick={selectProblem("님의 손길")}>님의 손길</span>
                    <span onClick={selectProblem("광야")}>광야</span>
                    <span onClick={selectProblem("진달래꽃")}>진달래꽃</span>
                  </ToggleMenu>
                </Title>
              ) : (
                <Title>{element.title}</Title>
              )}
              {(element.count < 7 && filterTitle === "님의 손길") ||
              (element.count < 7 && filterTitle === "광야") ||
              (element.count < 7 && filterTitle === "진달래꽃") ? (
                <Counter>{element.count + 1} / 7</Counter>
              ) : (
                <Counter></Counter>
              )}
            </TitleWrapper>
            <AccuracyWrapper>
              <div>정확도</div>
              <div>{element.accuracy}</div>
            </AccuracyWrapper>
          </ScoreBoard>
          <PrintWrapper>
            {element.count < 7 ? (
              <ProblemBox>
                <ProblemKeyboard>
                  {tttt.length !== 9 ? (
                    <PrintProblem ref={problemPrint}>{tttt}</PrintProblem>
                  ) : (
                    <PrintProblem ref={problemPrint}></PrintProblem>
                  )}
                  <textarea
                    type="text"
                    spellCheck="false"
                    maxLength={tt.length}
                    autoFocus
                    ref={textareaInput}
                  ></textarea>
                </ProblemKeyboard>
              </ProblemBox>
            ) : (
              <PrintResult>
                {nickname ? (
                  <UserInfo>{nickname}님의 기록</UserInfo>
                ) : (
                  <UserInfo>Guest님의 기록</UserInfo>
                )}
                <RecordPrintBox>
                  <SpeedRecord>
                    <textarea
                      type="text"
                      readOnly
                      ref={textareaInput}
                    ></textarea>
                    <div>평균</div>
                    <div>
                      {Math.round(element.accumulateSpeed / element.count)}타수
                    </div>
                  </SpeedRecord>
                  <TimeRecord>
                    <div>시간</div>
                    <div>{element.time.toFixed(1)}초 걸렸습니다</div>
                  </TimeRecord>
                </RecordPrintBox>
              </PrintResult>
            )}
          </PrintWrapper>
          {element.count < 7 ? (
            <PrintRankBox>
              <Timer ref={timerPrint}>00:00</Timer>
            </PrintRankBox>
          ) : (
            <PrintRankBox>
              <PrintRank>
                <div>
                  순위 <Link to="/ranking">🏆</Link>
                </div>
                <div ref={rankTarget}></div>
                <Timer ref={timerPrint}>00:00</Timer>
              </PrintRank>
            </PrintRankBox>
          )}
        </Top>
        <Bottom>
          <Left></Left>
          <Center>
            {element.count < 7 ? (
              <>
                {!checkLogin ? (
                  <PowerBtn1 alt="randomBtn" onClick={requestProblem} />
                ) : (
                  <PowerBtn2 alt="randomBtn" onClick={requestProblem} />
                )}
              </>
            ) : (
              <>
                {!checkLogin ? (
                  <PowerBtn1 alt="randomBtn" onClick={requestRefresh} />
                ) : (
                  <PowerBtn2 alt="randomBtn" onClick={requestRefresh} />
                )}
              </>
            )}
          </Center>
          <Right>
            <p></p>
            <p>랜덤</p>
          </Right>
        </Bottom>
        {element.count < 7 ? (
          <KeyBoardWrapper>
            <Keyboard>
              <div id="ㅂ">ㅂ</div>
              <div id="ㅈ">ㅈ</div>
              <div id="ㄷ">ㄷ</div>
              <div id="ㄱ">ㄱ</div>
              <div id="ㅅ">ㅅ</div>
              <div id="ㅛ">ㅛ</div>
              <div id="ㅕ">ㅕ</div>
              <div id="ㅑ">ㅑ</div>
              <div id="ㅐ">ㅐ</div>
              <div id="ㅔ">ㅔ</div>
              <div id="Enter">↲</div>
              <div id="ㅁ">ㅁ</div>
              <div id="ㄴ">ㄴ</div>
              <div id="ㅇ">ㅇ</div>
              <div id="ㄹ">ㄹ</div>
              <div id="ㅎ">ㅎ</div>
              <div id="ㅗ">ㅗ</div>
              <div id="ㅓ">ㅓ</div>
              <div id="ㅏ">ㅏ</div>
              <div id="ㅣ">ㅣ</div>
              <div id="ㅋ">ㅋ</div>
              <div id="ㅌ">ㅌ</div>
              <div id="ㅊ">ㅊ</div>
              <div id="ㅍ">ㅍ</div>
              <div id="ㅠ">ㅠ</div>
              <div id="ㅜ">ㅜ</div>
              <div id="ㅡ">ㅡ</div>
            </Keyboard>
          </KeyBoardWrapper>
        ) : (
          <KeyBoardWrapper>
            <Keyboard>
              <div id="ㅂ">ㅂ</div>
              <div id="ㅈ">ㅈ</div>
              <div id="ㄷ">ㄷ</div>
              <div id="ㄱ">ㄱ</div>
              <div id="ㅅ">ㅅ</div>
              <div id="ㅛ">ㅛ</div>
              <div id="ㅕ">ㅕ</div>
              <div id="ㅑ">ㅑ</div>
              <div id="ㅐ">ㅐ</div>
              <div id="ㅔ">ㅔ</div>
              <div id="Enter">↲</div>
              <div id="ㅁ">ㅁ</div>
              <div id="ㄴ">ㄴ</div>
              <div id="ㅇ">ㅇ</div>
              <div id="ㄹ">ㄹ</div>
              <div id="ㅎ">ㅎ</div>
              <div id="ㅗ">ㅗ</div>
              <div id="ㅓ">ㅓ</div>
              <div id="ㅏ">ㅏ</div>
              <div id="ㅣ">ㅣ</div>
              <div id="ㅋ">ㅋ</div>
              <div id="ㅌ">ㅌ</div>
              <div id="ㅊ">ㅊ</div>
              <div id="ㅍ">ㅍ</div>
              <div id="ㅠ">ㅠ</div>
              <div id="ㅜ">ㅜ</div>
              <div id="ㅡ">ㅡ</div>
            </Keyboard>
          </KeyBoardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default React.memo(Test);

// 컨테이너
const Container = styled.div`
  width: 100%;
  height: 90vh;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 90vh;
  }

  @media all and (max-width: 767px) {
  }
`;

// wrapper - .test_____header____tail
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// 모니터 화면 상단 - .header_problem
const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  max-width: 960px;
  height: 55vh;
  text-align: center;
  background: url(${backgroundImg});
  z-index: 1;
  border: solid 15px #383a3f;
  border-bottom-width: 25px;
  border-top-width: 25px;
  border-radius: 0.6rem 0.6rem 0 0;
  font-size: 20px;
  color: white;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 90%;
  }

  @media all and (max-width: 767px) {
    height: 90%;
  }
`;

// 스코어보드(타수, 문제 제목, 정확도) - .header_problem_score
const ScoreBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 65%;
  height: 20%;
`;

// 타수 - .header_problem_score_speed
// div 1 - header_problem_score_speed_column
// div 2 - header_problem_score_speed_result
const Speed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;

// 문제 박스 - .header_title
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

// 제목 - .header_title_title
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #efdc05;
  font-size: max(0.6em, 1.3vw);
  width: 100%;
  position: relative;
  cursor: pointer;
`;

// 토글 메뉴 버튼 -.problem-content
const ToggleMenu = styled.div`
  display: none;
  min-width: 90px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 15;
  border-radius: 0px 0px 5px 5px;
  font-size: max(0.5em, 0.5vw);
  flex-direction: column;

  span {
    color: white;
    padding: 10px 4px;
    display: block;
  }
`;

// 카운터 - .header_title_count
const Counter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  font-size: max(0.5em, 1.1vw);
`;

// 정확도 박스 - .header_problem_score_accuracy
// div1 - .header_problem_score_accuracy_column
// div2 - .header_problem_score_accuracy_result
const AccuracyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  div {
    font-size: max(0.8em, 1.4vw);
    &:nth-child(1) {
      color: #e53a40;
    }
  }
`;

// 문제, 결과 출력 박스 - .header_titleAndProblem
const PrintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 40%;
`;

// 문제, 키보드 입력 박스 - .header_problem_count_header
const ProblemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 70%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 80%;
  }

  @media all and (max-width: 767px) {
  }
`;

// 문제, 키보드 입력 -.problemAndTyping
// textarea - .typing
const ProblemKeyboard = styled.div`
  width: 80%;

  textarea {
    width: 100%;
    margin-top: 5px;
    height: 5vh;
    overflow: hidden;
    resize: none;
    color: white;
    background-color: black;
    border-radius: 5px;
    font-size: max(0.7em, 1.5vw);
    border-left: none;
    border-right: none;

    &:focus {
      outline: none;
    }
  }
`;

// 문제 출력 -.header_problem_count
const PrintProblem = styled.div`
  display: inline-block;
  font-size: max(0.7em, 1.5vw);
  width: 99%;
  text-align: left;
`;

// 문제 잘게 잘게
const SplitProblem = styled.span``;

// 결과 출력 박스 - .header_titleAndProblem_print
// div1 - .header_titleAndProblem_print_header
const PrintResult = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
`;

// 유저 - .header_titleAndProblem_print_header
const UserInfo = styled.div`
  width: 100%;
  color: #efdc05;
  font-size: max(0.7em, 1.4vw);
`;

// 기록 박스 - .header_titleAndProblem_print_body
const RecordPrintBox = styled.div`
  display: grid;
  grid-template-rows: 1.5fr 1.5fr 1.5fr;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: left;
  color: #e53a40;
  font-size: max(0.8em, 1.4vw);
`;

// 스피드(기록) - .header_titleAndProblem_print_body_speed
// div1 - .header_titleAndProblem_print_body_speed_column
// div2 - .header_titleAndProblem_print_body_speed_result
const SpeedRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(3) {
      color: white;
      text-align: left;
    }
  }

  textarea {
    display: none;
  }
`;

// 스피드(기록) - .header_titleAndProblem_print_body_time
// div1 - .header_titleAndProblem_print_body_time_column
// div2 - .header_titleAndProblem_print_body_time_result
const TimeRecord = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;

  div {
    &:nth-child(2) {
      color: white;
      text-align: left;
    }
  }
`;

// 랭킹 출력 박스 - .header_problem_tail
const PrintRankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  height: 40%;
`;

// 랭킹 출력 - .header_problem_result_print_rank
// div1 - .header_problem_result_print_rank_text
// div2 - .header_problem_result_print_rank_top3
const PrintRank = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  div {
    &:nth-child(1) {
      color: #efdc05;
      font-size: 14px;
      height: 15%;

      @media all and (min-width: 768px) and (max-width: 1023px) {
        font-size: 12px;
      }
    }
    &:nth-child(2) {
      height: 100%;

      div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        &:nth-child(1) {
          height: 100%;

          div {
            &:nth-child(1) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
            &:nth-child(2) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
            &:nth-child(3) {
              color: white;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              height: 100%;
              span {
                &:nth-child(4) {
                  color: #e53a40;
                }
              }
            }
          }
        }
      }
    }
  }
`;

// 타이머 - #show
const Timer = styled.span`
  margin-top: 5px;
  font-size: max(0.8em, 1vw);
`;

// 모니터 하단 - .header_problem_result
const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  width: 80vw;
  max-width: 960px;
  height: 13vh;
  text-align: center;
  background-color: #cadbe9;
  border-top-width: 2.5px;
  border-top-style: solid;
  border-top-color: #090707;
  border-radius: 0 0 0.6rem 0.6rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

// 하단 좌 - .header_problem_result_left
const Left = styled.div``;

// 하단 우 -.header_problem_result_right
// p1 -.header_problem_result_right_triangle
// p2 -.header_problem_result_right_arrow
const Right = styled.div`
  display: none;

  p {
    &:nth-child(1) {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      border-color: transparent white transparent transparent;
      z-index: 10;
      margin: 0px;
    }
    &:nth-child(2) {
      border-radius: 8px;
      background: white;
      border: solid transparent;
      color: black;
      border-width: 10px;
      z-index: 10;
      margin: 0px;
    }
  }
`;

// 하단 중 -.header_problem_result_center
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover + ${Right} {
    display: flex;
    justify-content: left;
    align-items: center;
  }
`;

// 버튼(로그인, 비로그인 구별)
// .tail_button_test_login_true
// .tail_button_test_login_false
const PowerBtn1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn1});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 전원 버튼2(로그인)
const PowerBtn2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  border: none;
  background: url(${powerBtn2});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 하단 키보드 박스 - .test_input
const KeyBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 20vh;

  @media all and (min-width: 768px) and (max-width: 1023px) {
  }

  @media all and (max-width: 767px) {
    height: 10%;
  }
`;

// 키보드 - #keyboard
// width: 30vw;
// max-width: 800px;
// min-width: 380px;
// min-height: 15vh;
const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  align-content: center;
  grid-gap: 0.2rem;
  padding: 0.7rem;
  width: 30vw;
  min-width: 20px;
  background: #cadbe9;
  border-radius: 0.8rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);

  div {
    font-size: 0.8vw;
    text-align: center;
    color: #fffff3;
    background: #090707;
    border-radius: 0.6rem;
    padding: 30%;
    transition: all 0.3s ease;
    &:nth-child(12) {
      grid-column: 2;
    }
    &:nth-child(21) {
      grid-column: 3;
    }
    @media all and (min-width: 768px) and (max-width: 1023px) {
      padding: 5%;
    }

    @media all and (max-width: 767px) {
      padding: 10%;
    }
  }
  .pressed {
    background-color: #e53a40;
    transform: scale(1.2);
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    grid-gap: 0.1rem;
    padding: 5px;
    width: 250px;
    height: 50px;
  }

  @media all and (max-width: 767px) {
    grid-gap: 0.1rem;
    padding: 5px;
    width: 180px;
    height: 55px;
  }
`;
