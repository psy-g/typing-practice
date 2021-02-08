import React, { Component } from "react";
import "./Signup.css";
import Nav from "./Nav";

class Signup extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="signup">
          <div className="signup_container">
            <div className="row">
              <div className="col-25">
                <label for="email">이메일</label>
              </div>
              <div className="col-75">
                <input
                  placeholder="아이디(이메일)"
                  type="email"
                  className="inputEmail"
                  //   onChange={this.handleInputValue("email")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label for="password">비밀번호</label>
              </div>
              <div className="col-75">
                <input
                  placeholder="비밀번호"
                  type="password"
                  className="inputPassword"
                  //   onChange={this.handleInputValue("password")}
                />
              </div>
            </div>
            <div className="row">
              <input
                type="submit"
                className="user_submit"
                value="회원가입"
                // onClick={() => this.clickBtn()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
