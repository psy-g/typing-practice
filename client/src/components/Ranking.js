import React, { Component } from "react";
import Nav from "./Nav";
import "./Ranking.css";
import axios from "axios";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      myRecord: "",
    };

    this.print = this.print.bind(this);
  }

  print() {
    const items = [];
    const printRank = [];
    const select = document.querySelector(".select_start");
    const selectValue = select.options[select.selectedIndex].text;

    if (selectValue) {
      axios
        .post("http://localhost:8080/ranking/print", {
          title: selectValue,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        })
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          for (const [index, value] of printRank.entries()) {
            items.push(
              <div className={`rank__${index}`}>
                <div className="rank__rank">{index + 1}</div>
                <div className="rank__name">{value.name}</div>
                <div className="rank__record">
                  {value.average}타수 {value.time}초
                </div>
              </div>
            );
          }
          this.setState({ items: items });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("에러");
    }
  }

  detail() {
    const test = document.querySelectorAll(".rank");
    const nickname = window.localStorage.getItem("nick");

    // const test = document.querySelector(".rank .rank__1 .rank__record")
    //   .innerHTML;

    let userRecord;
    // 로그인 유저 기록
    for (let i = 0; i < test.length; i++) {
      for (let j = 0; j < test[i].querySelectorAll(".rank__name").length; j++) {
        if (test[i].querySelectorAll(".rank__name")[j].innerHTML === nickname) {
          userRecord = test[i]
            .querySelectorAll(".rank__name")
            [j].parentElement.querySelector(".rank__record").innerHTML;
        }
      }
    }

    // 1등 기록
    let bestRecord = document.querySelector(".rank .rank__0 .rank__record")
      .innerHTML;

    console.log("1등기록", bestRecord);
    console.log("내기록", userRecord);
  }

  //   <div className={`rank__${index}`}>
  //   <div className="rank__rank">{index + 1}</div>
  //   <div className="rank__name">{value.name}</div>
  //   <div className="rank__record">
  //     {value.average}타수 {value.time}초
  //   </div>
  // </div>

  componentDidMount() {
    // this.print();
  }

  render() {
    const { items } = this.state;
    const nick = window.localStorage.getItem("nick");

    return (
      <div>
        <Nav />
        <div id="ranking">
          <div className="ranking_list">
            <div className="ranking_list_table">
              <select
                type="button"
                className="select_start"
                onChange={this.print}
              >
                <option value="select_0">선택</option>
                <option value="select_1">눈 녹듯</option>
                <option value="select_2">말리꽃</option>
                <option value="select-3">오아시스</option>
              </select>
              <div className="table__column">
                <span className="column__rank">순위</span>
                <span className="column__nick">닉네임</span>
                <span className="column__record">기록</span>
              </div>
              <div className="rank">{items}</div>
            </div>
          </div>
          <div className="ranking_tail">
            <div className="ranking_detail">
              <div className="detail_header">
                {nick}님의 기록
                <div className="header_click" onClick={this.detail}>
                  클릭
                </div>
              </div>
              <div className="detail_body">
                <div class="graph-wrapper">
                  <h1>Title</h1>
                  <div class="percent-indicator">
                    <div class="per-0"></div>
                    <div class="per-20"></div>
                    <div class="per-40"></div>
                    <div class="per-60"></div>
                    <div class="per-80"></div>
                    <div class="per-100"></div>
                  </div>
                  <ul class="graph">
                    <li class="item1 p-100"></li>
                    <li class="item2 p-75"></li>
                    <li class="item3 p-100"></li>
                    {/* <li class="item3 p-60"></li> */}
                    <li class="item4 p-35"></li>
                    {/* <li class="item5 p-15"></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
