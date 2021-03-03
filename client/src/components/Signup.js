import React, { Component } from "react";
import "./Signup.css";
import Nav from "./Nav";
import axios from "axios";
import { withRouter } from "react-router-dom";
import signupLogo from "../image/taza.png";
// import signupLogo from "../image/boardland1.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
    };
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  clickBtn = () => {
    const { nickname, password } = this.state;

    if (password.length >= 4 && nickname) {
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
      alert("유효한 정보가 아닙니다. 다시 작성해주세요");
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <div id="signup">
          <div className="signup_container">
            <div className="signup_header">
              <div className="signup_header_top">
                <img
                  className="header_logo"
                  src={signupLogo}
                  alt="login_logo"
                />
              </div>
            </div>
            <div className="signup_body">
              <div className="signup_body_name">
                <div className="signup_body_name_column">이름</div>
                <input
                  // placeholder="닉네임"
                  type="email"
                  className="signup_body_name_input"
                  onChange={this.handleInputValue("nickname")}
                />
              </div>
              <div className="signup_body_password">
                <div className="signup_body_password_column">비밀번호</div>
                <input
                  // placeholder="비밀번호"
                  type="password"
                  className="signup_body_password_input"
                  onChange={this.handleInputValue("password")}
                />
              </div>
              <button
                type="submit"
                className="signup_body_btn"
                onClick={() => this.clickBtn()}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

{
  /* <div>
<Nav />
<div id="signup">
  <div className="register">
    <div className="signup_container">
      <div className="row">
        <div className="col-25">
          <label className="nickname">닉네임</label>
        </div>
        <div className="col-75">
          <input
            placeholder="닉네임"
            type="email"
            className="inputNickname"
            onChange={this.handleInputValue("nickname")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label className="password">비밀번호</label>
        </div>
        <div className="col-75">
          <input
            placeholder="비밀번호"
            type="password"
            className="inputPassword"
            onChange={this.handleInputValue("password")}
          />
        </div>
      </div>
      <div className="row">
        <input
          type="submit"
          className="user_submit"
          value="회원가입"
          onClick={() => this.clickBtn()}
        />
      </div>
    </div>
  </div>
</div>
</div> */
}
