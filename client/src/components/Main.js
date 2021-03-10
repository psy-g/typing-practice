import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../image/taza.png";
import btn from "../image/power.png";

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      <div>
        <Nav />
        <div id="main">
          <div className="header____tail">
            <div className="header">
              <div className="header_top">
                <img className="header_logo" src={logo} alt="logo" />
              </div>
              <div className="header_enter">
                <Link to="/test" className="header_enter_test">
                  INSERT COIN
                </Link>
                <div className="header_enter_tail">@YG 2021</div>
              </div>
            </div>
            <div className="tail">
              <div className="tail_button">
                {!checkLogin ? (
                  <Link to="/signin">
                    <img
                      className="tail_button"
                      src={btn}
                      width="50px"
                      height="50px"
                      alt="btn"
                    />
                  </Link>
                ) : (
                  <Link to="/test">
                    <img
                      className="tail_button"
                      src={btn}
                      width="50px"
                      height="50px"
                      alt="btn"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
