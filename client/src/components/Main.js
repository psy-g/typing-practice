import React from "react";
import { Link, NavLink } from "react-router-dom";

import styled, { keyframes } from "styled-components";
import backgroundImg from "../image/rankback.png";
import signinLogo from "../image/taza.png";
import powerBtn1 from "../image/power.png";
import powerBtn2 from "../image/power_on.png";
import mainImg1 from "../image/main_img_1.gif";
import mainImg2 from "../image/main_img_2.png";
import mainImg3 from "../image/main_img_3.png";
import mainImg4 from "../image/main_img_4.gif";
import scrollText from "../image/scroll_image.png";

const Main = ({ isLogged, scrollEnd }) => {
  return (
    <Container>
      <Wrapper>
        <OneTop>
          <Logo>
            <LogoImg src={signinLogo} alt="logo" />
          </Logo>
          <Enter>
            <InsertCoin exact to="/test">
              INSERT COIN
            </InsertCoin>
            <Copyright>@YG 2021</Copyright>
          </Enter>
        </OneTop>
        <Bottom>
          <Left></Left>
          <Center>
            {!isLogged ? (
              <LinkBtn to="/signin">
                <PowerBtn1 />
              </LinkBtn>
            ) : (
              <LinkBtn to="/test">
                <PowerBtn2 />
              </LinkBtn>
            )}
          </Center>
          <Right>
            <p></p>
            <p>로그인</p>
          </Right>
        </Bottom>
        <ScrollWrapper>
          <ScrollIcon src={scrollText} alt="scroll" scrollCheck={scrollEnd} />
        </ScrollWrapper>
      </Wrapper>
      <Wrapper>
        <Description>
          <ContentsWrapper>
            <TextContents>
              <TextTopPage2>
                타자치자<p></p>
                입력하여 실력을<br></br>
                확인하자
              </TextTopPage2>
              <TextBottomPage2>
                한글의 자음과 모음을 분리하여
                <br></br>
                <span>타수와 정확도를 계산</span>
                <span>합니다</span>
              </TextBottomPage2>
            </TextContents>
            <ImgContents>
              <Image src={mainImg1} alt="image" />
            </ImgContents>
          </ContentsWrapper>
          {/* <div className="scroll_icon"></div> */}
        </Description>
      </Wrapper>
      <Wrapper>
        <Description>
          <ContentsWrapper>
            <ImgContents>
              <Image src={mainImg2} alt="image" />
            </ImgContents>
            <TextContents>
              <TextTopPage3>
                기록<p></p>
                측정이 끝나고<br></br>
                기록을 확인하자
              </TextTopPage3>
              <TextBottomPage3>
                주어진 문제를 모두 풀면
                <br></br>
                <span>기록과 순위를 확인</span>
                <span>합니다</span>
              </TextBottomPage3>
            </TextContents>
          </ContentsWrapper>
          {/* <div className="scroll_icon"></div> */}
        </Description>
      </Wrapper>
      <Wrapper>
        <Description>
          <ContentsWrapperLast>
            <TextContentsLast>
              <TextTopPage4>
                순위<p></p>
                다른 사람의<br></br>
                기록을 확인합니다
              </TextTopPage4>
              <TextBottomPage4>
                그래프를 통해 다른 기록과
                <br></br>
                <span>비교</span>
                <span>해 볼 수 있습니다</span>
              </TextBottomPage4>
            </TextContentsLast>
            <ImgContentsWrapper>
              <ImageLast src={mainImg3} alt="rank1" />
              <ImageLast src={mainImg4} alt="rank2" />
            </ImgContentsWrapper>
          </ContentsWrapperLast>
          <Footer>
            <a
              href="https://wonderfulharu.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              블로그
            </a>
            <a href="mailto:psykyg@gmail.com">이메일</a>
            <a
              href="https://github.com/psy-g"
              target="_blank"
              rel="noopener noreferrer"
            >
              깃허브
            </a>
          </Footer>
          <div className="scroll_icon"></div>
        </Description>
      </Wrapper>
    </Container>
  );
};

export default Main;

// 컨테이너
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 1~4 페이지
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;
  justify-content: flex-start;
`;

// 1페이지 상단
const OneTop = styled.div`
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

// 1페이지 상단 로고
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

// 입장(Enter)
const Enter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 60%;
`;

// 애니메이션
const animation = keyframes`
  0% {
    color: #fff;
  }
  100% {
    color: #fff;
    text-shadow: -2px 0 #00f, 0 2px #00f, 2px 0 #00f, 0 -2px #00f;
  }
`;

// Insert Coin
const InsertCoin = styled(NavLink)`
  font-size: max(1.1em, 1.5vw);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: ${animation} 1s infinite;
  height: 80%;
`;

// copyright
const Copyright = styled.div`
  font-size: max(0.4em, 0.7vw);
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  justify-content: center;
  color: #e53a40;
  text-shadow: -2px 0 #30a9de, 0 2px #30a9de, 2px 0 #30a9de, 0 -2px #30a9de;
  height: 20%;
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

// 하단 우 .tail_right
// p1 .tail_right_triangle
// p2 .tail_right_arrow
const Right = styled.div`
  display: none;

  p {
    &:nth-child(1) {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      border-color: transparent white transparent transparent;
      z-index: 10;
      margin: 0px;
    }
    &:nth-child(2) {
      border-radius: 8px;
      background: white;
      border: solid transparent;
      color: black;
      border-width: 10px;
      z-index: 10;
      margin: 0px;
    }
  }
`;

