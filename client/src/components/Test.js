import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem:
        "얼마나 더 견뎌야 하는지 짙은 어둠을 헤매고 있어 내가 바란 꿈이라는 것은 없는 걸까?",
    };
  }

  keyboardEvent() {
    // const keyboard = document.getElementById("keyboard");
    const keyboardEvent = document.querySelector(".typing");

    // console.log("===", keyboard.children[0].innerHTML);
    // console.log("len", keyboard.children.length);

    keyboardEvent.addEventListener("keydown", (e) => {
      // if (keyboard) keyboard.children[0].classList.add("pressed");
      const key = document.getElementById(e.key);
      if (key) key.classList.add("pressed");
    });

    keyboardEvent.addEventListener("keyup", (e) => {
      // if (keyboard) keyboard.children[0].classList.remove("pressed");
      const key = document.getElementById(e.key);
      if (key) key.classList.remove("pressed");
    });
  }

  componentDidMount() {
    this.keyboardEvent();
  }

  render() {
    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_header">{this.state.problem}</div>
          <div className="test_input">
            <textarea type="text" className="typing"></textarea>
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
              <div id="del" className="btn_1">
                del
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

export default Test;
