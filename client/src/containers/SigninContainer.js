import React, { useState } from "react";
import Signin from "../components/Signin";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../modules/user";

const SigninContainer = () => {
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
      if (res.payload.message === "signin OK") {
        history.push("/");
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
