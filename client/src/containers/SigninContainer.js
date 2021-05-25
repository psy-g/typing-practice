import React, { useState } from "react";
import Signin from "../components/Signin";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../modules/user";

const SigninContainer = () => {
  // const { nick, message } = useSelector((state) => state.user.data);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [checks, setChecks] = useState({ nickname: true, password: true });
  const [match, setMatch] = useState(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setMatch(true);

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validatorHandler = (e) => {
    const { name, value } = e.target;

    // 닉네임, 비밀번호 미입력
    if (value.length === 0) {
      setChecks({
        ...checks,
        [name]: false,
      });
    } else {
      setChecks({
        ...checks,
        [name]: true,
      });
    }
  };

  // 로그인 요청
  const loginRequestHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(inputs)).then((res) => {
      if (res.payload.data.loginSuccess) {
        window.localStorage.setItem("isLogged", true);
        window.localStorage.setItem("id", res.payload.data.id);
        window.localStorage.setItem("nick", res.payload.data.nick);
        history.push("/");
      } else {
        setMatch(false);
      }
    });
  };

  return (
    <Signin
      inputHandler={inputHandler}
      loginRequestHandler={loginRequestHandler}
      validatorHandler={validatorHandler}
      checks={checks}
      match={match}
    />
  );
};

export default SigninContainer;
