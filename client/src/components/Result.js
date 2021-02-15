import React, { Component } from "react";
import "./Result.css";

class Result extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isOpen, close } = this.props;

    return (
      <>
        {isOpen ? (
          // isopen이 true: 코드를 실행, false: null
          // <div onClick={close}> 버튼, 입력 창 제외 다른 부분(회색바탕) 클릭시 모달이 꺼짐
          // <span className="close" onClick={close}>&times;</span> (&times; = x버튼) 누를시 꺼짐
          // isOpen이 true: 모달 켜짐, false: 모달 꺼짐

          <div className="loginModal">
            <div className="loginList">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <div className="logo_signin">
                  <img className="signinLogo" alt="signinLogo" />
                </div>
                <input className="loginId" placeholder="아이디(이메일)" />
                <input
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호"
                />
                <button className="loginBtn">로그인</button>
                <div className="socialBox">
                  <div className="kakao" onClick={this.kakaoLoginHandler}>
                    <img className="btn_kakao" alt="kakaoLogo" />
                    카카오 로그인
                    <span className="anyMessage">
                      은 이메일 동의를 필요로 합니다.
                    </span>
                  </div>
                  <div className="naver" onClick={this.naverLoginHandler}>
                    <img className="btn_naver" alt="naverLogo" />
                    네이버 로그인
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Result;
