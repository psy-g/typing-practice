import React, { Component } from "react";
import Nav from "./Nav";
import "./Mypage.css";

class Mypage extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="mypage">
          <div className="mypage_header">마이페이지</div>
        </div>
      </div>
    );
  }
}

export default Mypage;
