import React, { useState } from "react";
import Signin from "../components/Signin";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../modules/user";

const SigninContainer = () => {
  // const { nick, msg, error } = useSelector((state) => state.user);
  const message = useSelector((state) => state.user.data.message);
  const history = useHistory();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 요청
  const loginRequestHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser({ nickname, password })).then((res) => {
      if (res.payload.data.message === "signin OK") {
        // console.log("=msg=", message);
        window.localStorage.setItem("isLogged", true);
        history.push("/");
      } else {
        // console.log("====", message);
      }
    });
  };

  return (
    <Signin
      nicknameHandler={nicknameHandler}
      passwordHandler={passwordHandler}
      loginRequestHandler={loginRequestHandler}
    />
  );
};

export default SigninContainer;
