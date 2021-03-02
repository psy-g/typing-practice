import React from "react";
import axios from "axios";
import "./Signin.css";
import Nav from "./Nav";
import signinLogo from "../image/taza.png";
import btn from "../image/power.png";
// import signinLogo from "../image/boardland1.png";

import { withRouter, Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      nickname: "",
      password: "",
      isNicknameChecked: false,
      isPasswordChecked: false,
      check: false,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.check = this.check.bind(this);
    // this.hanChk = this.hanChk.bind(this);
  }

  loginHandler() {
    window.localStorage.setItem("isLogin", true);
    this.props.history.push({
      isLogin: this.state.isLogin,
    });
    this.props.history.push("/");
  }

  nicknameValidator = (e) => {
    const nicknameInput = e.target.value;
    if (nicknameInput.length >= 2) {
      this.setState({ isNicknameChecked: true });
      this.setState({ nickname: nicknameInput });
    } else {
      this.setState({ isNicknameChecked: false });
    }
  };

  passwordValidator = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length >= 4) {
      this.setState({ isPasswordChecked: true });
      this.setState({ password: passwordInput });
    } else {
      this.setState({ isPasswordChecked: false });
    }
  };

  loginRequestHandler = async () => {
    const {
      nickname,
      password,
      isNicknameChecked,
      isPasswordChecked,
    } = this.state;

    // 이메일, 비밀번호 체크
    if (isNicknameChecked === false || isPasswordChecked === false) {
      alert("이름, 비밀번호를 확인해주세요");
    } else if (isNicknameChecked && isPasswordChecked) {
      const loginRequest = await axios.post(
        "http://localhost:8080/auth/signin",
        { nickname, password },
        { withCredentials: true }
      );
      if (loginRequest.data.message === "signin OK") {
        window.localStorage.setItem("token", loginRequest.data.token);
        window.localStorage.setItem("id", loginRequest.data.id);
        window.localStorage.setItem("nick", loginRequest.data.nickname);
        this.loginHandler();
      }
    }
  };

  convertToSignup = () => {
    this.props.history.push("/signup");
  };

  // 회원가입
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  clickBtn = () => {
    const { nickname, password } = this.state;

    if (password.length >= 4 && nickname >= 2) {
      axios
        .post("http://localhost:8080/auth/signup", this.state)
        // .post("https://missinganimals.ml/auth/signup", this.state)
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => {
          if (err) {
            alert("이미 동일한 닉네임이 존재합니다");
          }
        });
    } else {
      // alert("유효한 정보가 아닙니다. 다시 작성해주세요");

      if (nickname.length < 2) {
        const hanValidation = document.querySelector(
          ".signin_body_name_input_validation"
        );
        hanValidation.style.display = "block";
      }
      if (password.length < 4) {
        const passValidation = document.querySelector(
          ".signin_body_password_input_validation"
        );

        passValidation.style.display = "block";
      }
    }
  };

  hanChk = (key) => (e) => {
    // console.log("==key==", key);
    // console.log("===value", e.target.value);
    // console.log("=비교", e.target.value.length > 0);

    const hanValidation = document.querySelector(
      ".signin_body_name_input_validation"
    );

    if (e.target.value.length > 0) {
      var s = e.target.value;
      var len = s.length;
      for (var i = 0; i < len; i++) {
        if (s.charCodeAt(i) < 128) {
          hanValidation.style.display = "block";
          e.target.value = "";
          return;
        } else {
          hanValidation.style.display = "none";
        }
      }
    }
  };

  passChk(e) {
    const passValidation = document.querySelector(
      ".signin_body_password_input_validation"
    );

    passValidation.style.display = "none";

    // if (e.target.value.length > 0) {
    //   var s = e.target.value;

    //   for (var i = 0; i < s.length; i++) {
    //     if (s.length <= 4) {
    //       passValidation.style.display = "block";
    //       e.target.value = "";
    //       return;
    //     } else {
    //       passValidation.style.display = "none";
    //     }
    //   }
    // }
  }

  check() {
    this.setState({ check: true });
  }

  render() {
    const { check } = this.state;

    return (
      <div>
        <Nav />
        <div id="signin">
          <div className="signin_container">
            <div className="signin_header">
              <div className="signin_header_top">
                <img
                  className="header_logo"
                  src={signinLogo}
                  // width="600px"
                  // height="150px"
                  alt="login_logo"
                />
              </div>
            </div>
            {check ? (
              <div className="signin_body">
                <div className="signin_body_name">
                  <div className="signin_body_name_column">이름</div>
                  <input
                    type="text"
                    className="signin_body_name_input"
                    onKeyUp={this.hanChk("hanChk")}
                    onChange={this.handleInputValue("nickname")}
                  />
                  <div className="signin_body_name_input_validation">
                    한글만 가능합니다(2자이상)
                  </div>
                </div>
                <div className="signin_body_password">
                  <div className="signin_body_password_column">비밀번호</div>
                  <input
                    type="password"
                    className="signin_body_password_input"
                    onKeyUp={this.passChk}
                    onChange={this.handleInputValue("password")}
                  />
                  <div className="signin_body_password_input_validation">
                    4자 이상이어야 합니다
                  </div>
                </div>
                <button
                  type="submit"
                  className="signin_body_loginBtn"
                  onClick={() => this.clickBtn()}
                >
                  회원가입
                </button>
              </div>
            ) : (
              <div className="signin_body">
                <div className="signin_body_name">
                  <div className="signin_body_name_column">이름</div>
                  <input
                    className="signin_body_name_input"
                    // placeholder="아이디(닉네임)"
                    onChange={this.nicknameValidator.bind(this)}
                  />
                </div>
                <div className="signin_body_password">
                  <div className="signin_body_password_column">비밀번호</div>
                  <input
                    className="signin_body_password_input"
                    type="password"
                    // placeholder="비밀번호"
                    onChange={this.passwordValidator.bind(this)}
                  />
                </div>
                <div className="signin_body_loginAndSignup">
                  <button
                    className="signin_body_loginBtn"
                    onClick={this.loginRequestHandler.bind(this)}
                  >
                    로그인
                  </button>
                  <button
                    className="signin_body_signupBtn"
                    onClick={this.check}
                    // onClick={this.convertToSignup.bind(this)}
                  >
                    회원가입
                  </button>
                </div>
              </div>
            )}
            {/* <div className="signin_body">
              <div className="signin_body_name">
                <div className="signin_body_name_column">이름</div>
                <input
                  className="signin_body_name_input"
                  // placeholder="아이디(닉네임)"
                  onChange={this.nicknameValidator.bind(this)}
                />
              </div>
              <div className="signin_body_password">
                <div className="signin_body_password_column">비밀번호</div>
                <input
                  className="signin_body_password_input"
                  type="password"
                  // placeholder="비밀번호"
                  onChange={this.passwordValidator.bind(this)}
                />
              </div>
              <div className="signin_body_loginAndSignup">
                <button
                  className="signin_body_loginBtn"
                  onClick={this.loginRequestHandler.bind(this)}
                >
                  로그인
                </button>
                <button
                  className="signin_body_signupBtn"
                  onClick={this.check}
                  // onClick={this.convertToSignup.bind(this)}
                >
                  회원가입
                </button>
              </div>
            </div> */}
          </div>
          <div className="signin_tail">
            <Link to="/signin">
              <img
                className="signin_tail_button"
                src={btn}
                width="50px"
                height="50px"
                alt="btn"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
