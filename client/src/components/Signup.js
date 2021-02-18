import React, { Component } from "react";
import "./Signup.css";
import Nav from "./Nav";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
            alert("이미 동일한 이메일이 존재합니다");
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
          <div className="register">
            <div className="signup_container">
              <div className="row">
                <div className="col-25">
                  {/* <label for="nickname">닉네임</label> */}
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
                  {/* <label for="password">비밀번호</label> */}
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
      </div>
    );
  }
}

export default withRouter(Signup);
