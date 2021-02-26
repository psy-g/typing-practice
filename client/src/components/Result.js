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
    const nickname = window.localStorage.getItem("nick");

    return (
      <>
        {isOpen ? (
          <div className="resultModal">
            <div className="resultList">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                {/* <div className="logo">순위</div> */}
                <div className="result_table">
                  <div className="result_table__column">
                    <span className="result_table__column__rank">순위</span>
                    <span className="result_table__column__nick">이름</span>
                    <span className="result_table__column__record">기록</span>
                  </div>
                  <div className="rank_items">{items}</div>
                </div>
                <button className="toRankingPage">
                  <Link to="/ranking">자세히 보러가기</Link>
                </button>
                <div className="socialBox">
                  <div className="result_record">
                    {nickname ? (
                      <div className="result_record__name">{nickname}</div>
                    ) : (
                      <div className="result_record__name">Guest</div>
                    )}
                    {/* <div className="result_record__name">{nickname}</div> */}
                    <div className="result_record__record">
                      {Math.round(average)}타수 {time}초
                    </div>
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
