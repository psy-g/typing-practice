import React from "react";
import { Link } from "react-router-dom";
// import "./Signup.css";

import styled from "styled-components";
import backgroundImg from "../image/rankback.png";
import signinLogo from "../image/taza.png";
import powerBtn from "../image/power_pending.png";

const Signup = ({
  inputHandler,
  checks,
  hanAndPassCheck,
  signupRequestHandler,
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
              type="text"
              name="nickname"
              onChange={inputHandler}
              onBlur={hanAndPassCheck}
            />
            <Hidden1 inputCheck={checks}>
              한글만 가능합니다<br></br>
              최소 2글자, 최대 5글자
            </Hidden1>
            <Duplicate>중복된 닉네임입니다</Duplicate>
          </NicknameWrapper>
          <Password>
            <Title>비밀번호</Title>
            <Input
              type="password"
              name="password"
              onChange={inputHandler}
              onBlur={hanAndPassCheck}
            />
            <Hidden2 inputCheck={checks}>4자 이상이어야 합니다</Hidden2>
          </Password>
          <ButtonWrapper>
            <SignupBtn type="submit" onClick={signupRequestHandler}>
              회원가입
            </SignupBtn>
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
      </Bottom>
    </Container>
  );
};

export default Signup;

// 헤더 컨테이너
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
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
`;

// 입력 박스
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 60%;
`;

// 닉네임 박스
const NicknameWrapper = styled.div`
  height: 25%;
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
  height: 20%;
`;

// 숨김(정보 미입력)
const Hidden1 = styled.div`
  display: ${(props) => (props.inputCheck.nickname ? "none" : "block")};
  color: #e53a40;
  font-size: 14px;
`;

// 숨김(가입정보 다름)
const Hidden2 = styled.div`
  display: ${(props) => (props.inputCheck.password ? "none" : "block")};
  color: #e53a40;
  font-size: 14px;
`;

// 중복(닉네임)
const Duplicate = styled.div`
  display: none;
  color: #e53a40;
  font-size: 14px;
`;

// 버튼 박스
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 98%;
  height: 15%;
`;

// 회원가입 버튼
const SignupBtn = styled.button`
  width: 98%;
  color: white;
  background: black;
  border: solid 0.15rem #33ffff;
  border-radius: 0.4rem;
  cursor: pointer;
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
