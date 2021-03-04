import React, { Component } from "react";
import Nav from "./Nav";
import "./Ranking.css";
import axios from "axios";
// import { keyframes } from "styled-components";

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

    setTimeout(() => {
      this.detail();
    }, 500);
  }

  detail() {
    const test = document.querySelectorAll(".rank");
    const nickname = window.localStorage.getItem("nick");

    // 1등 기록, 이름
    const bestRecord = document.querySelector(".rank .rank__0 .rank__record")
      .innerHTML;
    const bestName = document.querySelector(".rank .rank__0 .rank__name")
      .innerHTML;

    // 1등 타수만
    const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);

    // 비회원
    if (nickname === null) {
      const target = document.querySelector(".detail_body");
      const guest = "Guest";

      target.innerHTML = "";

      // // 1등 기록, 이름
      // const bestRecord = document.querySelector(".rank .rank__0 .rank__record")
      //   .innerHTML;
      // const bestName = document.querySelector(".rank .rank__0 .rank__name")
      //   .innerHTML;

      // const best = Math.floor((bestRecord.substring(0, 3) / 750) * 100);

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

        // const record1 = bestRecord.substring(0, 3);

        document.styleSheets[0].addRule(
          `li.item1::before`,
          'content: "' + best + '타수";'
        );

        document.styleSheets[0].addRule(
          `li.item2::before`,
          // 'content: "' + 'Guest";',
          'content: "' + guest + '";'
        );

        document.styleSheets[0].addRule(
          "li.item1::after",
          'content: "' + bestName + '";'
        );

        document.styleSheets[0].addRule(
          "li.item2::after",
          'content: "' + guest + '";'
          // `content:  Guest `
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
          // `content:  Guest `
          // 'content: "' + "Guest" + '";'
        );

        document.styleSheets[0].addRule(
          "li.item1::after",
          'content: "' + bestName + '";'
        );

        document.styleSheets[0].addRule(
          "li.item2::after",
          'content: "' + guest + '";'
          // `content:  Guest `
          // 'content: "' + "Guest" + '";'
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

      // 1등 기록, 이름
      // const bestRecord = document.querySelector(".rank .rank__0 .rank__record")
      //   .innerHTML;
      // const bestName = document.querySelector(".rank .rank__0 .rank__name")
      //   .innerHTML;

      // 로그인(기록 없음)
      if (userRecord === undefined) {
        // const best = Math.floor((bestRecord.substring(0, 3) / 500) * 100);

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
            // `content: 기록이 없습니다 `
            // 'content: "' + "기록이 없습니다" + '";'
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
          // const record2 = userRecord.substring(0, 3);

          // var str1 = best;
          // var str2 = challenger;
          document.styleSheets[0].addRule(
            `li.p-${best}::before`,
            'content: "' + record1 + '타수";'
          );

          document.styleSheets[0].addRule(
            `li.p-20::before`,
            // `content: 기록이 없습니다 `
            'content: "' + noRecord1 + '";'
            // 'content: "' + "기록이 없습니다" + '";'
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

        // 2700타수 15초 or 250타수 30초

        // const best = Math.floor((bestRecord.substring(0, 3) / 500) * 100);
        // const challenger = Math.floor((userRecord.substring(0, 3) / 500) * 100);

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

          console.log("====1===", record1);
          console.log("====2===", record2);

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
        // if (best >= 101) {
        //   graph1.style.width = `106%`;
        //   graph1.style.animation = `p-999 3s`;
        // }
        // if (challenger >= 101) {
        //   graph2.style.width = `106%`;
        //   graph2.style.animation = `p-999 3s`;
        // } else {
        //   graph1.style.width = `${best}%`;
        //   graph1.style.animation = `p-${best} 3s`;
        //   graph2.style.width = `${challenger}%`;
        //   graph2.style.animation = `p-${challenger} 3s`;

        //   // const record1 = bestRecord.split(" ")[0];
        //   // const record2 = userRecord.split(" ")[0];

        //   console.log("====1===", record1);
        //   console.log("====2===", record2);

        //   document.styleSheets[0].addRule(
        //     // `li.p-${str1}::before`,
        //     `li.item1::before`,
        //     'content: "' + record1 + '";'
        //     // 'content: "' + record1 + '타수";'
        //   );

        //   document.styleSheets[0].addRule(
        //     // `li.p-${str2}::before`,
        //     `li.item2::before`,
        //     'content: "' + record2 + '";'
        //   );

        //   document.styleSheets[0].addRule(
        //     "li.item1::after",
        //     'content: "' + bestName + '";'
        //   );

        //   document.styleSheets[0].addRule(
        //     "li.item2::after",
        //     'content: "' + nickname + '";'
        //   );
        // }
      }
    }
  }

  remove() {
    const target = document.querySelector(".detail_body");

    target.innerHTML = "";
  }

  componentDidMount() {
    this.print();
  }

  render() {
    const { items } = this.state;
    const nick = window.localStorage.getItem("nick");
    // const id = window.localStorage.getItem("id");

    return (
      <div>
        <Nav />
        <div id="ranking">
          <div className="ranking____header____tail">
            <div className="ranking_list">
              <div className="ranking_list_table">
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
                <div className="table__column">
                  <span className="column__rank">순위</span>
                  <span className="column__nick">닉네임</span>
                  <span className="column__record">기록</span>
                </div>
                <div className="rank">{items}</div>
              </div>
            </div>
            {nick === null ? (
              <div className="ranking_tail">
                {/* <div className="ranking_detail_guest"> */}
                <div className="ranking_detail">
                  <div className="detail_header">
                    Guest님의 기록<br></br>기록을 등록하기 위해서는 로그인이
                    필요합니다
                  </div>
                  <div className="detail_body"></div>
                  {/* <div className="detail_body_guest">
                  기록을 등록하기 위해서는 로그인이 필요합니다
                </div> */}
                </div>
              </div>
            ) : (
              <div className="ranking_tail">
                <div className="ranking_detail">
                  <div className="detail_header">
                    {nick}님의 기록
                    {/* <div className="header_click" onClick={this.detail}>
                    클릭
                  </div>
                  <div className="header_click" onClick={this.remove}>
                    삭제
                  </div> */}
                  </div>
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

// {nick === null ? (
//   <div className="detail_body">
//     자세한 정보를 확인하기 위해서는 로그인이 필요합니다
//   </div>
// ) : (
//   <div className="detail_body"></div>
// )}

/* <div class="graph-wrapper">
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
  <li class="item3 p-60"></li>
  <li class="item4 p-35"></li>
  <li class="item5 p-15"></li>
</ul>
</div> */

// detail() {
//   const test = document.querySelectorAll(".rank");
//   const nickname = window.localStorage.getItem("nick");

//   if (nickname === null)
//     document.querySelector(".detail_body_guest").innerHTML =
//       "기록을 등록하기 위해서는 로그인이 필요합니다";
//   else {
//     const target = document.querySelector(".detail_body");

//     target.innerHTML = "";

//     let userRecord;
//     // 로그인 유저 기록
//     for (let i = 0; i < test.length; i++) {
//       for (
//         let j = 0;
//         j < test[i].querySelectorAll(".rank__name").length;
//         j++
//       ) {
//         if (
//           test[i].querySelectorAll(".rank__name")[j].innerHTML === nickname
//         ) {
//           userRecord = test[i]
//             .querySelectorAll(".rank__name")
//             [j].parentElement.querySelector(".rank__record").innerHTML;
//         }
//       }
//     }

//     // 1등 기록, 이름
//     const bestRecord = document.querySelector(".rank .rank__0 .rank__record")
//       .innerHTML;
//     const bestName = document.querySelector(".rank .rank__0 .rank__name")
//       .innerHTML;

//     // 기록이 없으면
//     if (userRecord === undefined) {
//       const best = Math.floor((bestRecord.substring(0, 3) / 500) * 100);

//       const newDiv = document.createElement("div");

//       newDiv.className = "graph-wrapper";
//       newDiv.innerHTML = `
//       <div class="percent-indicator">
//         <div class="per-0"></div>
//         <div class="per-20"></div>
//         <div class="per-40"></div>
//         <div class="per-60"></div>
//         <div class="per-80"></div>
//         <div class="per-100"></div>
//       </div>
//       <ul class="graph">
//         <li class="item1 p-${best}"></li>
//         <li class="item2 p-20"></li>
//       </ul>
//       `;
//       target.prepend(newDiv);

//       const graph1 = document.querySelector(".graph .item1");
//       const graph2 = document.querySelector(".graph .item2");

//       if (best >= 101) {
//         graph1.style.width = `106%`;
//         graph1.style.animation = `p-999 3s`;
//         graph2.style.width = `20%`;
//         graph2.style.animation = `p-20 3s`;

//         const record1 = bestRecord.substring(0, 3);

//         var str1 = best;

//         document.styleSheets[0].addRule(
//           `li.p-${str1}::before`,
//           'content: "' + record1 + '타수";'
//         );

//         document.styleSheets[0].addRule(
//           `li.p-20::before`,
//           'content: "' + "기록이 없습니다" + '";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item1::after",
//           'content: "' + bestName + '";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item2::after",
//           'content: "' + nickname + '";'
//         );
//       } else {
//         graph1.style.width = `${best}%`;
//         graph1.style.animation = `p-${best} 3s`;
//         graph2.style.width = `20%`;
//         graph2.style.animation = `p-20 3s`;

//         const record1 = bestRecord.substring(0, 3);
//         // const record2 = userRecord.substring(0, 3);

//         var str1 = best;
//         // var str2 = challenger;
//         document.styleSheets[0].addRule(
//           `li.p-${str1}::before`,
//           'content: "' + record1 + '타수";'
//         );

//         document.styleSheets[0].addRule(
//           `li.p-20::before`,
//           'content: "' + "기록이 없습니다" + '";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item1::after",
//           'content: "' + bestName + '";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item2::after",
//           'content: "' + nickname + '";'
//         );
//       }
//     } else {
//       const best = Math.floor((bestRecord.substring(0, 3) / 500) * 100);
//       const challenger = Math.floor((userRecord.substring(0, 3) / 500) * 100);

//       const newDiv = document.createElement("div");

//       newDiv.className = "graph-wrapper";
//       newDiv.innerHTML = `
//       <div class="percent-indicator">
//         <div class="per-0"></div>
//         <div class="per-20"></div>
//         <div class="per-40"></div>
//         <div class="per-60"></div>
//         <div class="per-80"></div>
//         <div class="per-100"></div>
//       </div>
//       <ul class="graph">
//         <li class="item1 p-${best}"></li>
//         <li class="item2 p-${challenger}"></li>
//       </ul>
//       `;
//       target.prepend(newDiv);

//       const graph1 = document.querySelector(".graph .item1");
//       const graph2 = document.querySelector(".graph .item2");

//       if (best >= 101) {
//         graph1.style.width = `106%`;
//         graph1.style.animation = `p-999 3s`;
//       }
//       if (challenger >= 101) {
//         graph2.style.width = `106%`;
//         graph2.style.animation = `p-999 3s`;
//       } else {
//         graph1.style.width = `${best}%`;
//         graph1.style.animation = `p-${best} 3s`;
//         graph2.style.width = `${challenger}%`;
//         graph2.style.animation = `p-${challenger} 3s`;

//         // console.log("========", document.styleSheets[0]);

//         const record1 = bestRecord.substring(0, 3);
//         const record2 = userRecord.substring(0, 3);

//         var str1 = best;
//         var str2 = challenger;
//         document.styleSheets[0].addRule(
//           `li.p-${str1}::before`,
//           'content: "' + record1 + '타수";'
//         );

//         document.styleSheets[0].addRule(
//           `li.p-${str2}::before`,
//           'content: "' + record2 + '타수";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item1::after",
//           'content: "' + bestName + '";'
//         );

//         document.styleSheets[0].addRule(
//           "li.item2::after",
//           'content: "' + nickname + '";'
//         );
//       }
//     }
//   }
// }
