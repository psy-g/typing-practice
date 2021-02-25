import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Signout from "./Signout";

import loginIcon from "../image/login.png";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hambugerWidth: "0px",
      isOpen: false,
    };
  }

  openBurger = () => {
    this.setState({ isOpen: true });
  };
  closeBurger = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const loginCheck = window.localStorage.getItem("isLogin");

    return (
      <div>
        <div id="nav">
          <div className="nav">
            <span className="nav_logo">
              <Link to="/" className="nav_logo_font">
                {/* 보드런 */}
                {/* 강타자 */}
                보드랜드
              </Link>
            </span>
            {isOpen ? (
              <div className="burger_container">
                <div className="bunger_container_header">
                  <div className="burger_icon" onClick={this.closeBurger}>
                    &times;&nbsp;
                  </div>
                </div>
                {loginCheck ? (
                  <div className="burger">
                    <div className="burger_home">
                      <div className="buger_home_home">
                        <Link to="/">
                          <span>🏠</span> 홈
                        </Link>
                      </div>
                    </div>
                    <div className="burger_close">
                      <div className="burger_close_logout">
                        <Signout />
                      </div>
                      <div className="burger_close_mypage">
                        <Link to="/mypage">
                          <span className="buger_ranking_mypage">📊</span>{" "}
                          마이페이지
                        </Link>
                      </div>
                      <div className="burger_close_ranking">
                        <Link to="/ranking">
                          <span className="buger_ranking_icon">🏆</span> 랭킹
                        </Link>
                      </div>
                      <div className="burger_close_test">
                        <Link to="/test">
                          <span className="buger_test_icon">⌨</span> 속도 측정
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="burger">
                    <div className="burger_home">
                      <div className="buger_home_home">
                        <Link to="/">
                          <span>🏠</span> 홈
                        </Link>
                      </div>
                    </div>
                    <div className="burger_close">
                      <div className="burger_close_signin">
                        <Link to="/signin">
                          <span className="buger_signup_icon">🖥</span> 로그인
                        </Link>
                      </div>
                      <div className="burger_close_signup">
                        <Link to="/signup">
                          <span className="buger_signup_icon">🤝</span> 회원가입
                        </Link>
                      </div>
                      <div className="burger_close_ranking">
                        <Link to="/ranking">
                          <span className="buger_ranking_icon">🏆</span> 랭킹
                        </Link>
                      </div>
                      <div className="burger_close_test">
                        <Link to="/test">
                          <span className="buger_test_icon">⌨</span> 속도 측정
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bad">
                <span className="burger_open" onClick={this.openBurger}>
                  &#9776;
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
