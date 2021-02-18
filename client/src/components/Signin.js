import React from "react";
import axios from "axios";
import "./Signin.css";
import Nav from "./Nav";

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
    };

    this.loginHandler = this.loginHandler.bind(this);
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
    if (nicknameInput.length > 2) {
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
      alert("아이디, 비밀번호를 확인해주세요");
    } else if (isNicknameChecked && isPasswordChecked) {
      const loginRequest = await axios.post(
        "http://localhost:8080/auth/signin",
        { nickname, password },
        { withCredentials: true }
      );
      if (loginRequest.data.message === "signin OK") {
        window.localStorage.setItem("token", loginRequest.data.token);
        window.localStorage.setItem("id", loginRequest.data.id);
        this.loginHandler();
      }
    }
  };

  convertToSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div>
        <Nav />
        <div id="signin">
          <div className="signin_container">
            <input
              className="loginId"
              placeholder="아이디(닉네임)"
              onChange={this.nicknameValidator.bind(this)}
            />
            <input
              className="loginPw"
              type="password"
              placeholder="비밀번호"
              onChange={this.passwordValidator.bind(this)}
            />
            <button
              className="loginBtn"
              onClick={this.loginRequestHandler.bind(this)}
            >
              로그인
            </button>
            <div>
              <Link to="/signup" className="loginEnd">
                <button
                  className="signUpBtn"
                  onClick={this.convertToSignup.bind(this)}
                >
                  회원가입
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
