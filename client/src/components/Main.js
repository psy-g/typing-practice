import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../image/taza.png";
import btn from "../image/power.png";
import mainImg1 from "../image/main_img1.gif";
import mainImg2 from "../image/main_img2.png";
import mainImg3 from "../image/main_img3.png";
import mainImg4 from "../image/main_img4.png";
import scroll from "../image/scroll1.png";

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
            <div className="context-main-tail">
              <img
                className="context-main-tail-img"
                src={scroll}
                width="50px"
                height="50px"
                alt="스크롤"
              />
            </div>
          </div>
          <div className="header____tail">
            <div className="header____tail____descript">
              <div className="context-header">
                <div className="context-header-text">
                  <div className="context-header-text-top1">
                    타자치자<br></br>
                    측정하고 기록을<br></br>
                    확인하자!
                  </div>
                  <div className="context-header-text-bottom1">
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
              <div className="context-tail">
                <img
                  className="context-tail-img"
                  src={scroll}
                  width="50px"
                  height="50px"
                  alt="스크롤"
                />
              </div>
            </div>
          </div>
          <div className="header____tail">
            <div className="header____tail____descript">
              <div className="context-header">
                <div className="context-header-img-container">
                  <img
                    className="context-header-img"
                    src={mainImg2}
                    width="50px"
                    height="50px"
                    alt="측정이미지"
                  />
                </div>
                <div className="context-header-text">
                  <div className="context-header-text-top2">
                    <div>타자치자</div>
                    <div>측정이 끝나면</div>
                    <div>순위를 확인하자</div>
                  </div>
                  <div className="context-header-text-bottom2">
                    주어진 문제를 모두 풀면
                    <div className="context-header-text-bottom-marker-container">
                      <div className="context-header-text-bottom-marker">
                        {" "}
                        순위를 확인
                      </div>
                      <div className="context-header-text-bottom-noMarker">
                        합니다
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="context-tail">
                <img
                  className="context-tail-img"
                  src={scroll}
                  width="50px"
                  height="50px"
                  alt="스크롤"
                />
              </div>
            </div>
          </div>
          <div className="header____tail">
            <div className="header____tail____descript">
              <div className="context-header3">
                <div className="context-header-text">
                  <div className="context-header-text-top3">
                    랭킹<br></br>
                    자세한 기록을<br></br>
                    확인하자!
                  </div>
                  <div className="context-header-text-bottom3">
                    1등 기록과
                    <div className="context-header-text-bottom-marker-container">
                      <div className="context-header-text-bottom-marker">
                        {" "}
                        비교
                      </div>
                      <div className="context-header-text-bottom-noMarker">
                        해 볼 수 있습니다
                      </div>
                    </div>
                  </div>
                </div>
                <div className="context-header-img3-container">
                  <img
                    className="context-header-img3-1"
                    src={mainImg3}
                    width="50px"
                    height="50px"
                    alt="순위1"
                  />
                  <img
                    className="context-header-img3-2"
                    src={mainImg4}
                    width="50px"
                    height="50px"
                    alt="순위2"
                  />
                </div>
              </div>
              {/* <div className="context-tail">
                <img
                  className="context-tail-img"
                  src={scroll}
                  width="50px"
                  height="50px"
                  alt="스크롤"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
