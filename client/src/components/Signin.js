import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import backgroundImg from "image/rankback.png";
import signinLogo from "image/taza.png";
import powerBtn from "image/power_pending.png";

const Signin = ({
  loginRequestHandler,
  inputHandler,
  validatorHandler,
  checks,
  match,
}) => {
  return (
    <Container>
      <Top>
        <Logo>
          <LogoImg src={signinLogo} alt="logo" />
        </Logo>
        <InputWrapper>
          <NicknameWrapper>
            <Title>닉네임</Title>
            <Input
              name="nickname"
              onBlur={validatorHandler}
              onChange={inputHandler}
            />
            <Hidden1 inputCheck={checks}>정보가 입력되지 않았습니다</Hidden1>
            <Hidden2 matchCheck={match}>가입정보가 일치하지 않습니다</Hidden2>
          </NicknameWrapper>
          <Password>
            <Title>비밀번호</Title>
            <Input
              name="password"
              type="password"
              onBlur={validatorHandler}
              onChange={inputHandler}
            />
          </Password>
          <ButtonWrapper>
            <LoginBtn onClick={loginRequestHandler}>로그인</LoginBtn>
            <Link to="/signup">
              <SignupBtn>회원가입</SignupBtn>
            </Link>
          </ButtonWrapper>
        </InputWrapper>
      </Top>
      <Bottom>
        <Left />
        <Center>
          <Link to="/">
            <PowerBtn />
          </Link>
        </Center>
        {/* <div className="signin_tail_right">
          <p className="signin_tail_right_triangle"></p>
          <p className="signin_tail_right_arrow">홈</p>
        </div> */}
      </Bottom>
    </Container>
  );
};

export default Signin;

// 컨테이너
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// 모니터 화면 상단
const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80vw;
  max-width: 960px;
  height: 65vh;
  text-align: center;
  background: url(${backgroundImg});
  z-index: 1;
  border: solid 15px #383a3f;
  border-bottom-width: 25px;
  border-top-width: 25px;
  border-radius: 0.6rem 0.6rem 0 0;
`;

// 상단 로고
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
`;

// 로고 이미지
const LogoImg = styled.img`
  width: 80%;
  max-width: 550px;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 70%;
    height: 150px;
  }

  @media all and (max-width: 767px) {
    height: 100%;
  }
`;

// 입력 박스
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 60%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
  }

  @media all and (max-width: 767px) {
    justify-content: center;
  }
`;

// 닉네임 박스
const NicknameWrapper = styled.div`
  height: 30%;
`;

// 타이틀
const Title = styled.div`
  color: white;
`;

// 입력창
const Input = styled.input`
  border-radius: 0.4rem;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

// 비밀번호(입력)
const Password = styled.div`
  height: 25%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 30%;
  }
`;

// 숨김(정보 미입력)
const Hidden1 = styled.div`
  display: ${(props) => (props.inputCheck.nickname ? "none" : "block")};
  color: #e53a40;
  font-size: 13px;
`;

// 숨김(가입정보 다름)
const Hidden2 = styled.div`
  display: ${(props) => (props.matchCheck ? "none" : "false")};
  color: #e53a40;
  font-size: 13px;
`;

// 버튼 박스
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 98%;
  height: 15%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 0%;
  }
`;

// 로그인 버튼
const LoginBtn = styled.button`
  width: 98%;
  color: white;
  background: black;
  border: solid 0.15rem #33ffff;
  border-radius: 0.4rem;
  cursor: pointer;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    width: 80px;
  }
`;

// 회원가입 버튼
const SignupBtn = styled.button`
  width: 98%;
  color: white;
  background: black;
  border: solid 0.15rem #33ffff;
  border-radius: 0.4rem;
  cursor: pointer;
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
  }
`;

// 모니터 하단
const Bottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr 1fr;
  width: 80vw;
  max-width: 960px;
  height: 13vh;
  text-align: center;
  background-color: #cadbe9;
  border-top-width: 2.5px;
  border-top-style: solid;
  border-top-color: #090707;
  border-radius: 0 0 0.6rem 0.6rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
`;

// 하단 좌
const Left = styled.div``;

// 하단 중
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 전원 버튼
const PowerBtn = styled.div`
  border: none;
  background: url(${powerBtn});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 하단 우
