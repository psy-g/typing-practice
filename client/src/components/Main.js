import React from "react";
import "./Main.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../image/taza.png";
import mainImg1 from "../image/main_img_1.gif";
import mainImg2 from "../image/main_img_2.png";
import mainImg3 from "../image/main_img_3.png";
import mainImg4 from "../image/main_img_4.gif";
import scrollText from "../image/scroll_image.png";
import $ from "jquery";

import styled from "styled-components";
import backgroundImg from "../image/rankback.png";
import signinLogo from "../image/taza.png";
import powerBtn1 from "../image/power.png";
import powerBtn2 from "../image/power_on.png";

const Main = ({ isLogged }) => {
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
              <Link to="/signin">
                <PowerBtn1 />
              </Link>
            ) : (
              <Link to="/test">
                <PowerBtn2 />
              </Link>
            )}
          </Center>
          {/* <div className="tail_right">
            <p className="tail_right_triangle"></p>
            <p className="tail_right_arrow">로그인</p>
          </div> */}
        </Bottom>
        <ScrollWrapper>
          <ScrollIcon src={scrollText} alt="scroll" />
        </ScrollWrapper>
      </Wrapper>
      <Wrapper>
        <Description>
          <div className="context-header">
            <div className="context-header-text">
              <div className="context-header-text-top1">
                타자치자<br></br>
                입력하여 실력을<br></br>
                확인하자
              </div>
              <div className="context-header-text-bottom1">
                한글의 자음과 모음을 분리하여
                <div className="context-header-text-bottom-marker-container">
                  <div className="context-header-text-bottom-marker">
                    {" "}
                    타수와 정확도를 계산
                  </div>
                  <div className="context-header-text-bottom-noMarker">
                    합니다
                  </div>
                </div>
              </div>
            </div>
            <div className="context-header-img-container">
              <img
                className="context-header-img"
                src={mainImg1}
                width="50px"
                height="50px"
                alt="측정이미지"
              />
            </div>
          </div>
          <div className="scroll_icon"></div>
        </Description>
      </Wrapper>
      <Wrapper>
        <Description>
          <div className="context-header">
            <div className="context-header-img-container">
              <img
                className="context-header-img"
                src={mainImg2}
                width="50px"
                height="50px"
                alt="측정이미지"
              />
            </div>
            <div className="context-header-text">
              <div className="context-header-text-top2">
                <div>기록</div>
                <div>측정이 끝나고</div>
                <div>기록을 확인하자</div>
              </div>
              <div className="context-header-text-bottom2">
                주어진 문제를 모두 풀면
                <div className="context-header-text-bottom-marker-container">
                  <div className="context-header-text-bottom-marker">
                    {" "}
                    기록과 순위를 확인
                  </div>
                  <div className="context-header-text-bottom-noMarker">
                    합니다
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll_icon"></div>
        </Description>
      </Wrapper>
      <Wrapper>
        <Description>
          <div className="context-header3">
            <div className="context-header-text3">
              <div className="context-header-text-top3">
                순위<br></br>
                다른 사람의<br></br>
                기록을 확인합니다
              </div>
              <div className="context-header-text-bottom3">
                그래프를 통해 다른 기록과
                <div className="context-header-text-bottom-marker-container3">
                  <div className="context-header-text-bottom-marker"> 비교</div>
                  <div className="context-header-text-bottom-noMarker">
                    해 볼 수 있습니다
                  </div>
                </div>
              </div>
            </div>
            <div className="context-header-img3-container">
              <img
                className="context-header-img3-1"
                src={mainImg3}
                width="50px"
                height="50px"
                alt="순위1"
              />
              <img
                className="context-header-img3-2"
                src={mainImg4}
                width="50px"
                height="50px"
                alt="순위2"
              />
            </div>
          </div>
          <div className="main_footer">
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
          </div>
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
  justify-content: center;
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
`;

// 입장(Enter)
const Enter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 60%;
`;

// Insert Coin
const InsertCoin = styled(NavLink)`
  font-size: max(1.1em, 1.5vw);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: blink 1s infinite;
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
`;

// 하단 좌
const Left = styled.div``;

// 하단 중
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

// 스크롤 아이콘
const ScrollIcon = styled.img`
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
`;

// class Main extends Component {

//   render() {
//     const checkLogin = window.localStorage.getItem("isLogin");

