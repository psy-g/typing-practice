import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../image/taza.png";
import mainImg1 from "../image/main_img_1.gif";
import mainImg2 from "../image/main_img_2.png";
import mainImg3 from "../image/main_img_3.png";
import mainImg4 from "../image/main_img_4.gif";
import scrollText from "../image/scroll_image.png";
import $ from "jquery";

class Main extends Component {
  // constructor(props) {
  //   super(props);
  // }

  scrollTest() {
    // let scrollValue = document.querySelector("#main").scrollTop;

    // console.log("스크롤 위치는?", scrollValue);

    $(document).ready(function () {
      $("#main").on("scroll", function () {
        // var scrollValue = $("#main").scrollTop();
        //   console.log("스크롤위치", scrollValue);

        // var scrollValue2 = $(".scroll_icon-img1").offset();
        // console.log("대상의위치값", scrollValue2);
        let scrollLocation = document.querySelector("#main").scrollTop; // 현재 스크롤바 위치
        let windowHeight = window.innerHeight; // 스크린 창
        let fullHeight = document.querySelector("#main").scrollHeight; //  margin 값은 포함 x

        // console.log("스크롤 위치는?", scrollLocation);

        const scrollImg = document.querySelector(".scroll_icon");

        // 스크롤 끝
        if (scrollLocation + windowHeight >= fullHeight) {
          scrollImg.style.display = `none`;
          // console.log("끝");
        } else {
          scrollImg.style.display = `block`;
        }
      });
    });
  }

  componentDidMount() {
    this.scrollTest();
  }

  render() {
    const checkLogin = window.localStorage.getItem("isLogin");

    // var second = document.querySelector("#main .header____tail:nth-child(2)");
    // console.log("1", second);

    // var even = document.querySelectorAll(".header____tail:nth-child(2n)");
    // console.log("2", even);

    // var check = document.querySelector(".context-header-text-top1").innerHTML;

    // console.log("3", check);

    return (
      <div>
        <div id="nav_main">
          <Nav />
        </div>
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
              <div className="tail_left"></div>
              <div className="tail_center">
                <div className="tail_button">
                  {!checkLogin ? (
                    <Link to="/signin">
                      <div className="tail_button_main" />
                    </Link>
                  ) : (
                    <Link to="/test">
                      <div className="tail_button_main_login" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="tail_right">
                <p className="tail_right_triangle"></p>
                <p className="tail_right_arrow">로그인</p>
              </div>
              {/* <div className="tail_button">
                {!checkLogin ? (
                  <Link to="/signin">
                    <div className="tail_button_main" />
                  </Link>
                ) : (
                  <Link to="/test">
                    <div className="tail_button_main_login" />
                  </Link>
                )}
              </div> */}
            </div>
            <div className="scroll_icon">
              <img
                className="scroll_icon-img1"
                src={scrollText}
                alt="스크롤아이콘"
                width="70px"
                height="80px"
              />
            </div>
          </div>
          <div className="header____tail">
            <div className="header____tail____descript">
              <div className="context-header">
                <div className="context-header-text">
                  <div className="context-header-text-top1">
                    타자치자<br></br>
                    입력하여 실력을<br></br>
                    확인하자
                  </div>
                  <div className="context-header-text-bottom1">
                    한글의 자음과 모음을 분리하여
                    <div className="context-header-text-bottom-marker-container">
                      <div className="context-header-text-bottom-marker">
                        {" "}
                        타수와 정확도를 계산
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
              <div className="scroll_icon">
                {/* <img
                  className="scroll_icon-img2"
                  src={scrollIcon2}
                  alt="스크롤아이콘"
                /> */}
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
                    <div>기록</div>
                    <div>측정이 끝나고</div>
                    <div>기록을 확인하자</div>
                  </div>
                  <div className="context-header-text-bottom2">
                    주어진 문제를 모두 풀면
                    <div className="context-header-text-bottom-marker-container">
                      <div className="context-header-text-bottom-marker">
                        {" "}
                        기록과 순위를 확인
                      </div>
                      <div className="context-header-text-bottom-noMarker">
                        합니다
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scroll_icon">
                {/* <img
                  className="scroll_icon-img3"
                  src={scrollIcon3}
                  alt="스크롤아이콘"
                /> */}
              </div>
            </div>
          </div>
          <div className="header____tail">
            <div className="header____tail____descript">
              <div className="context-header3">
                <div className="context-header-text3">
                  <div className="context-header-text-top3">
                    순위<br></br>
                    다른 사람의<br></br>
                    기록을 확인합니다
                  </div>
                  <div className="context-header-text-bottom3">
                    그래프를 통해 다른 기록과
                    <div className="context-header-text-bottom-marker-container3">
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
              <div className="main_footer">
                <a
                  href="https://wonderfulharu.tistory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  블로그
                </a>
                <a href="mailto:psykyg@gmail.com">이메일</a>
                <a
                  href="https://github.com/psy-g"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  깃허브
                </a>
              </div>
              <div className="scroll_icon">
                {/* <img
                  className="scroll_icon-img4"
                  src={scrollIcon4}
                  alt="스크롤아이콘"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
