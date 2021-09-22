import React from "react";
import styled from "styled-components/macro";

const TestKeyboardContainer = () => {
  return (
    <KeyboardBlock>
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
    </KeyboardBlock>
  );
};

export default TestKeyboardContainer;

const KeyboardBlock = styled.div`
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

const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  align-content: center;
  grid-gap: 0.2rem;
  padding: 0.7rem;
  width: 30vw;
  max-width: 800px;
  min-width: 380px;
  min-height: 15vh;
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
  }
  .pressed {
    background-color: #e53a40;
    transform: scale(1.2);
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    visibility: hidden;
  }

  @media all and (max-width: 767px) {
    visibility: hidden;
  }
`;
