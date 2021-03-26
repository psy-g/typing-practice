import React, { Component } from "react";
import Nav from "./Nav";
import "./Ranking.css";
import axios from "axios";
import arrow from "../image/arrow2.png";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      myItems: [],
      myRecord: "",
      init: "눈 녹듯",
      myInit: [],
      myRanking: "",
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
        })
        // .post("http://54.180.91.194:8080/ranking/print", {
        //   title: selectValue,
        // })
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
              <tr className={`rank__${index}`}>
                <td className="rank__rank">{index + 1}</td>
                <td className="rank__name">{value.name}</td>
                <td className="rank__record">{value.average}타수</td>
                <td className="rank__time">{value.time}초</td>
              </tr>
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

    setTimeout(() => {
      this.detail();
    }, 500);
  }

  init() {
    const items = [];
    const printRank = [];
    const myRank = [];
    const myItems = [];
    const nickname = window.localStorage.getItem("nick");

    axios
      .post("http://localhost:8080/ranking/print", {
        title: "눈 녹듯",
        name: nickname,
      })
      // .post("http://54.180.91.194:8080/ranking/print", {
      //   title: selectValue,
      // })
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
            <tr className={`rank__${index}`}>
              <td className="rank__rank">{index + 1}</td>
              <td className="rank__name">{value.name}</td>
              <td className="rank__record">{value.average}타수</td>
              <td className="rank__time">{value.time}초</td>
            </tr>
          );
        }
        this.setState({ items: items });

        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].name === nickname)
            this.setState({ myRanking: i + 1 });
        }

        res.data.myRank.forEach((el) => {
          myRank.push({
            name: el.name,
            average: el.average,
            time: el.time,
          });
        });
        for (const [index, value] of myRank.entries()) {
          myItems.push(
            <tr>
              <td className="myRanking_rank">{this.state.myRanking}</td>
              <td className="myRanking_name">{value.name}</td>
              <td className="myRanking_record">{value.average}타수</td>
              <td className="myRanking_time">{value.time}초</td>
            </tr>
          );
        }
        if (myItems.length !== 0) {
          this.setState({ myItems: myItems });
        } else {
          myItems.push(
            <tr>
              <td className="myRanking_rank"></td>
              <td className="myRanking_name">{nickname}</td>
              <td className="myRanking_record">0타수</td>
              <td className="myRanking_time">0초</td>
            </tr>
          );
          this.setState({ myItems: myItems });
        }
      })

      .catch((err) => {
        console.log(err.response);
      });

    setTimeout(() => {
      this.detail();
    }, 500);
  }

  detail() {
    const test = document.querySelectorAll(".rank");
    const nickname = window.localStorage.getItem("nick");

    // 1등 기록, 이름
    // const bestRecord = document.querySelector(".rank .rank__0 .rank__record")
    //   .innerHTML;
    // const bestName = document.querySelector(".rank .rank__0 .rank__name")
    //   .innerHTML;
    const bestRecord = document.querySelector(".rank__0 .rank__record")
      .innerHTML;
    const bestName = document.querySelector(".rank__0 .rank__name").innerHTML;

    // 1등 타수만
    const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);

    // 비회원
    if (nickname === null) {
      const target = document.querySelector(".detail_body");
      const guest = "Guest";

      target.innerHTML = "";

      const newDiv = document.createElement("div");

      newDiv.className = "graph-wrapper";
      newDiv.innerHTML = `
        <div class="percent-indicator">
          <div class="per-0"></div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <ul class="graph">
          <li class="item1 p-${best}"></li>
          <li class="item2 p-20"></li>
        </ul>
        `;
      target.prepend(newDiv);

      const graph1 = document.querySelector(".graph .item1");
      const graph2 = document.querySelector(".graph .item2");

      if (best >= 101) {
        graph1.style.width = `106%`;
        graph1.style.animation = `p-999 3s`;
        graph1.style.maxHeight = "40px";
        graph2.style.width = `30%`;
        graph2.style.animation = `p-30 3s`;
        graph2.style.maxHeight = "40px";

        document.styleSheets[0].addRule(
          `li.item1::before`,
          'content: "' + best + '타수";'
        );

        document.styleSheets[0].addRule(
          `li.item2::before`,
          'content: "' + guest + '";'
        );

        document.styleSheets[0].addRule(
          "li.item1::after",
          'content: "' + bestName + '";'
        );

        document.styleSheets[0].addRule(
          "li.item2::after",
          'content: "' + guest + '";'
        );
      } else {
        graph1.style.width = `${best}%`;
        graph1.style.animation = `p-${best} 3s`;
        graph1.style.maxHeight = "40px";
        graph2.style.width = `30%`;
        graph2.style.animation = `p-30 3s`;
        graph2.style.maxHeight = "40px";

        const record1 = bestRecord.substring(0, 3);

        document.styleSheets[0].addRule(
          `li.item1::before`,
          'content: "' + record1 + '타수";'
        );

        document.styleSheets[0].addRule(
          `li.item2::before`,
          'content: "' + guest + '";'
        );

        document.styleSheets[0].addRule(
          "li.item1::after",
          'content: "' + bestName + '";'
        );

        document.styleSheets[0].addRule(
          "li.item2::after",
          'content: "' + guest + '";'
        );
      }
    }
    // 회원
    else {
      const target = document.querySelector(".detail_body");

      target.innerHTML = "";

      let userRecord;
      // 로그인 유저 기록
      for (let i = 0; i < test.length; i++) {
        for (
          let j = 0;
          j < test[i].querySelectorAll(".rank__name").length;
          j++
        ) {
          if (
            test[i].querySelectorAll(".rank__name")[j].innerHTML === nickname
          ) {
            userRecord = test[i]
              .querySelectorAll(".rank__name")
              [j].parentElement.querySelector(".rank__record").innerHTML;
          }
        }
      }

      // 로그인(기록 없음)
      if (userRecord === undefined) {
        const newDiv = document.createElement("div");

        newDiv.className = "graph-wrapper";
        newDiv.innerHTML = `
        <div class="percent-indicator">
          <div class="per-0"></div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <ul class="graph">
          <li class="item1 p-${best}"></li>
          <li class="item2 p-20"></li>
        </ul>
        `;
        target.prepend(newDiv);

        const graph1 = document.querySelector(".graph .item1");
        const graph2 = document.querySelector(".graph .item2");

        if (best >= 101) {
          graph1.style.width = `106%`;
          graph1.style.animation = `p-999 3s`;
          graph1.style.maxHeight = "40px";
          graph2.style.width = `20%`;
          graph2.style.animation = `p-20 3s`;
          graph2.style.maxHeight = "40px";

          const record1 = bestRecord.substring(0, 3);
          var noRecord = "기록x";

          document.styleSheets[0].addRule(
            `li.p-${best}::before`,
            'content: "' + record1 + '타수";'
          );

          document.styleSheets[0].addRule(
            `li.p-20::before`,
            'content: "' + noRecord + '";'
          );

          document.styleSheets[0].addRule(
            "li.item1::after",
            'content: "' + bestName + '";'
          );

          document.styleSheets[0].addRule(
            "li.item2::after",
            'content: "' + nickname + '";'
          );
        } else {
          graph1.style.width = `${best}%`;
          graph1.style.animation = `p-${best} 3s`;
          graph1.style.maxHeight = "40px";
          graph2.style.width = `20%`;
          graph2.style.animation = `p-20 3s`;
          graph2.style.maxHeight = "40px";

          const record1 = bestRecord.substring(0, 3);
          var noRecord1 = "기록x";

          document.styleSheets[0].addRule(
            `li.p-${best}::before`,
            'content: "' + record1 + '타수";'
          );

          document.styleSheets[0].addRule(
            `li.p-20::before`,
            'content: "' + noRecord1 + '";'
          );

          document.styleSheets[0].addRule(
            "li.item1::after",
            'content: "' + bestName + '";'
          );

          document.styleSheets[0].addRule(
            "li.item2::after",
            'content: "' + nickname + '";'
          );
        }
      }
      // 로그인(기록 있음)
      else {
        const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);
        const challenger = Math.floor(
          (userRecord.split("타수")[0] / 750) * 100
        );

        const newDiv = document.createElement("div");

        console.log("=best=", best);
        console.log("=chall=", challenger);

        newDiv.className = "graph-wrapper";
        newDiv.innerHTML = `
        <div class="percent-indicator">
          <div class="per-0"></div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <ul class="graph">
          <li class="item1 p-${best}"></li>
          <li class="item2 p-${challenger}"></li>
        </ul>
        `;
        target.prepend(newDiv);

        const graph1 = document.querySelector(".graph .item1");
        const graph2 = document.querySelector(".graph .item2");
        const record1 = bestRecord.split(" ")[0];
        const record2 = userRecord.split(" ")[0];

        if (best >= 101 && challenger >= 101) {
          graph1.style.width = `106%`;
          graph1.style.animation = `p-999 3s`;
          graph1.style.maxHeight = "40px";
          graph2.style.width = `106%`;
          graph2.style.animation = `p-999 3s`;
          graph2.style.maxHeight = "40px";

          document.styleSheets[0].addRule(
            `li.item1::before`,
            'content: "' + record1 + '";'
          );

          document.styleSheets[0].addRule(
            `li.item2::before`,
            'content: "' + record2 + '";'
          );

          document.styleSheets[0].addRule(
            "li.item1::after",
            'content: "' + bestName + '";'
          );

          document.styleSheets[0].addRule(
            "li.item2::after",
            'content: "' + nickname + '";'
          );
        } else if (best >= 101 && challenger < 101) {
          graph1.style.width = `106%`;
          graph1.style.animation = `p-999 3s`;
          graph1.style.maxHeight = "40px";
          graph2.style.width = `${challenger}%`;
          graph2.style.animation = `p-${challenger} 3s`;
          graph2.style.maxHeight = "40px";

          document.styleSheets[0].addRule(
            `li.item1::before`,
            'content: "' + record1 + '";'
          );

          document.styleSheets[0].addRule(
            `li.item2::before`,
            'content: "' + record2 + '";'
          );

          document.styleSheets[0].addRule(
            "li.item1::after",
            'content: "' + bestName + '";'
          );

          document.styleSheets[0].addRule(
            "li.item2::after",
            'content: "' + nickname + '";'
          );
        } else {
          graph1.style.width = `${best}%`;
          graph1.style.animation = `p-${best} 3s`;
          graph1.style.maxHeight = "40px";
          graph2.style.width = `${challenger}%`;
          graph2.style.animation = `p-${challenger} 3s`;
          graph2.style.maxHeight = "40px";

          document.styleSheets[0].addRule(
            `li.item1::before`,
            'content: "' + record1 + '";'
          );

          document.styleSheets[0].addRule(
            `li.item2::before`,
            'content: "' + record2 + '";'
          );

          document.styleSheets[0].addRule(
            "li.item1::after",
            'content: "' + bestName + '";'
          );

          document.styleSheets[0].addRule(
            "li.item2::after",
            'content: "' + nickname + '";'
          );
        }
      }
    }
  }

  remove() {
    const target = document.querySelector(".detail_body");

    target.innerHTML = "";
  }

  selectBtn() {
    document.querySelector("#myDropdown").classList.toggle("show");

    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        let dropdowns = document.querySelector(".dropdown-content");

        // console.log("=======", dropdowns.childNodes[0]);

        // for (let i = 0; i < dropdowns.childNodes.length; i++) {
        //   // let openDropdown = dropdowns.childNodes[i];

        //   console.log("123456789", dropdowns.childNodes[0]);

        // if (openDropdown.classList.contains("show")) {
        //   openDropdown.classList.remove("show");
        // }
        // }
      }
    };
  }

  print2 = (value) => (e) => {
    const items = [];
    const printRank = [];
    const selectValue = value;

    const myRank = [];
    const myItems = [];
    const nickname = window.localStorage.getItem("nick");

    this.setState({ init: value });

    // console.log("=====", value);

    if (selectValue) {
      axios
        .post("http://localhost:8080/ranking/print", {
          title: selectValue,
          name: nickname,
        })
        // .post("http://54.180.91.194:8080/ranking/print", {
        //   title: selectValue,
        // })
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });

          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].name === nickname) {
              this.setState({ myRanking: i + 1 });
            }
          }

          for (const [index, value] of printRank.entries()) {
            items.push(
              <tr className={`rank__${index}`}>
                <td className="rank__rank">{index + 1}</td>
                <td className="rank__name">{value.name}</td>
                <td className="rank__record">{value.average}타수</td>
                <td className="rank__time">{value.time}초</td>
              </tr>
            );
          }
          this.setState({ items: items });

          res.data.myRank.forEach((el) => {
            myRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          for (const [index, value] of myRank.entries()) {
            myItems.push(
              <tr>
                <td className="myRanking_rank">{this.state.myRanking}</td>
                <td className="myRanking_name">{value.name}</td>
                <td className="myRanking_record">{value.average}타수</td>
                <td className="myRanking_time">{value.time}초</td>
              </tr>
            );
          }
          if (myItems.length !== 0) {
            this.setState({ myItems: myItems });
          } else {
            myItems.push(
              <tr>
                <td className="myRanking_rank"></td>
                <td className="myRanking_name">{nickname}</td>
                <td className="myRanking_record">0타수</td>
                <td className="myRanking_time">0초</td>
              </tr>
            );
            this.setState({ myItems: myItems });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("에러");
    }

    document.querySelector(".dropdown-content").classList.remove("show");

    setTimeout(() => {
      this.detail();
    }, 500);
  };

  componentDidMount() {
    // this.print();
    this.init();
  }

  render() {
    const { items, myItems } = this.state;
    const nick = window.localStorage.getItem("nick");

    return (
      <div>
        <Nav />
        <div id="ranking">
          <div className="ranking____header____tail">
            {/* <div className="ranking_list"> */}
            <div className="ranking_list_table">
              <div className="select_wrapper">
                <div className="dropdown">
                  <button className="dropbtn" onClick={this.selectBtn}>
                    <span className="dropbtn_text">{this.state.init}</span>
                    <img className="dropbtn_img" src={arrow} alt="arrow" />
                  </button>
                  <div id="myDropdown" className="dropdown-content">
                    <span onClick={this.print2("눈 녹듯")}>눈 녹듯</span>
                    <span onClick={this.print2("말리꽃")}>말리꽃</span>
                    <span onClick={this.print2("오아시스")}>오아시스</span>
                  </div>
                </div>
              </div>

              {/* <div className="select_wrapper">
                <select
                  type="button"
                  className="select_start"
                  onChange={this.print}
                >
                  <option value="select_0" disabled>
                    선택
                  </option>
                  <option value="select_1">눈 녹듯</option>
                  <option value="select_2">말리꽃</option>
                  <option value="select-3">오아시스</option>
                </select>
              </div> */}

              {/* <div className="table__column">
                  <span className="column__rank">순위</span>
                  <span className="column__nick">닉네임</span>
                  <span className="column__record">기록</span>
                </div>
                <div className="rank">{items}</div> */}
              <div className="ranking_table_wrapper">
                <table className="ranking_table">
                  <thead>
                    <tr>
                      <th className="column__rank">순위</th>
                      <th className="column__nick">닉네임</th>
                      <th className="column__record">타수</th>
                      <th className="column__time">시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>Lorem</td>
                      <td>Ipsum</td>
                      <td>Dolor</td>
                    </tr> */}
                    {items}
                  </tbody>
                  {/* <div className="rank">{items}</div> */}
                </table>
              </div>

              <div className="ranking_table_myRanking">
                <table className="myRanking_table">
                  <tbody>
                    {/* <td className="myRanking_rank">3</td>
                      <td className="myRanking_name">테스트</td>
                      <td className="myRanking_record">617타수</td>
                      <td className="myRanking_time">4.9초</td> */}
                    {myItems}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
            {nick === null ? (
              <div className="ranking_tail">
                <div className="ranking_detail">
                  <div className="detail_header">
                    Guest님의 기록<br></br>기록을 등록하기 위해서는 로그인이
                    필요합니다
                  </div>
                  <div className="detail_body"></div>
                </div>
              </div>
            ) : (
              <div className="ranking_tail">
                <div className="ranking_detail">
                  <div className="detail_header">{nick}님의 기록</div>
                  <div className="detail_body"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
