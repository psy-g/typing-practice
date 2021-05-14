import React, { useState } from "react";
import Nav from "../components/Nav";
import { useSelector, useDispatch } from "react-redux";

const NavContainer = () => {
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

  return (
    <Nav
      userState={userState}
      burger={burger}
      openBurger={openBurger}
      closeBurger={closeBurger}
    />
  );
};

export default NavContainer;
