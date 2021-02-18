import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Signout from "./Signout";

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
              <Link to="/">로고</Link>
            </span>
            {/* <span className="nav_btn">버튼</span> */}
            {isOpen ? (
              // <div onClick={this.closeBurger}>
              <div className="burger_container">
                <div className="burger_icon" onClick={this.closeBurger}>
                  &times;
                </div>
                {loginCheck ? (
                  <div className="burger_close">
                    <div className="logout">
                      <Signout />
                    </div>
                    <Link to="/mypage">마이페이지</Link>
                    <Link to="/ranking">랭킹</Link>
                  </div>
                ) : (
                  <div className="burger_close">
                    <Link to="/signin">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                    <Link to="/ranking">랭킹</Link>
                  </div>
                )}
                {/* <div className="burger_close">
                  <Link to="/signin">로그인</Link>
                  <Link to="/signup">회원가입</Link>
                  <Link to="/ranking">랭킹</Link>
                  <div className="logout">
                    <Signout />
                  </div>
                </div> */}
              </div>
            ) : (
              // </div>
              <div className="bad">
                <span className="burger_open" onClick={this.openBurger}>
                  &#9776;
                </span>
              </div>
            )}

            {/* <div className="burgerburger" onclick={this.toggleNav("myNav")}>
              &#9776; open
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
