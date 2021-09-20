import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { logoutUser } from "modules/user";
import NavFooter from "components/nav/NavFooter";

const NavMenu = ({ isLogged }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);

  const menuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    setOpenMenu(false);
    history.push("/");
  };

  return (
    <MenuBlock>
      {!openMenu ? (
        <MenuIcon onClick={menuHandler}>&#9776;</MenuIcon>
      ) : (
        <BurgerContainer>
          <BurgerContainerHeader>
            <CloseBurgerBtn onClick={menuHandler}>&times;&nbsp;</CloseBurgerBtn>
          </BurgerContainerHeader>
          <MenuTop>
            <MenuTopContent>
              <LinkIcon exact to="/" onClick={menuHandler}>
                🏠
              </LinkIcon>
              <LinkName exact to="/" onClick={menuHandler}>
                홈
              </LinkName>
            </MenuTopContent>
          </MenuTop>
          <MenuBottom>
            <MenuBottomContent>
              <MenuBottomContent1>
                {isLogged ? (
                  <>
                    <LogoutIcon onClick={logoutHandler}>👋</LogoutIcon>
                    <LogoutName onClick={logoutHandler}>로그아웃</LogoutName>
                  </>
                ) : (
                  <>
                    <LinkIcon exact to="/signin" onClick={menuHandler}>
                      🖥
                    </LinkIcon>
                    <LinkName exact to="/signin" onClick={menuHandler}>
                      로그인
                    </LinkName>
                  </>
                )}
              </MenuBottomContent1>
              <MenuBottomContent1>
                <LinkIcon exact to="/ranking" onClick={menuHandler}>
                  🏆
                </LinkIcon>
                <LinkName exact to="/ranking" onClick={menuHandler}>
                  순위
                </LinkName>
              </MenuBottomContent1>
              <MenuBottomContent1>
                <LinkIcon exact to="/test" onClick={menuHandler}>
                  ⌨
                </LinkIcon>
                <LinkName exact to="/test" onClick={menuHandler}>
                  타자연습
                </LinkName>
              </MenuBottomContent1>
            </MenuBottomContent>
          </MenuBottom>
          <NavFooter />
        </BurgerContainer>
      )}
    </MenuBlock>
  );
};

export default NavMenu;

const MenuBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 2rem;
  color: white;
  margin-right: 15px;
`;

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0px;
  width: 150px;
  height: 300px;
  position: relative;
  box-sizing: border-box;
  padding: 27px 0px 20px 20px;
  border-radius: 10px;
  z-index: 5;

  @media all and (max-width: 767px) {
    position: fixed;
    z-index: 10;
    top: -20px;
    width: 100%;
    height: 150%;
    background-color: #30a9de;
  }
`;

const BurgerContainerHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 50px;
`;

const CloseBurgerBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 46px;
  cursor: pointer;
  background: white;
  width: 47px;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

const MenuTop = styled.div`
  padding-top: 20px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MenuBottom = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: white;
  height: 180px;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);

  @media all and (max-width: 767px) {
    height: 150px;
  }
`;

const activeClassName = "nav-active";

const LinkIcon = styled(NavLink)`
  padding-left: 15px;
`;

const LinkName = styled(NavLink).attrs({ activeClassName })`
  &.${activeClassName} {
    color: #ff5252;
  }
  padding-left: 10px;
  font-size: 1rem;
  color: black;

  &:hover {
    color: #ff5252;
  }
`;

const MenuTopContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

const MenuBottomContent = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  background: white;
  border-radius: 10px 0px 0px 10px;
`;

const MenuBottomContent1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 10px;
`;

const LogoutIcon = styled.div`
  padding-left: 15px;
  cursor: pointer;
`;

const LogoutName = styled.div`
  padding-left: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: #ff5252;
  }
`;
