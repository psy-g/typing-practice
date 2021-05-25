import React, { useEffect, useState, useRef } from "react";
import Ranking from "../components/Ranking";
import { printRanking } from "../modules/ranking";
import { useDispatch } from "react-redux";

const RankingContainer = () => {
  const dispatch = useDispatch();
  //   const nick = useSelector((state) => state.user.data.nick);
  const nickname = window.localStorage.getItem("nick");
  const [best, setBest] = useState({ arr: [], name: "", average: "" });
  const [users, setUsers] = useState({ arr: [] });
  const [element, setElement] = useState({ all: "", user: "" });
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");

  const graphTarget = useRef();
  const tableBody = useRef();
  const dropMenu = useRef();
  const titleName = useRef();
  const top1 = useRef();

  const mouseTable = useRef();
  const bubble1 = useRef();
  const bubble2 = useRef();
  const triangle = useRef();

  const best_array = useRef([]);
  const best_average = useRef();
  const my_array = useRef([]);
  const my_average = useRef();

  useEffect(() => {
    print("님의 손길");
    printArrow();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const print = (value) => {
    const printRank = []; // 전체 유저 기록
    const best = []; // 1등 유저 기록
    const my = []; // 사용자 기록
    const items = [];
    const myRank = [];
    const loginUser = [];
    let myRanking = 0;

    top1.current.innerHTML = `#1&nbsp;&nbsp;`;

    dispatch(printRanking({ title: value, name: nickname }))
      .then((res) => {
        // console.log("res", res.payload.data.data);
        res.payload.data.data.forEach((el) => {
          printRank.push({
            name: el.name,
            average: el.average,
            time: el.time,
          });
        });

        best.push(
          res.payload.data.data[0].one,
          res.payload.data.data[0].two,
          res.payload.data.data[0].three,
          res.payload.data.data[0].four,
          res.payload.data.data[0].five,
          res.payload.data.data[0].six,
          res.payload.data.data[0].seven
        );

        // 회원, 기록 있으면
        if (nickname && res.payload.data.myRank.length > 0) {
          my.push(
            res.payload.data.myRank[0].one,
            res.payload.data.myRank[0].two,
            res.payload.data.myRank[0].three,
            res.payload.data.myRank[0].four,
            res.payload.data.myRank[0].five,
            res.payload.data.myRank[0].six,
            res.payload.data.myRank[0].seven
          );

          my_average.current = res.payload.data.myRank[0].average;
          my_array.current = my;
        }
        // 회원, 기록 X
        if (nickname && res.payload.data.myRank.length === 0) {
          let temp = { name: nickname, average: 0, time: 0 };

          myRank.push(temp);
        }

        best_array.current = best;
        best_average.current = res.payload.data.data[0].average;

        // 유저 순위 체크
        for (let i = 0; i < res.payload.data.data.length; i++) {
          if (res.payload.data.data[i].name === nickname) {
            // setMyRanking(i + 1);
            myRanking = i + 1;
          }
        }

        setBest({
          arr: best,
          name: res.payload.data.data[0].name,
          average: res.payload.data.data[0].average,
        });

        setUsers({ arr: printRank });

        // 전체
        for (const [index, value] of printRank.entries()) {
          items.push(
            // <tr className={`rank__${index}`} onClick={this.clickRank}>
            <tr key={index} onClick={clickRank}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.average}타수</td>
              <td>{value.time}초</td>
            </tr>
          );
        }

        res.payload.data.myRank.forEach((el) => {
          myRank.push({
            name: el.name,
            average: el.average,
            time: el.time,
          });
        });

        // 회원, 기록 O
        if (myRank) {
          for (const ele of myRank) {
            //   for (const [index, value] of myRank.entries()) {
            loginUser.push(
              <tr key={ele.average}>
                <td>{myRanking}</td>
                <td>{ele.name}</td>
                <td>{ele.average}타수</td>
                <td>{ele.time}초</td>
              </tr>
            );
          }
        }

        setElement({ all: items, user: loginUser });
        setToggle(false);
        setTitle(value);
      })
      .catch((err) => {
        if (err) {
          alert("서버에 문제가 있습니다");
        }
      });

    setTimeout(() => {
      detail();
    }, 1000);
  };

  // 그래프
  const detail = () => {
    // best_array.current
    // best_average.current
    // my_array.current
    // my_average.current

    // 1등 타수
    const bestPercent = Math.floor((best_average.current / 750) * 100);

    // 1등, 유저 배열
    const bestArr = [];
    const myArr = [];
    var noRecord = "x";
    var noRecord2 = "기록x";

    for (let i = 0; i < best_array.current.length; i++) {
      bestArr.push(Math.floor((best_array.current[i] / 750) * 100));
    }

    for (let i = 0; i < my_array.current.length; i++) {
      myArr.push(Math.floor((my_array.current[i] / 750) * 100));
    }

    // 비회원
    if (nickname === null) {
      //   const target = document.querySelector(".detail_body2");
      //   const target = graphTarget.current;

      //   target.innerHTML = ""
      graphTarget.current.innerHTML = "";

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
      //   target.prepend(newDiv);
      graphTarget.current.prepend(newDiv);

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
          'content: "' + best_array.current[i] + '";'
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
        'content: "' + best_average.current + '";'
      );
    }
    // 회원
    else {
      //   const target = document.querySelector(".detail_body2");

      //   target.innerHTML = "";
      graphTarget.current.innerHTML = "";

      // 로그인(기록 없음)
      if (my_array.current.length === 0) {
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
        // target.prepend(newDiv);
        graphTarget.current.prepend(newDiv);

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
            'content: "' + best_array.current[i] + '";'
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
          'content: "' + best_average.current + '";'
        );
      }
      // 로그인(기록 있음)
      else {
        const myPercent = Math.floor((my_average.current / 750) * 100);
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
        // target.prepend(newDiv);
        graphTarget.current.prepend(newDiv);

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
            'content: "' + my_array.current[i] + '";'
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
            'content: "' + best_array.current[i] + '";'
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
          'content: "' + my_average.current + '";'
        );

        document.styleSheets[0].addRule(
          `li.item16::before`,
          'content: "' + best_average.current + '";'
        );
      }
    }
  };

  // 클릭 상세 기록
  const clickRank = () => {
    const clickRecord = [];
    const clickArray = [];

    tableBody.current.onclick = function (event) {
      //   console.log("=dropMenu", titleName.current.innerHTML);
      //   console.log("clickName", event.target.parentNode.children[1].innerHTML);

      let clickName = event.target.parentNode.children[1].innerHTML;
      let clickTitle = titleName.current.innerHTML;

      dispatch(printRanking({ title: clickTitle, name: clickName }))
        .then((res) => {
          clickArray.push(
            res.payload.data.myRank[0].one,
            res.payload.data.myRank[0].two,
            res.payload.data.myRank[0].three,
            res.payload.data.myRank[0].four,
            res.payload.data.myRank[0].five,
            res.payload.data.myRank[0].six,
            res.payload.data.myRank[0].seven
          );

          clickRecord.push(
            res.payload.data.myRank[0].name,
            res.payload.data.myRank[0].average
          );

          const percentArr = [];
          const clickPercent = Math.floor((clickRecord[1] / 750) * 100);

          top1.current.innerHTML = `${clickRecord[0]}&nbsp;&nbsp;`;

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
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  // 마우스 오버
  const printArrow = () => {
    // 비회원
    if (!nickname) {
      mouseTable.current.onmouseover = function (event) {
        bubble1.current.style.display = "block";
        triangle.current.style.display = "block";
      };
    }

    // 회원(기록 없음)
    // if (nickname && my_average.current.length === 0) {
    //   mouseTable.current.onmouseover = function (event) {
    //     bubble2.current.style.display = "block";
    //     triangle.current.style.display = "block";
    //   };
    // }

    mouseTable.current.onmouseout = function (event) {
      bubble1.current.style.display = "none";
      bubble2.current.style.display = "none";
      triangle.current.style.display = "none";
    };
  };

  const selectBtn = () => {
    // dropMenu.current.classList.toggle("show");
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <Ranking
      nick={nickname}
      users={users}
      best={best}
      title={title}
      element={element}
      print={print}
      selectBtn={selectBtn}
      graphTarget={graphTarget}
      dropMenu={dropMenu}
      toggle={toggle}
      tableBody={tableBody}
      titleName={titleName}
      top1={top1}
      mouseTable={mouseTable}
      bubble1={bubble1}
      bubble2={bubble2}
      triangle={triangle}
    />
  );
};

export default RankingContainer;
