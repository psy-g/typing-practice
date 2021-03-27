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
      bestRecordArray: [],
      myRecordArray: [],
      bestAverage: "",
      myAverage: "",
      bestName: "",
      myName: "",
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
    const best = [];
    const my = [];

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

        best.push(
          res.data.data[0].one,
          res.data.data[0].two,
          res.data.data[0].three,
          res.data.data[0].four,
          res.data.data[0].five,
          res.data.data[0].six,
          res.data.data[0].seven
        );

        this.setState({
          bestRecordArray: best,
          bestAverage: res.data.data[0].average,
          bestName: res.data.data[0].name,
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

        // console.log("======len======", items);

        res.data.myRank.forEach((el) => {
          myRank.push({
            name: el.name,
            average: el.average,
            time: el.time,
          });
        });

        // console.log("======len======", res.data.myRank);

        // if(res.data.myRanking.length > 0) {
        //   my.push(
        //     res.data.myRank[0].one,
        //     res.data.myRank[0].two,
        //     res.data.myRank[0].three,
        //     res.data.myRank[0].four,
        //     res.data.myRank[0].five,
        //     res.data.myRank[0].six,
        //     res.data.myRank[0].seven
        //   );

        //   this.setState({
        //     myRecordArray: my,
        //     myAverage: res.data.myRank[0].average,
        //     myName: res.data.myRank[0].name,
        //   });
        // }

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
              {!nickname ? (
                <td className="myRanking_name">Guest</td>
              ) : (
                <td className="myRanking_name">{nickname}</td>
              )}
              <td className="myRanking_record">0타수</td>
              <td className="myRanking_time">0초</td>
            </tr>
          );
          this.setState({ myItems: myItems });
        }
        // 유저 기록이 있으면
        if (res.data.myRank.length > 0) {
          my.push(
            res.data.myRank[0].one,
            res.data.myRank[0].two,
            res.data.myRank[0].three,
            res.data.myRank[0].four,
            res.data.myRank[0].five,
            res.data.myRank[0].six,
            res.data.myRank[0].seven
          );

          this.setState({
            myRecordArray: my,
            myAverage: res.data.myRank[0].average,
            myName: res.data.myRank[0].name,
          });
        }
      });

    // .catch((err) => {
    //   console.log(err.response);
    // });

    setTimeout(() => {
      this.detail();
    }, 500);
  }

  detail() {
    const test = document.querySelectorAll(".ranking_table");
    const nickname = window.localStorage.getItem("nick");

    // 1등, 로그인 유저 기록
    const {
      bestRecordArray,
      myRecordArray,
      bestAverage,
      myAverage,
      bestName,
    } = this.state;

    // 1등 기록, 이름
    // const bestRecord = document.querySelector(".rank__0 .rank__record")
    //   .innerHTML;
    // const bestName = document.querySelector(".rank__0 .rank__name").innerHTML;

    // 1등 타수
    // const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);
    const bestPercent = Math.floor((bestAverage / 750) * 100);

    // 1등, 유저 배열
    const bestArr = [];
    const myArr = [];

    for (let i = 0; i < bestRecordArray.length; i++) {
      bestArr.push(Math.floor((bestRecordArray[i] / 750) * 100));
    }

    for (let i = 0; i < myRecordArray.length; i++) {
      myArr.push(Math.floor((myRecordArray[i] / 750) * 100));
    }

    // 비회원
    if (nickname === null) {
      // const target = document.querySelector(".detail_body");
      const target = document.querySelector(".detail_body2");
      const guest = "Guest";

      target.innerHTML = "";

      const newDiv = document.createElement("div");

      newDiv.className = "graph-wrapper2";
      newDiv.innerHTML = `
        <div class="percent-indicator2">
          <div class="per-0"></div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <ul class="graph2">
          <li class="item2 p-20"></li>
          <li class="item1 p-${bestPercent}"></li>
        </ul>
        `;
      target.prepend(newDiv);

      // const graph1 = document.querySelector(".graph .item1");
      // const graph2 = document.querySelector(".graph .item2");
      const graph1 = document.querySelector(".graph2 .item1");
      const graph2 = document.querySelector(".graph2 .item2");

      if (bestPercent >= 101) {
        graph1.style.height = `100%`;
        graph1.style.animation = `p-999 3s`;
        graph2.style.height = `30%`;
        graph2.style.animation = `p-30 3s`;

        document.styleSheets[0].addRule(
          `li.item1::before`,
          'content: "' + bestAverage + '타수";'
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
        graph1.style.height = `${bestPercent}%`;
        graph1.style.animation = `p-${bestPercent} 3s`;
        graph2.style.height = `30%`;
        graph2.style.animation = `p-30 3s`;
        // graph2.style.maxHeight = "40px";

        // document.styleSheets[0].addRule(
        //   `li.item1::before`,
        //   'content: "' + record1 + '타수";'
        // );

        // document.styleSheets[0].addRule(
        //   `li.item2::before`,
        //   'content: "' + guest + '";'
        // );

        // document.styleSheets[0].addRule(
        //   "li.item1::after",
        //   'content: "' + bestName + '";'
        // );

        // document.styleSheets[0].addRule(
        //   "li.item2::after",
        //   'content: "' + guest + '";'
        // );
      }
    }
    // 회원
    else {
      const target = document.querySelector(".detail_body2");

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

        newDiv.className = "graph-wrapper2";
        newDiv.innerHTML = `
        <div class="percent-indicator2">
          <div class="per-0">
          </div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <div class="graph2_container">
        <ul class="graph2">    
        <span>
          <li class="item1 p-20"></li>
          <li class="item2 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item3 p-20"></li>
          <li class="item4 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item5 p-20"></li>
          <li class="item6 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item7 p-20"></li>
          <li class="item8 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item9 p-20"></li>
          <li class="item10 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item11 p-20"></li>
          <li class="item12 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item13 p-20"></li>
          <li class="item14 p-${bestPercent}"></li>
        </span>
        <span>
          <li class="item15 p-20"></li>
          <li class="item16 p-${bestPercent}"></li>
        </span>
        </ul>
        <ul class="graph2_problem_count">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>합계</span>
        </ul>
        `;
        target.prepend(newDiv);

        var noRecord = "기록x";

        for (let i = 0; i < bestArr.length; i++) {
          document.querySelector(
            `.graph2 .item${i * 2 + 1}`
          ).style.height = `20%`;
          document.querySelector(
            `.graph2 .item${i * 2 + 1}`
          ).style.animation = `p-20 3s`;

          document.styleSheets[0].addRule(
            `li.item${i * 2 + 1}::before`,
            'content: "' + noRecord + '";'
          );

          document.querySelector(
            `.graph2 .item${i * 2 + 2}`
          ).style.height = `${bestArr[i]}%`;
          document.querySelector(
            `.graph2 .item${i * 2 + 2}`
          ).style.animation = `p-${bestArr[i]} 3s`;

          document.styleSheets[0].addRule(
            `li.item${i * 2 + 2}::before`,
            'content: "' + bestRecordArray[i] + '";'
          );

          document.querySelector(".graph2 .item15").style.height = `20%`;
          document.querySelector(".graph2 .item15").style.animation = `p-20 5s`;
          document.querySelector(
            ".graph2 .item16"
          ).style.height = `${bestPercent}%`;
          document.querySelector(
            ".graph2 .item16"
          ).style.animation = `p-${bestPercent} 5s`;

          document.styleSheets[0].addRule(
            `li.item15::before`,
            'content: "' + noRecord + '";'
          );

          document.styleSheets[0].addRule(
            `li.item16::before`,
            'content: "' + bestAverage + '";'
          );
        }
      }
      // 로그인(기록 있음)
      else {
        // const best = Math.floor((bestRecord.split("타수")[0] / 750) * 100);
        // const challenger = Math.floor(
        //   (userRecord.split("타수")[0] / 750) * 100
        // );
        const myPercent = Math.floor((myAverage / 750) * 100);

        const newDiv = document.createElement("div");
        //

        newDiv.className = "graph-wrapper2";
        newDiv.innerHTML = `
        <div class="percent-indicator2">
          <div class="per-0">
          </div>
          <div class="per-20"></div>
          <div class="per-40"></div>
          <div class="per-60"></div>
          <div class="per-80"></div>
          <div class="per-100"></div>
        </div>
        <div class="graph2_container">
        <ul class="graph2">    
        <span>
          <li class="item1 p-${myAverage}"></li>
          <li class="item2 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item3 p-${myAverage}"></li>
          <li class="item4 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item5 p-${myAverage}"></li>
          <li class="item6 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item7 p-${myAverage}"></li>
          <li class="item8 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item9 p-${myAverage}"></li>
          <li class="item10 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item11 p-${myAverage}"></li>
          <li class="item12 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item13 p-${myAverage}"></li>
          <li class="item14 p-${bestAverage}"></li>
        </span>
        <span>
          <li class="item15 p-${myAverage}"></li>
          <li class="item16 p-${bestAverage}"></li>
        </span>
        </ul>
        <ul class="graph2_problem_count">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>합계</span>
        </ul>
        `;
        target.prepend(newDiv);

        // if (best >= 101 && challenger >= 101) {
        //   graph1.style.height = `100%`;
        //   graph1.style.animation = `p-999 3s`;
        //   graph2.style.height = `100%`;
        //   graph2.style.animation = `p-999 3s`;

        //   document.styleSheets[0].addRule(
        //     `li.item1::before`,
        //     'content: "' + record1 + '";'
        //   );

        //   document.styleSheets[0].addRule(
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
        // } else if (best >= 101 && challenger < 101) {
        //   graph1.style.height = `100%`;
        //   graph1.style.animation = `p-999 3s`;
        //   graph2.style.height = `${challenger}%`;
        //   graph2.style.animation = `p-${challenger} 3s`;

        //   graph3.style.height = `${challenger}%`;
        //   graph3.style.animation = `p-${challenger} 3s`;
        //   graph4.style.height = `100%`;
        //   graph4.style.animation = `p-999 3s`;

        //   graph5.style.height = `${challenger}%`;
        //   graph5.style.animation = `p-${challenger} 3s`;
        //   graph6.style.height = `100%`;
        //   graph6.style.animation = `p-999 3s`;

        //   graph7.style.height = `${challenger}%`;
        //   graph7.style.animation = `p-${challenger} 3s`;
        //   graph8.style.height = `100%`;
        //   graph8.style.animation = `p-999 3s`;

        //   graph9.style.height = `${challenger}%`;
        //   graph9.style.animation = `p-${challenger} 3s`;
        //   graph10.style.height = `100%`;
        //   graph10.style.animation = `p-999 3s`;

        //   graph11.style.height = `${challenger}%`;
        //   graph11.style.animation = `p-${challenger} 3s`;
        //   graph12.style.height = `100%`;
        //   graph12.style.animation = `p-999 3s`;

        //   graph13.style.height = `${challenger}%`;
        //   graph13.style.animation = `p-${challenger} 3s`;
        //   graph14.style.height = `100%`;
        //   graph14.style.animation = `p-999 3s`;

        //   graph15.style.height = `${challenger}%`;
        //   graph15.style.animation = `p-${challenger} 3s`;
        //   graph16.style.height = `100%`;
        //   graph16.style.animation = `p-999 3s`;

        //   // document.styleSheets[0].addRule(
        //   //   `li.item1::before`,
        //   //   'content: "' + record1 + '";'
        //   // );

        //   // document.styleSheets[0].addRule(
        //   //   `li.item2::before`,
        //   //   'content: "' + record2 + '";'
        //   // );

        //   // document.styleSheets[0].addRule(
        //   //   "li.item1::after",
        //   //   'content: "' + bestName + '";'
        //   // );

        //   // document.styleSheets[0].addRule(
        //   //   "li.item2::after",
        //   //   'content: "' + nickname + '";'
        //   // );
        // } else {

        for (let i = 0; i < bestArr.length; i++) {
          if (myArr[i] > 100) myArr[i] = 999;

          document.querySelector(
            `.graph2 .item${i * 2 + 1}`
          ).style.height = `${myArr[i]}%`;
          document.querySelector(
            `.graph2 .item${i * 2 + 1}`
          ).style.animation = `p-${myArr[i]} 3s`;

          document.styleSheets[0].addRule(
            `li.item${i * 2 + 1}::before`,
            'content: "' + myRecordArray[i] + '";'
          );
          if (bestArr[i] > 100) bestArr[i] = 999;

          document.querySelector(
            `.graph2 .item${i * 2 + 2}`
          ).style.height = `${bestArr[i]}%`;
          document.querySelector(
            `.graph2 .item${i * 2 + 2}`
          ).style.animation = `p-${bestArr[i]} 3s`;

          document.styleSheets[0].addRule(
            `li.item${i * 2 + 2}::before`,
            'content: "' + bestRecordArray[i] + '";'
          );
        }

        document.querySelector(
          ".graph2 .item15"
        ).style.height = `${myPercent}%`;
        document.querySelector(
          ".graph2 .item15"
        ).style.animation = `p-${myPercent} 5s`;
        document.querySelector(
          ".graph2 .item16"
        ).style.height = `${bestPercent}%`;
        document.querySelector(
          ".graph2 .item16"
        ).style.animation = `p-${bestPercent} 5s`;

        document.styleSheets[0].addRule(
          `li.item15::before`,
          'content: "' + myAverage + '";'
        );

        document.styleSheets[0].addRule(
          `li.item16::before`,
          'content: "' + bestAverage + '";'
        );

        // graph1.style.height = `${bestArr[0]}%`;
        // graph1.style.animation = `p-${bestArr[0]} 3s`;
        // graph2.style.height = `${myArr[0]}%`;
        // graph2.style.animation = `p-${myArr[0]} 3s`;

        // graph3.style.height = `${myArr[1]}%`;
        // graph3.style.animation = `p-${myArr[1]} 3s`;
        // graph4.style.height = `${bestArr[1]}%`;
        // graph4.style.animation = `p-${bestArr[1]} 3s`;

        // graph5.style.height = `${myArr[2]}%`;
        // graph5.style.animation = `p-${myArr[2]} 3s`;
        // graph6.style.height = `${bestArr[2]}%`;
        // graph6.style.animation = `p-${bestArr[2]} 3s`;

        // graph7.style.height = `${myArr[3]}%`;
        // graph7.style.animation = `p-${myArr[3]} 3s`;
        // graph8.style.height = `${bestArr[3]}%`;
        // graph8.style.animation = `p-${bestArr[3]} 3s`;

        // graph9.style.height = `${myArr[4]}%`;
        // graph9.style.animation = `p-${myArr[4]} 3s`;
        // graph10.style.height = `${bestArr[4]}%`;
        // graph10.style.animation = `p-${bestArr[4]} 3s`;

        // graph11.style.height = `${myArr[5]}%`;
        // graph11.style.animation = `p-${myArr[5]} 3s`;
        // graph12.style.height = `${bestArr[5]}%`;
        // graph12.style.animation = `p-${bestArr[5]} 3s`;

        // graph13.style.height = `${myArr[6]}%`;
        // graph13.style.animation = `p-${myArr[6]} 3s`;
        // graph14.style.height = `${bestArr[6]}%`;
        // graph14.style.animation = `p-${bestArr[6]} 3s`;

        // graph15.style.height = `${challenger}%`;
        // graph15.style.animation = `p-${challenger} 3s`;
        // graph16.style.height = `${best}%`;
        // graph16.style.animation = `p-${best} 3s`;

        // document.styleSheets[0].addRule(
        //   `li.item1::before`,
        //   'content: "' + record1 + '";'
        // );

        // document.styleSheets[0].addRule(
        //   `li.item2::before`,
        //   'content: "' + record2 + '";'
        // );

        // document.styleSheets[0].addRule(
        //   "li.item1::after",
        //   'content: "' + bestName + '";'
        // );

        // document.styleSheets[0].addRule(
        //   "li.item2::after",
        //   'content: "' + nickname + '";'
        // );
        // }
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
        // let dropdowns = document.querySelector(".dropdown-content");
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
    const best = [];
    const my = [];

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

          best.push(
            res.data.data[0].one,
            res.data.data[0].two,
            res.data.data[0].three,
            res.data.data[0].four,
            res.data.data[0].five,
            res.data.data[0].six,
            res.data.data[0].seven
          );

          this.setState({
            bestRecordArray: best,
            bestAverage: res.data.data[0].average,
            bestName: res.data.data[0].name,
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

          my.push(
            res.data.myRank[0].one,
            res.data.myRank[0].two,
            res.data.myRank[0].three,
            res.data.myRank[0].four,
            res.data.myRank[0].five,
            res.data.myRank[0].six,
            res.data.myRank[0].seven
          );

          this.setState({
            myRecordArray: my,
            myAverage: res.data.myRank[0].average,
            myName: res.data.myRank[0].name,
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
                {!nickname ? (
                  <td className="myRanking_name">Guest</td>
                ) : (
                  <td className="myRanking_name">{nickname}</td>
                )}
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
                <div className="ranking_detail2">
                  <div className="detail_body2_header">
                    <div className="detail_body2_header_top">
                      <div className="header_me_text">Guest&nbsp;&nbsp;</div>
                      <div className="header_me"></div>
                    </div>
                    <div className="detail_body2_header_bottom">
                      <div className="header_top1_text">1등&nbsp;&nbsp;</div>
                      <div className="header_top1"></div>
                    </div>
                  </div>
                  {/* <div className="detail_header">
                    Guest님의 기록<br></br>기록을 등록하기 위해서는 로그인이
                    필요합니다
                  </div> */}
                  {/* <div className="detail_body"></div> */}
                  <div className="detail_body2"></div>
                </div>
              </div>
            ) : (
              <div className="ranking_tail">
                {/* <div className="ranking_detail">
                  <div className="detail_header">{nick}님의 기록</div>
                  <div className="detail_body"></div>
                </div> */}
                <div className="ranking_detail2">
                  <div className="detail_body2_header">
                    <div className="detail_body2_header_top">
                      <div className="header_me_text">{nick}&nbsp;&nbsp;</div>
                      <div className="header_me"></div>
                    </div>
                    <div className="detail_body2_header_bottom">
                      <div className="header_top1_text">1등&nbsp;&nbsp;</div>
                      <div className="header_top1"></div>
                    </div>
                  </div>
                  {/* <div className="detail_header2">{nick}님의 기록</div> */}
                  <div className="detail_body2">
                    {/* <div className="graph-wrapper2">
                      <div className="percent-indicator2">
                        <div className="per-0"></div>
                        <div className="per-20"></div>
                        <div className="per-40"></div>
                        <div className="per-60"></div>
                        <div className="per-80"></div>
                        <div className="per-100"></div>
                      </div>
                      <ul className="graph2">
                        <li className="item1">오옹</li>
                        <li className="item2">히힝</li>
                      </ul>
                    </div> */}
                  </div>
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
