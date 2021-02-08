import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="main">
          <div className="header">이미지</div>
          <div className="login">상</div>
          <div className="enter">
            <Link to="/test">중</Link>
          </div>
          <div className="tail">하</div>
        </div>
      </div>
    );
  }
}

export default Main;
