import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { printRanking } from "modules/ranking";

export const useRankingService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const [record, setRecord] = useState({ best: "", user: "" });
  const [menuTitle, setMenuTitle] = useState("님의 손길");
  const [toggle, setToggle] = useState(true);
  const [rank, setRank] = useState({
    all: "",
    user: "",
    title: "",
    selectId: "",
  });

  useEffect(() => {
    printHandler("님의 손길");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const printHandler = (value) => {
    const allRecord = []; // 전체 유저 기록
    const bestRecord = []; // 1등 유저 기록
    const userRecord = []; // 사용자 기록(7번 기록)
    const userData = []; // 사용자 기록(이름, 타수, 시간)

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
          res.payload.data.data[0].seven,
          res.payload.data.data[0].average
        );

        // 회원, 기록 있으면
        if (nickname && res.payload.data.myRank.length > 0) {
          userData.push({
            name: nickname,
            average: res.payload.data.myRank[0].average,
            time: res.payload.data.myRank[0].time,
          });
          userRecord.push(
            res.payload.data.myRank[0].one,
            res.payload.data.myRank[0].two,
            res.payload.data.myRank[0].three,
            res.payload.data.myRank[0].four,
            res.payload.data.myRank[0].five,
            res.payload.data.myRank[0].six,
            res.payload.data.myRank[0].seven,
            res.payload.data.myRank[0].average
          );
        }
        // 회원, 기록 X
        if (nickname && res.payload.data.myRank.length === 0) {
          userData.push({ name: nickname, average: 0, time: 0 });
        }
        // 비회원
        if (!nickname) {
          userData.push({ name: "Guest", average: 0, time: 0 });
        }

        // 유저 순위 체크
        // for (let i = 0; i < res.payload.data.data.length; i++) {
        //   if (res.payload.data.data[i].name === nickname) {
        //     userRank = i + 1;
        //   }
        // }

        setRank({
          all: allRecord,
          user: userData,
          title: value,
          selectId: allRecord[0].name,
        });
        setRecord({ best: bestRecord, user: userRecord });
        setMenuTitle(value);
        selectHandler();
      })
      .catch((err) => {
        if (err) {
          alert("서버에 문제가 있습니다");
        }
      });
  };

  const selectHandler = () => {
    setToggle(!toggle);
  };

  const rankerChangeHandler = (select) => {
    const bestRecord = [];

    dispatch(printRanking({ title: rank.title, name: select.name }))
      .then((res) => {
        bestRecord.push(
          res.payload.data.myRank[0].one,
          res.payload.data.myRank[0].two,
          res.payload.data.myRank[0].three,
          res.payload.data.myRank[0].four,
          res.payload.data.myRank[0].five,
          res.payload.data.myRank[0].six,
          res.payload.data.myRank[0].seven,
          res.payload.data.myRank[0].average
        );

        setRank({ ...rank, selectId: select.name });
        setRecord({ ...record, best: bestRecord });
      })
      .catch((err) => {
        if (err) {
          alert("서버에 문제가 있습니다");
        }
      });
  };

  return {
    rank,
    record,
    toggle,
    menuTitle,
    printHandler,
    selectHandler,
    rankerChangeHandler,
  };
};
