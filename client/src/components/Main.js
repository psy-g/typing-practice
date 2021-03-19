import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../image/taza.png";
import btn from "../image/power.png";
import mainImg1 from "../image/main_img1.gif";

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      // <div id="real_main">
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
          <div className="header____tail">
            {/* <div className="header____tail____tail"> */}
            <div className="header____tail____descript">
              <div className="context-header">
                {/* <div className="context-header-text">
                  타자치자<br></br>
                측정하고 기록을<br></br>
                확인하자!
              </div> */}
                <div className="context-header-text">
                  <div className="context-header-text-top">
                    타자치자<br></br>
                    측정하고 기록을<br></br>
                    확인하자!
                  </div>
                  <div className="context-header-text-bottom">
                    한글의 자음과 모음을 분리하여
                    <div className="context-header-text-bottom-marker-container">
                      <div className="context-header-text-bottom-marker">
                        {" "}
                        정확도를 계산
                      </div>
                      <div className="context-header-text-bottom-noMarker">
                        합니다
                      </div>
                    </div>
                  </div>
                </div>
                <div className="context-header-img-container">
                  <img
                    className="context-header-img"
                    src={mainImg1}
                    width="50px"
                    height="50px"
                    alt="측정이미지"
                  />
                </div>
              </div>
              {/* <div className="context-body">
                한글의 자음과 모음을 분리하여<br></br>
                입력된 것과 비교하여
                <span className="context-body-marker">정확도를 계산</span>합니다
              </div> */}
            </div>
          </div>
          <div className="header____tail">
            {/* <div className="header____tail____tail"> */}
            <div className="header____tail____descript">설명창</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
