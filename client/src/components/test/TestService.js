import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { requestRandom } from "modules/test";
import { registerRanking, printRanking } from "modules/ranking";

import { ProblemInfo } from "constant";

export const useTestService = () => {
  const dispatch = useDispatch();
  const nickname = window.localStorage.getItem("nick");
  const textareaInput = useRef();

  const [toggle, setToggle] = useState(false);
  const [proceeding, setProceeding] = useState({
    accuracy: "",
    problem: "",
    count: 0,
    speed: "",
    time: 0,
    title: ProblemInfo.NO1,
    recordArr: [],
    recordTime: "",
  });

  const selectHandler = () => {
    setToggle(!toggle);
  };

  const requestProblemHandler = () => {};

  return { proceeding, toggle, selectHandler };
};
