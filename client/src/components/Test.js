import React, { Component } from "react";
import "./Test.css";
import Nav from "./Nav";

class Test extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="test">
          <div className="test_header">테스트</div>
          <div className="test_input">
            <textarea type="text" className="typing"></textarea>
          </div>
          <div className="test_submit"></div>
        </div>
      </div>
    );
  }
}

export default Test;
