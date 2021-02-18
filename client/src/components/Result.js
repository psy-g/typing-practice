import React, { Component } from "react";
import "./Result.css";
import { Link } from "react-router-dom";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printRank: [],
    };
  }

  render() {
    const { isOpen, close, time, average, items } = this.props;

    return (
      <>
        {isOpen ? (
          <div className="loginModal">
            <div className="loginList">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <div className="logo_signin">랭킹</div>
                <div className="rank">{items}</div>
                <button className="loginBtn">
                  <Link to="/ranking">자세히 보러가기</Link>
                </button>
                <div className="socialBox">
                  <div className="test">
                    {Math.round(average)}타수<br></br>
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
