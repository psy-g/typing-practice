import React, { Component } from "react";
import Nav from "./Nav";
import "./Ranking.css";
import axios from "axios";
import arrow from "../image/arrow2.png";
// import $ from "jquery";

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
        // .post("http://localhost:8080/ranking/print", {
        //   title: selectValue,
        // })
        .post("http://54.180.91.194:8080/ranking/print", {
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
    const loginUser = [];
    const nickname = window.localStorage.getItem("nick");
    const best = [];
    const my = [];

    axios
      // .post("http://localhost:8080/ranking/print", {
      //   title: "눈 녹듯",
      //   name: nickname,
      // })
      .post("http://54.180.91.194:8080/ranking/print", {
        title: "눈 녹듯",
        name: nickname,
      })
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
            <tr className={`rank__${index}`} onClick={this.clickRank}>
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

        // for (const [index, value] of myRank.entries()) {
        //   myItems.push(
        //     <tr>
        //       <td className="myRanking_rank">{this.state.myRanking}</td>
        //       <td className="myRanking_name">{value.name}</td>
        //       <td className="myRanking_record">{value.average}타수</td>
        //       <td className="myRanking_time">{value.time}초</td>
        //     </tr>
        //   );
        // }
        for (const ele of myRank) {
          loginUser.push(
            <tr>
              <td className="myRanking_rank">{this.state.myRanking}</td>
              <td className="myRanking_name">{ele.name}</td>
              <td className="myRanking_record">{ele.average}타수</td>
              <td className="myRanking_time">{ele.time}초</td>
            </tr>
          );
        }

        if (loginUser.length !== 0) {
          this.setState({ myItems: loginUser });
        } else {
          {
            !nickname
              ? loginUser.push(
                  <tr className="myRanking_hover">
                    <td className="myRanking_rank"></td>
                    <td className="myRanking_name">Guest</td>
                    <td className="myRanking_record">0타수</td>
                    <td className="myRanking_time">0초</td>
                  </tr>
                )
              : loginUser.push(
                  <tr className="myRanking_hover2">
                    <td className="myRanking_rank"></td>
                    <td className="myRanking_name">{nickname}</td>
                    <td className="myRanking_record">0타수</td>
                    <td className="myRanking_time">0초</td>
                  </tr>
                );
          }

          this.setState({ myItems: loginUser });
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
    // const test = document.querySelectorAll(".ranking_table");
    const nickname = window.localStorage.getItem("nick");

    // 1등, 로그인 유저 기록
    const {
      bestRecordArray,
      myRecordArray,
      bestAverage,
      myAverage,
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
    var noRecord = "x";
    var noRecord2 = "기록x";

    for (let i = 0; i < bestRecordArray.length; i++) {
      bestArr.push(Math.floor((bestRecordArray[i] / 750) * 100));
    }

    for (let i = 0; i < myRecordArray.length; i++) {
      myArr.push(Math.floor((myRecordArray[i] / 750) * 100));
    }

    // 비회원
    if (nickname === null) {
      const target = document.querySelector(".detail_body2");

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
        <div class="graph2_container">
          <ul class="graph2">    
        <span>
          <li class="item1"></li>
          <li class="item2"></li>
        </span>
        <span>
          <li class="item3"></li>
          <li class="item4"></li>
        </span>
        <span>
          <li class="item5"></li>
          <li class="item6"></li>
        </span>
        <span>
          <li class="item7"></li>
          <li class="item8"></li>
        </span>
        <span>
          <li class="item9"></li>
          <li class="item10"></li>
        </span>
        <span>
          <li class="item11"></li>
          <li class="item12"></li>
        </span>
        <span>
          <li class="item13"></li>
          <li class="item14"></li>
        </span>
        <span>
          <li class="item15"></li>
          <li class="item16"></li>
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

      // var noRecord = "x";
      // var noRecord2 = "기록x";

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
      // console.log("=============", bestPercent);

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
        'content: "' + noRecord2 + '";'
      );

      document.styleSheets[0].addRule(
        `li.item16::before`,
        'content: "' + bestAverage + '";'
      );
    }
    // 회원
    else {
      const target = document.querySelector(".detail_body2");

      target.innerHTML = "";

      // let userRecord;
      // // 로그인 유저 기록
      // for (let i = 0; i < test.length; i++) {
      //   for (
      //     let j = 0;
      //     j < test[i].querySelectorAll(".rank__name").length;
      //     j++
      //   ) {
      //     if (
      //       test[i].querySelectorAll(".rank__name")[j].innerHTML === nickname
      //     ) {
      //       userRecord = test[i]
      //         .querySelectorAll(".rank__name")
      //         [j].parentElement.querySelector(".rank__record").innerHTML;
      //     }
      //   }
      // }

      // console.log("=============", myRecordArray.length);

      // 로그인(기록 없음)
      if (myRecordArray.length === 0) {
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
        <div class="graph2_container">
          <ul class="graph2">    
        <span>
          <li class="item1"></li>
          <li class="item2"></li>
        </span>
        <span>
          <li class="item3"></li>
          <li class="item4"></li>
        </span>
        <span>
          <li class="item5"></li>
          <li class="item6"></li>
        </span>
        <span>
          <li class="item7"></li>
          <li class="item8"></li>
        </span>
        <span>
          <li class="item9"></li>
          <li class="item10"></li>
        </span>
        <span>
          <li class="item11"></li>
          <li class="item12"></li>
        </span>
        <span>
          <li class="item13"></li>
          <li class="item14"></li>
        </span>
        <span>
          <li class="item15"></li>
          <li class="item16"></li>
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

        // var noRecord = "x";
        // var noRecord2 = "기록x";

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
          'content: "' + noRecord2 + '";'
        );

        document.styleSheets[0].addRule(
          `li.item16::before`,
          'content: "' + bestAverage + '";'
        );
      }
      // 로그인(기록 있음)
      else {
        const myPercent = Math.floor((myAverage / 750) * 100);
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
        <div class="graph2_container">
          <ul class="graph2">    
        <span>
          <li class="item1"></li>
          <li class="item2"></li>
        </span>
        <span>
          <li class="item3"></li>
          <li class="item4"></li>
        </span>
        <span>
          <li class="item5"></li>
          <li class="item6"></li>
        </span>
        <span>
          <li class="item7"></li>
          <li class="item8"></li>
        </span>
        <span>
          <li class="item9"></li>
          <li class="item10"></li>
        </span>
        <span>
          <li class="item11"></li>
          <li class="item12"></li>
        </span>
        <span>
          <li class="item13"></li>
          <li class="item14"></li>
        </span>
        <span>
          <li class="item15"></li>
          <li class="item16"></li>
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
    const loginUser = [];
    const printRank = [];
    const selectValue = value;

    const myRank = [];

    const nickname = window.localStorage.getItem("nick");

    this.setState({ init: value });

    document.querySelector(".header_top1_text").innerHTML = `1등&nbsp;&nbsp;`;

    if (selectValue) {
      axios
        // .post("http://localhost:8080/ranking/print", {
        //   title: selectValue,
        //   name: nickname,
        // })
        .post("http://54.180.91.194:8080/ranking/print", {
          title: selectValue,
          name: nickname,
        })
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
              <tr className={`rank__${index}`} onClick={this.clickRank}>
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

          for (const ele of myRank) {
            loginUser.push(
              <tr>
                <td className="myRanking_rank">{this.state.myRanking}</td>
                <td className="myRanking_name">{ele.name}</td>
                <td className="myRanking_record">{ele.average}타수</td>
                <td className="myRanking_time">{ele.time}초</td>
              </tr>
            );
          }

          if (loginUser.length !== 0) {
            this.setState({ myItems: loginUser });
          } else {
            {
              !nickname
                ? loginUser.push(
                    <tr className="myRanking_hover">
                      <td className="myRanking_rank"></td>
                      <td className="myRanking_name">Guest</td>
                      <td className="myRanking_record">0타수</td>
                      <td className="myRanking_time">0초</td>
                    </tr>
                  )
                : loginUser.push(
                    <tr className="myRanking_hover2">
                      <td className="myRanking_rank"></td>
                      <td className="myRanking_name">{nickname}</td>
                      <td className="myRanking_record">0타수</td>
                      <td className="myRanking_time">0초</td>
                    </tr>
                  );
            }

            // loginUser.push(
            //   <tr className="myRanking_hover2">
            //     <td className="myRanking_rank"></td>
            //     {!nickname ? (
            //       <td className="myRanking_name">Guest</td>
            //     ) : (
            //       <td className="myRanking_name">{nickname}</td>
            //     )}
            //     <td className="myRanking_record">0타수</td>
            //     <td className="myRanking_time">0초</td>
            //   </tr>
            // );
            this.setState({ myItems: loginUser });
          }

          // console.log("=============");

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
          // 유저 기록 없으면
          else {
            this.setState({ myRecordArray: my, myAverage: "", myName: "" });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("에러");
    }

    // console.log("=============", this.state.myRecordArray);

    document.querySelector(".dropdown-content").classList.remove("show");

    setTimeout(() => {
      this.detail();
    }, 500);
  };

  clickRank() {
    const clickRecord = [];
    const clickArray = [];

    window.onclick = function (event) {
      if (event.target.closest(".ranking_table_body")) {
        let clickName = event.target.parentNode.children[1].innerHTML;
        let clickTitle = document.querySelector(".dropbtn_text").innerHTML;

        // console.log("check", document.querySelector(".dropbtn_text").innerHTML);
        // console.log(event.target.parentNode.children);

        // event.target.parentElement.style.backgroundColor = "#2a1a1a";
        // event.target.parentElement.style.all = "unset";

        axios
          // .post("http://localhost:8080/ranking/print", {
          //   title: clickTitle,
          //   name: clickName,
          // })
          .post("http://54.180.91.194:8080/ranking/print", {
            title: clickTitle,
            name: clickName,
          })
          .then((res) => {
            // res.data.myRank.forEach((el) => {
            //   clickRecord.push({
            //     name: el.name,
            //     average: el.average,
            //     time: el.time,
            //   });
            // });

            clickArray.push(
              res.data.myRank[0].one,
              res.data.myRank[0].two,
              res.data.myRank[0].three,
              res.data.myRank[0].four,
              res.data.myRank[0].five,
              res.data.myRank[0].six,
              res.data.myRank[0].seven
            );

            clickRecord.push(
              res.data.myRank[0].name,
              res.data.myRank[0].average
            );

            const percentArr = [];
            const clickPercent = Math.floor((clickRecord[1] / 750) * 100);

            document.querySelector(
              ".header_top1_text"
            ).innerHTML = `${clickRecord[0]}&nbsp;&nbsp;`;

            for (let i = 0; i < clickArray.length; i++) {
              percentArr.push(Math.floor((clickArray[i] / 750) * 100));
            }

            for (let i = 0; i < percentArr.length; i++) {
              if (percentArr[i] > 100) percentArr[i] = 999;

              document.querySelector(
                `.graph2 .item${i * 2 + 2}`
              ).style.height = `${percentArr[i]}%`;
              document.querySelector(
                `.graph2 .item${i * 2 + 2}`
              ).style.animation = `p-${percentArr[i]} 3s`;

              document.styleSheets[0].addRule(
                `li.item${i * 2 + 2}::before`,
                'content: "' + clickArray[i] + '";'
              );
            }

            document.querySelector(
              ".graph2 .item16"
            ).style.height = `${clickPercent}%`;
            document.querySelector(
              ".graph2 .item16"
            ).style.animation = `p-${clickPercent} 5s`;

            document.styleSheets[0].addRule(
              `li.item16::before`,
              'content: "' + clickRecord[1] + '";'
            );
            // jquery
            // $("ul.graph2 span li.item2").replaceWith(
            //   `<li class="item2 p-${percentArr[0]}"></li>`
            // );
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    };
  }

  printArrow() {
    window.onmouseover = function (event) {
      if (event.target.closest(".myRanking_hover")) {
        document.querySelector(".myRanking_table_arrow").style.display =
          "block";
        document.querySelector(".myRanking_table_triangle").style.display =
          "inline-block";
      }

      if (event.target.closest(".myRanking_hover2")) {
        document.querySelector(".myRanking_table_arrow2").style.display =
          "block";
        document.querySelector(".myRanking_table_triangle").style.display =
          "inline-block";
      }
    };

    window.onmouseout = function (event) {
      if (event.target.closest(".myRanking_hover")) {
        document.querySelector(".myRanking_table_arrow").style.display = "none";
        document.querySelector(".myRanking_table_triangle").style.display =
          "none";
      }

      if (event.target.closest(".myRanking_hover2")) {
        document.querySelector(".myRanking_table_arrow2").style.display =
          "none";
        document.querySelector(".myRanking_table_triangle").style.display =
          "none";
      }
    };
  }

  componentDidMount() {
    // this.print();
    this.init();
    this.printArrow();
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
                  <tbody className="ranking_table_body">{items}</tbody>
                </table>
              </div>

              <div className="ranking_table_myRanking">
                <div className="myRanking_table_arrow">
                  기록을 등록하기 위해서는 로그인이 필요합니다{" "}
                </div>
                <div className="myRanking_table_arrow2">기록이 없습니다 </div>
                <div className="myRanking_table_triangle"></div>
                <table className="myRanking_table">
                  <tbody>{myItems}</tbody>
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