//     return (
// <div>
//   <div id="nav_main">{/* <Nav /> */}</div>
//   <div id="main">
//     <div className="header____tail">
//       <div className="header">
//         <div className="header_top">
//           <img className="header_logo" src={logo} alt="logo" />
//         </div>
//         <div className="header_enter">
//           <Link to="/test" className="header_enter_test">
//             INSERT COIN
//           </Link>
//           <div className="header_enter_tail">@YG 2021</div>
//         </div>
//       </div>
//             <div className="tail">
//               <div className="tail_left"></div>
//               <div className="tail_center">
//                 <div className="tail_button">
//                   {!checkLogin ? (
//                     <Link to="/signin">
//                       <div className="tail_button_main" />
//                     </Link>
//                   ) : (
//                     <Link to="/test">
//                       <div className="tail_button_main_login" />
//                     </Link>
//                   )}
//                 </div>
//               </div>
//               <div className="tail_right">
//                 <p className="tail_right_triangle"></p>
//                 <p className="tail_right_arrow">로그인</p>
//               </div>
//             </div>
//             <div className="scroll_icon">
//               <img
//                 className="scroll_icon-img1"
//                 src={scrollText}
//                 alt="스크롤아이콘"
//                 width="70px"
//                 height="80px"
//               />
//             </div>
//           </div>
//           <div className="header____tail">
//             <div className="header____tail____descript">
//               <div className="context-header">
//                 <div className="context-header-text">
//                   <div className="context-header-text-top1">
//                     타자치자<br></br>
//                     입력하여 실력을<br></br>
//                     확인하자
//                   </div>
//                   <div className="context-header-text-bottom1">
//                     한글의 자음과 모음을 분리하여
//                     <div className="context-header-text-bottom-marker-container">
//                       <div className="context-header-text-bottom-marker">
//                         {" "}
//                         타수와 정확도를 계산
//                       </div>
//                       <div className="context-header-text-bottom-noMarker">
//                         합니다
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="context-header-img-container">
//                   <img
//                     className="context-header-img"
//                     src={mainImg1}
//                     width="50px"
//                     height="50px"
//                     alt="측정이미지"
//                   />
//                 </div>
//               </div>
//               <div className="scroll_icon"></div>
//             </div>
//           </div>
//           <div className="header____tail">
//             <div className="header____tail____descript">
//               <div className="context-header">
//                 <div className="context-header-img-container">
//                   <img
//                     className="context-header-img"
//                     src={mainImg2}
//                     width="50px"
//                     height="50px"
//                     alt="측정이미지"
//                   />
//                 </div>
//                 <div className="context-header-text">
//                   <div className="context-header-text-top2">
//                     <div>기록</div>
//                     <div>측정이 끝나고</div>
//                     <div>기록을 확인하자</div>
//                   </div>
//                   <div className="context-header-text-bottom2">
//                     주어진 문제를 모두 풀면
//                     <div className="context-header-text-bottom-marker-container">
//                       <div className="context-header-text-bottom-marker">
//                         {" "}
//                         기록과 순위를 확인
//                       </div>
//                       <div className="context-header-text-bottom-noMarker">
//                         합니다
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="scroll_icon"></div>
//             </div>
//           </div>
//           <div className="header____tail">
//             <div className="header____tail____descript">
//               <div className="context-header3">
//                 <div className="context-header-text3">
//                   <div className="context-header-text-top3">
//                     순위<br></br>
//                     다른 사람의<br></br>
//                     기록을 확인합니다
//                   </div>
//                   <div className="context-header-text-bottom3">
//                     그래프를 통해 다른 기록과
//                     <div className="context-header-text-bottom-marker-container3">
//                       <div className="context-header-text-bottom-marker">
//                         {" "}
//                         비교
//                       </div>
//                       <div className="context-header-text-bottom-noMarker">
//                         해 볼 수 있습니다
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="context-header-img3-container">
//                   <img
//                     className="context-header-img3-1"
//                     src={mainImg3}
//                     width="50px"
//                     height="50px"
//                     alt="순위1"
//                   />
//                   <img
//                     className="context-header-img3-2"
//                     src={mainImg4}
//                     width="50px"
//                     height="50px"
//                     alt="순위2"
//                   />
//                 </div>
//               </div>
//               <div className="main_footer">
//                 <a
//                   href="https://wonderfulharu.tistory.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   블로그
//                 </a>
//                 <a href="mailto:psykyg@gmail.com">이메일</a>
//                 <a
//                   href="https://github.com/psy-g"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   깃허브
//                 </a>
//               </div>
//               <div className="scroll_icon"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Main;
