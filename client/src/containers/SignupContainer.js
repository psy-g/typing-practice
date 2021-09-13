import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Signup from "components/Signup";
import { signupUser } from "modules/user";

const SignupContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({ nickname: "", password: "" });
  const [checks, setChecks] = useState({ nickname: true, password: true });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 체크(닉네임 한글, 2~5글자 /비밀번호 4글자 이상)
  const hanAndPassCheck = (e) => {
    const { name, value } = e.target;
    // 완성형 한글
    const regexp = /^[가-힣]+$/;

    // 닉네임 체크
    if (name === "nickname") {
      for (let i = 0; i < value.length; i++) {
        if (
          !value.match(regexp) ||
          value[i].charCodeAt(0) < 128 ||
          value.length < 2 ||
          value.length > 6
        ) {
          setChecks({
            ...checks,
            [name]: false,
          });
          break;
        } else {
          setChecks({
            ...checks,
            [name]: true,
          });
        }
      }
    }

    // 비밀번호 체크
    if (name === "password") {
      if (value.length < 4) {
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
    }
  };

  // 회원가입 요청
  const signupRequestHandler = (e) => {
    e.preventDefault();

    // 닉네임, 비밀번호 유효성 모두 통과
    if (
      checks.nickname &&
      checks.password &&
      inputs.nickname.length > 0 &&
      inputs.password.length > 0
    ) {
      dispatch(signupUser(inputs)).then((res) => {
        if (res.payload.data.message === "signup") {
          history.push("/");
        } else if (res.payload.data.message === "already registered user") {
          alert("이미 등록된 닉네임입니다");
        }
      });
    } else {
      alert("다시 입력하여 주시기 바랍니다");
    }
  };

  return (
    <Signup
      inputHandler={inputHandler}
      signupRequestHandler={signupRequestHandler}
      checks={checks}
      hanAndPassCheck={hanAndPassCheck}
    />
  );
};

export default SignupContainer;
