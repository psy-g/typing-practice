import React, { Component } from "react";
import "./Result.css";
import axios from "axios";

class Result extends Component {
  constructor(props) {
    super(props);

    this.ranking = this.ranking.bind(this);
  }

  ranking() {
    const { time, average } = this.props;

    if (time && average) {
      axios
        .post("http://localhost:8080/rank", this.props)
        .then((res) => {
          console.log("====", res);
        })
        .catch((err) => {
          if (err) {
            alert("랭킹 요청 에러");
          }
        });
    } else {
      alert("에러");
    }
  }

  render() {
    const { isOpen, close, time, average } = this.props;

    return (
      <>
        {isOpen ? (
          <div className="loginModal">
            <div className="loginList">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <div className="logo_signin">
                  <img className="signinLogo" alt="결과" />
                </div>
                <input className="loginId" placeholder="속도" />
                <input
                  className="loginPw"
                  type="password"
                  placeholder="정확도"
                />
                <button className="loginBtn">결과</button>
                <div className="socialBox">
                  <div className="test" onClick={this.ranking}>
                    {average}타수<br></br>
                    {time}초
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