// 하단 중
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover + ${Right} {
    display: flex;
    justify-content: left;
    align-items: center;
  }
`;

const LinkBtn = styled(Link)``;

// 전원 버튼1(비로그인)
const PowerBtn1 = styled.div`
  border: none;
  background: url(${powerBtn1});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 전원 버튼2(로그인)
const PowerBtn2 = styled.div`
  border: none;
  background: url(${powerBtn2});
  background-size: cover;
  width: 50px;
  height: 50px;
`;

// 스크롤
const ScrollWrapper = styled.div`
  position: absolute;
  top: 40%;
  right: 0.1%;

  @media all and (max-width: 767px) {
    right: -2%;
  }
`;

// 스크롤 아이콘
const ScrollIcon = styled.img`
  display: ${(props) => (props.scrollCheck.scrollEnd ? "none" : "block")};
  width: 70px;
  height: 80px;
`;

// 설명 박스
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  text-align: center;

  @media all and (max-width: 767px) {
    width: 75%;
  }
`;

// 컨텐츠 박스(2~3페이지) - .context-header
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`;

// 컨텐츠 설명 박스(2~3페이지) - .context-header-text
const TextContents = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;

  @media all and (max-width: 767px) {
    width: 80%;
    height: 55%;
    justify-content: flex-end;
  }
`;

// 컨텐츠 설명(2페이지) - .context-header-text-top1
const TextTopPage2 = styled.div`
  color: white;
  font-size: max(2em, 3.5vw);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
  p {
    margin-top: 15px;
    margin-bottom: 0px;
  }
`;

// 컨텐츠 설명(3페이지) - .context-header-text-top2
const TextTopPage3 = styled.div`
  color: white;
  font-size: max(2em, 3.5vw);
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
  p {
    margin-top: 15px;
    margin-bottom: 0px;
  }
`;

// 컨텐츠 설명(2페이지) - .context-header-text-bottom1
const TextBottomPage2 = styled.div`
  color: white;
  font-size: max(0.8em, 1vw);
  text-align: left;
  font-family: "HeirofLightRegular";
  span {
    &:nth-child(2) {
      font-family: "HeirofLightRegular";
      color: #e53a40;
    }
    &:nth-child(3) {
      font-family: "HeirofLightRegular";
      color: white;
    }
  }
`;

// 컨텐츠 설명(3페이지) - .context-header-text-bottom2
const TextBottomPage3 = styled.div`
  color: white;
  font-size: max(0.8em, 1vw);
  text-align: right;
  font-family: "HeirofLightRegular";
  span {
    &:nth-child(2) {
      font-family: "HeirofLightRegular";
      color: #e53a40;
    }
    &:nth-child(3) {
      font-family: "HeirofLightRegular";
      color: white;
    }
  }
`;

// 컨텐츠 이미지 박스(2~3페이지) - .context-header-img-container
const ImgContents = styled.div`
  width: 50%;
  height: 70%;
  border-radius: 8px;
  border: solid;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media all and (max-width: 767px) {
    width: 80%;
  }
`;

// 설명 이미지(2~3페이지) - .context-header-img
const Image = styled.img`
  width: 100%;
  height: 100%;
`;

// 컨텐츠 박스(4페이지) - .context-header3
const ContentsWrapperLast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 85%;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    justify-content: flex-end;
    height: 70%;
  }
`;

// 컨텐츠 설명 박스(4페이지) - .context-header-text3
const TextContentsLast = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    justify-content: flex-end;
  }

  @media all and (max-width: 767px) {
    height: 40%;
  }
`;

// 컨텐츠 설명(4페이지) - .context-header-text-top3
const TextTopPage4 = styled.div`
  color: white;
  font-size: max(2em, 3.5vw);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  p {
    margin-top: 15px;
    margin-bottom: 0px;
  }
`;

// 컨텐츠 설명(4페이지) - .context-header-text-bottom3, context-header-img3-2
const TextBottomPage4 = styled.div`
  color: white;
  font-size: max(0.8em, 1vw);
  text-align: left;
  font-family: "HeirofLightRegular";
  span {
    &:nth-child(2) {
      font-family: "HeirofLightRegular";
      color: #e53a40;
    }
    &:nth-child(3) {
      font-family: "HeirofLightRegular";
      color: white;
    }
  }
`;

// 컨텐츠 이미지 박스(4페이지) - .context-header-img3-container
const ImgContentsWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media all and (min-width: 768px) and (max-width: 1023px) {
    height: 30%;
  }

  @media all and (max-width: 767px) {
    height: 55%;
  }
`;

// 설명 이미지1(4페이지) - .context-header-img3-1
const ImageLast = styled.img`
  width: 48%;
  height: 100%;
  border-radius: 8px;
`;

// Footer - .main_footer
const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    color: #fafafa;
    font-family: "HeirofLightRegular";
    font-size: 18px;
    margin-left: 15px;
    opacity: 0.6;
    &:hover {
      color: #fafafa;
      font-family: "HeirofLightRegular";
      font-size: 18px;
      margin-left: 15px;
      opacity: 1;
    }
  }
`;
