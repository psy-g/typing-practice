import React from "react";
import axios from "axios";
import "./Signin.css";
import Nav from "./Nav";
import signinLogo from "../image/taza.png";
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
    if (nicknameInput.length >= 1) {
      this.setState({ isNicknameChecked: true });
      this.setState({ nickname: nicknameInput });
    } else {
      this.setState({ isNicknameChecked: false });
    }
  };

  passwordValidator = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length >= 1) {
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

    const loginDuplicate = document.querySelector(
      ".signin_body_name_input_login1"
    );

    const loginDuplicate2 = document.querySelector(
      ".signin_body_name_input_login2"
    );

    // 이메일, 비밀번호 체크
    if (isNicknameChecked === false || isPasswordChecked === false) {
      loginDuplicate.style.display = "block";
    } else if (isNicknameChecked && isPasswordChecked) {
      loginDuplicate.style.display = "none";

      const loginRequest = await axios.post(
        "http://localhost:8080/auth/signin",
        // "http://54.180.91.194:8080/auth/signin",
        { nickname, password },
        { withCredentials: true }
      );
      if (loginRequest.data.message === "signin OK") {
        window.localStorage.setItem("token", loginRequest.data.token);
        window.localStorage.setItem("id", loginRequest.data.id);
        window.localStorage.setItem("nick", loginRequest.data.nickname);
        this.loginHandler();
      } else {
        loginDuplicate2.style.display = "block";
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
    const duplicate = document.querySelector(
      ".signin_body_name_input_duplicate"
    );

    if (password.length >= 4 && nickname.length >= 2 && nickname.length <= 5) {
      axios
        .post("http://localhost:8080/auth/signup", this.state)
        // .post("http://54.180.91.194:8080/auth/signup", this.state)
        .then((res) => {
          if (res.data.message === "signup") {
            this.props.history.push("/");
          } else {
            duplicate.style.display = "block";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // alert("유효한 정보가 아닙니다. 다시 작성해주세요");

      if (nickname.length < 2 || nickname.length > 5) {
        const hanValidation = document.querySelector(
          ".signin_body_name_input_validation"
        );
        duplicate.style.display = "none";
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

  loginChk() {
    const loginDuplicate = document.querySelector(
      ".signin_body_name_input_login1"
    );

    const loginDuplicate2 = document.querySelector(
      ".signin_body_name_input_login2"
    );

    loginDuplicate.style.display = "none";
    loginDuplicate2.style.display = "none";
  }

  hanChk = (key) => (e) => {
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
          <div className="signin____header____tail">
            <div className="signin_container">
              <div className="signin_header">
                <div className="signin_header_top">
                  <img
                    className="signin_header_logo"
                    src={signinLogo}
                    alt="login_logo"
                  />
                </div>
              </div>
              {check ? (
                <div className="signin_body">
                  <div className="signin_body_name">
                    <div className="signin_body_name_column">닉네임</div>
                    <input
                      type="text"
                      className="signin_body_name_input"
                      onKeyUp={this.hanChk("hanChk")}
                      onChange={this.handleInputValue("nickname")}
                    />
                    <div className="signin_body_name_input_validation">
                      한글만 가능합니다<br></br>
                      최소 2글자, 최대 5글자
                    </div>
                    <div className="signin_body_name_input_duplicate">
                      중복된 닉네임입니다
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
                    <div className="signin_body_name_column">닉네임</div>
                    <input
                      className="signin_body_name_input"
                      onChange={this.nicknameValidator.bind(this)}
                      onKeyUp={this.loginChk}
                    />
                    <div className="signin_body_name_input_login1">
                      정보가 입력되지 않았습니다
                    </div>
                    <div className="signin_body_name_input_login2">
                      가입정보가 일치하지 않습니다
                    </div>
                  </div>
                  <div className="signin_body_password">
                    <div className="signin_body_password_column">비밀번호</div>
                    <input
                      className="signin_body_password_input"
                      type="password"
                      onChange={this.passwordValidator.bind(this)}
                      onKeyUp={this.loginChk}
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
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="signin_tail">
              <Link to="/">
                {/* <img
                  className="signin_tail_button"
                  src={btn}
                  width="50px"
                  height="50px"
                  alt="btn"
                /> */}
                <div className="tail_button_signin" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
