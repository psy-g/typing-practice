import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Nav = ({
  userState,
  burger,
  openBurger,
  closeBurger,
  closeBurgerView,
  logoutHandler,
}) => {
  return (
    <>
      <Container>
        <Wrapper>
          <Logo href="/" title="홈으로 이동합니다">
            타자치자
          </Logo>
          <UserNavWrapper>
            {burger ? (
              <BurgerContainer>
                <BurgerContainerHeader>
                  <CloseBurgerBtn onClick={closeBurger}>
                    &times;&nbsp;
                  </CloseBurgerBtn>
                </BurgerContainerHeader>
                {userState ? (
                  <>
                    <MenuTop>
                      <MenuTopContent>
                        <LinkIcon exact to="/" onClick={closeBurgerView}>
                          🏠
                        </LinkIcon>
                        <LinkName exact to="/" onClick={closeBurgerView}>
                          홈
                        </LinkName>
                      </MenuTopContent>
                    </MenuTop>
                    <MenuBottom>
                      <MenuBottomContent>
                        <MenuBottomContent1>
                          <LogoutIcon onClick={logoutHandler}>👋</LogoutIcon>
                          <LogoutName onClick={logoutHandler}>
                            로그아웃
                          </LogoutName>
                        </MenuBottomContent1>
                        <MenuBottomContent1>
                          <LinkIcon
                            exact
                            to="/ranking"
                            onClick={closeBurgerView}
                          >
                            🏆
                          </LinkIcon>
                          <LinkName
                            exact
                            to="/ranking"
                            onClick={closeBurgerView}
                          >
                            순위
                          </LinkName>
                        </MenuBottomContent1>
                        <MenuBottomContent1>
                          <LinkIcon exact to="/test" onClick={closeBurgerView}>
                            ⌨
                          </LinkIcon>
                          <LinkName exact to="/test" onClick={closeBurgerView}>
                            타자연습
                          </LinkName>
                        </MenuBottomContent1>
                      </MenuBottomContent>
                    </MenuBottom>
                  </>
                ) : (
                  <>
                    <MenuTop>
                      <MenuTopContent>
                        <LinkIcon exact to="/" onClick={closeBurgerView}>
                          🏠
                        </LinkIcon>
                        <LinkName exact to="/" onClick={closeBurgerView}>
                          홈
                        </LinkName>
                      </MenuTopContent>
                    </MenuTop>
                    <MenuBottom>
                      <MenuBottomContent>
                        <MenuBottomContent1>
                          <LinkIcon
                            exact
                            to="/signin"
                            onClick={closeBurgerView}
                          >
                            🖥
                          </LinkIcon>
                          <LinkName
                            exact
                            to="/signin"
                            onClick={closeBurgerView}
                          >
                            로그인
                          </LinkName>
                        </MenuBottomContent1>
                        <MenuBottomContent1>
                          <LinkIcon
                            exact
                            to="/ranking"
                            onClick={closeBurgerView}
                          >
                            🏆
                          </LinkIcon>
                          <LinkName
                            exact
                            to="/ranking"
                            onClick={closeBurgerView}
                          >
                            순위
                          </LinkName>
                        </MenuBottomContent1>
                        <MenuBottomContent1>
                          <LinkIcon exact to="/test" onClick={closeBurgerView}>
                            ⌨
                          </LinkIcon>
                          <LinkName exact to="/test" onClick={closeBurgerView}>
                            타자연습
                          </LinkName>
                        </MenuBottomContent1>
                      </MenuBottomContent>
                    </MenuBottom>
                  </>
                )}
              </BurgerContainer>
            ) : (
              <BurgerImg onClick={openBurger}>&#9776;</BurgerImg>
            )}
            {/* {userState ? <div>false</div> : <BurgerImg>&#9776;</BurgerImg>} */}
          </UserNavWrapper>
        </Wrapper>
      </Container>
      <Space />
    </>
  );
};

export default Nav;

// 헤더 컨테이너
const Container = styled.header`
  position: fixed;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #30a9de;
`;

// 헤더 크기만큼 공간 차지
const Space = styled.div`
  width: 100%;
  height: 10%;
`;

// 로고, 메뉴
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// 로고
const Logo = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-left: 15px;
  font-size: 1.8rem;
  color: white;
`;

// 유저 + 버거 메뉴
const UserNavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// 유저 정보
/* 
const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-weight: bold;

  @media ${(props) => props.theme.mobile} {
    margin-right: 15px;
  }
`;
*/

// 버거 이미지
const BurgerImg = styled.div`
  cursor: pointer;
  font-size: 2rem;
  color: white;
  margin-right: 15px;
`;

// 버거 컨테이너
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
`;

// 버거 컨테이너 상단
const BurgerContainerHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 50px;
`;

// 버거 컨테이너 닫기
const CloseBurgerBtn = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 46px;
  cursor: pointer;
  background: white;
  width: 47px;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

// 버거 메뉴(상단)
const MenuTop = styled.div`
  padding-top: 20px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// 버거 메뉴(하단)
const MenuBottom = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: white;
  height: 180px;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

// 홈
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

const activeClassName = "nav-active";

// 메뉴 링크(홈, 로그인, 회원가입, 순위, 타자연습)
// const StyledLink = styled(NavLink).attrs({ activeClassName })`
//   &.${activeClassName} {
//     color: #ff5252;
//   }
//   color: #fafafa;
//   text-decoration: none;
// `;

// 메뉴 링크(아이콘, 이름)
const LinkIcon = styled(NavLink)`
  padding-left: 15px;
`;

// 메뉴 링크(이름)
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

// 로그아웃(아이콘)
const LogoutIcon = styled.div`
  padding-left: 15px;
  cursor: pointer;
`;

// 로그아웃(이름)
const LogoutName = styled.div`
  padding-left: 10px;
  font-size: 1rem;
  cursor: pointer;
`;
