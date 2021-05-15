import React, { useState } from "react";
import Nav from "../components/Nav";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../modules/user";

const NavContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 유저 로그인 체크(회원, 비회원 메뉴 다르게 표시)
  const userState = useSelector((state) => state.user.isLogged);

  // 버거 체크(true: 열려있음, false: 안열려있음)
  const [burger, setBurger] = useState(false);

  // 버거 열기
  const openBurger = () => {
    setBurger(true);
  };

  // 버거 닫기
  const closeBurger = () => {
    setBurger(false);
  };

  // 메뉴 선택 - 버거 닫기
  const closeBurgerView = () => {
    setBurger(false);
  };

  // 로그아웃
  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <Nav
      userState={userState}
      burger={burger}
      openBurger={openBurger}
      closeBurger={closeBurger}
      closeBurgerView={closeBurgerView}
      logoutHandler={logoutHandler}
    />
  );
};

export default NavContainer;
