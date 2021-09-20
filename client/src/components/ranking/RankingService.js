import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { printRanking } from "modules/ranking";

export const useRankingService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const [rank, setRank] = useState({ all: "", user: "" });
  const [record, setRecord] = useState({ best: "", user: "" });

  useEffect(() => {
    print("님의 손길");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const print = (value) => {
    const allRecord = []; // 전체 유저 기록
    const bestRecord = []; // 1등 유저 기록
    const userRecord = []; // 사용자 기록
    let userRank = 0;

    dispatch(printRanking({ title: value, name: nickname }))
      .then((res) => {
        res.payload.data.data.forEach((el) => {
          allRecord.push({
            name: el.name,
            average: el.average,
            time: el.time,
          });
        });

        bestRecord.push(
          res.payload.data.data[0].one,
          res.payload.data.data[0].two,
          res.payload.data.data[0].three,
          res.payload.data.data[0].four,
          res.payload.data.data[0].five,
          res.payload.data.data[0].six,
          res.payload.data.data[0].seven
        );

        console.log("nick", nickname);

        // 회원, 기록 있으면
        if (nickname && res.payload.data.myRank.length > 0) {
          userRecord.push({
            name: nickname,
            average: res.payload.data.myRank[0].average,
            time: res.payload.data.myRank[0].time,
          });
        }
        // 회원, 기록 X
        if (nickname && res.payload.data.myRank.length === 0) {
          userRecord.push({ name: nickname, average: 0, time: 0 });
        }
        // 비회원
        if (!nickname) {
          userRecord.push({ name: "Guest", average: 0, time: 0 });
        }

        // 유저 순위 체크
        for (let i = 0; i < res.payload.data.data.length; i++) {
          if (res.payload.data.data[i].name === nickname) {
            userRank = i + 1;
          }
        }

        setRank({ all: allRecord, user: userRecord });
        setRecord({ best: bestRecord, user: userRank });

        // // 전체
        // for (const [index, value] of printRank.entries()) {
        //   items.push(
        //     <tr key={index} onClick={clickRank}>
        //       <td>{index + 1}</td>
        //       <td>{value.name}</td>
        //       <td>{value.average}타수</td>
        //       <td>{value.time}초</td>
        //     </tr>
        //   );
        // }

        // res.payload.data.myRank.forEach((el) => {
        //   myRank.push({
        //     name: el.name,
        //     average: el.average,
        //     time: el.time,
        //   });
        // });

        // // 회원, 기록 O
        // if (myRank) {
        //   for (const ele of myRank) {
        //     loginUser.push(
        //       <tr key={ele.average}>
        //         <td>{userRank}</td>
        //         <td>{ele.name}</td>
        //         <td>{ele.average}타수</td>
        //         <td>{ele.time}초</td>
        //       </tr>
        //     );
        //   }
        // }

        // setRankData({ all: items, user: loginUser });
        // setToggle(false);
        // setTitle(value);
      })
      .catch((err) => {
        if (err) {
          alert("서버에 문제가 있습니다");
        }
      });
  };

  return { rank, record };
};
