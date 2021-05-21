import React from "react";
import { Link } from "react-router-dom";

// import "./Signin.css";
import styled from "styled-components";
import backgroundImg from "../image/rankback.png";
import signinLogo from "../image/taza.png";
import powerBtn from "../image/power_pending.png";

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
            <LogoutBtn onClick={loginRequestHandler}>회원가입</LogoutBtn>
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
`;

// 로그인 버튼
const LoginBtn = styled.button`
  width: 98%;
  color: white;
  background: black;
  border: solid 0.15rem #33ffff;
  border-radius: 0.4rem;
  cursor: pointer;
`;

// 로그아웃 버튼
const LogoutBtn = styled.button`
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

// class Signin extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLogin: false,
//       nickname: "",
//       password: "",
//       isNicknameChecked: false,
//       isPasswordChecked: false,
//       check: false,
//     };

//     this.loginHandler = this.loginHandler.bind(this);
//     this.check = this.check.bind(this);
//   }

//   loginHandler() {
//     window.localStorage.setItem("isLogin", true);
//     this.props.history.push({
//       isLogin: this.state.isLogin,
//     });
//     this.props.history.push("/");
//   }

//   nicknameValidator = (e) => {
//     const nicknameInput = e.target.value;
//     if (nicknameInput.length >= 1) {
//       this.setState({ isNicknameChecked: true });
//       this.setState({ nickname: nicknameInput });
//     } else {
//       this.setState({ isNicknameChecked: false });
//     }
//   };

//   passwordValidator = (e) => {
//     const passwordInput = e.target.value;
//     if (passwordInput.length >= 1) {
//       this.setState({ isPasswordChecked: true });
//       this.setState({ password: passwordInput });
//     } else {
//       this.setState({ isPasswordChecked: false });
//     }
//   };

//   loginRequestHandler = async () => {
//     const {
//       nickname,
//       password,
//       isNicknameChecked,
//       isPasswordChecked,
//     } = this.state;

//     const loginDuplicate = document.querySelector(
//       ".signin_body_name_input_login1"
//     );

//     const loginDuplicate2 = document.querySelector(
//       ".signin_body_name_input_login2"
//     );

//     // 이메일, 비밀번호 체크
//     if (isNicknameChecked === false || isPasswordChecked === false) {
//       loginDuplicate.style.display = "block";
//     } else if (isNicknameChecked && isPasswordChecked) {
//       loginDuplicate.style.display = "none";

//       const loginRequest = await axios.post(
//         "http://localhost:8080/auth/signin",
//         // "https://tajachija.tk/auth/signin",
//         { nickname, password },
//         { withCredentials: true }
//       );
// if (loginRequest.data.message === "signin OK") {
//   window.localStorage.setItem("token", loginRequest.data.token);
//   window.localStorage.setItem("id", loginRequest.data.id);
//   window.localStorage.setItem("nick", loginRequest.data.nickname);
//   this.loginHandler();
// } else {
//   loginDuplicate2.style.display = "block";
// }
//     }
//   };

//   convertToSignup = () => {
//     this.props.history.push("/signup");
//   };

//   // 회원가입
//   handleInputValue = (key) => (e) => {
//     this.setState({ [key]: e.target.value });
//   };

//   clickBtn = () => {
//     const { nickname, password } = this.state;
//     const duplicate = document.querySelector(
//       ".signin_body_name_input_duplicate"
//     );

//     if (password.length >= 4 && nickname.length >= 2 && nickname.length <= 5) {
//       axios
//         .post("http://localhost:8080/auth/signup", this.state)
//         // .post("https://tajachija.tk/auth/signup", this.state)
//         .then((res) => {
//           if (res.data.message === "signup") {
//             this.props.history.push("/");
//           } else {
//             duplicate.style.display = "block";
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       // alert("유효한 정보가 아닙니다. 다시 작성해주세요");

//       if (nickname.length < 2 || nickname.length > 5) {
//         const hanValidation = document.querySelector(
//           ".signin_body_name_input_validation"
//         );
//         duplicate.style.display = "none";
//         hanValidation.style.display = "block";
//       }
//       if (password.length < 4) {
//         const passValidation = document.querySelector(
//           ".signin_body_password_input_validation"
//         );

//         passValidation.style.display = "block";
//       }
//     }
//   };

//   loginChk() {
//     const loginDuplicate = document.querySelector(
//       ".signin_body_name_input_login1"
//     );

//     const loginDuplicate2 = document.querySelector(
//       ".signin_body_name_input_login2"
//     );

//     loginDuplicate.style.display = "none";
//     loginDuplicate2.style.display = "none";
//   }

//   hanChk = (key) => (e) => {
//     const hanValidation = document.querySelector(
//       ".signin_body_name_input_validation"
//     );

//     if (e.target.value.length > 0) {
//       var s = e.target.value;
//       var len = s.length;
//       for (var i = 0; i < len; i++) {
//         if (s.charCodeAt(i) < 128) {
//           hanValidation.style.display = "block";
//           e.target.value = "";
//           return;
//         } else {
//           hanValidation.style.display = "none";
//         }
//       }
//     }
//   };

//   passChk(e) {
//     const passValidation = document.querySelector(
//       ".signin_body_password_input_validation"
//     );

//     passValidation.style.display = "none";
//   }

//   check() {
//     this.setState({ check: true });
//   }

//   render() {
//     const { check } = this.state;

//     return (
//       <div>
//         <div id="nav_signin">
//           <Nav />
//         </div>
//         <div id="signin">
//           <div className="signin____header____tail">
//             <div className="signin_container">
//               <div className="signin_header">
//                 <img
//                   className="signin_header_logo"
//                   src={signinLogo}
//                   alt="login_logo"
//                 />
//               </div>
//               {check ? (
//                 <div className="signin_body">
//                   <div className="signin_body_name">
//                     <div className="signin_body_name_column">닉네임</div>
//                     <input
//                       type="text"
//                       className="signin_body_name_input"
//                       onKeyUp={this.hanChk("hanChk")}
//                       onChange={this.handleInputValue("nickname")}
//                     />
//                     <div className="signin_body_name_input_validation">
//                       한글만 가능합니다<br></br>
//                       최소 2글자, 최대 5글자
//                     </div>
//                     <div className="signin_body_name_input_duplicate">
//                       중복된 닉네임입니다
//                     </div>
//                   </div>
//                   <div className="signin_body_password">
//                     <div className="signin_body_password_column">비밀번호</div>
//                     <input
//                       type="password"
//                       className="signin_body_password_input"
//                       onKeyUp={this.passChk}
//                       onChange={this.handleInputValue("password")}
//                     />
//                     <div className="signin_body_password_input_validation">
//                       4자 이상이어야 합니다
//                     </div>
//                   </div>
//                   <div className="signin_body_loginAndSignup">
//                     <button
//                       type="submit"
//                       className="signin_body_loginBtn2"
//                       onClick={() => this.clickBtn()}
//                     >
//                       회원가입
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="signin_body">
//                   <div className="signin_body_name">
//                     <div className="signin_body_name_column">닉네임</div>
//                     <input
//                       className="signin_body_name_input"
//                       onChange={this.nicknameValidator.bind(this)}
//                       onKeyUp={this.loginChk}
//                     />
//                     <div className="signin_body_name_input_login1">
//                       정보가 입력되지 않았습니다
//                     </div>
//                     <div className="signin_body_name_input_login2">
//                       가입정보가 일치하지 않습니다
//                     </div>
//                   </div>
//                   <div className="signin_body_password">
//                     <div className="signin_body_password_column">비밀번호</div>
//                     <input
//                       className="signin_body_password_input"
//                       type="password"
//                       onChange={this.passwordValidator.bind(this)}
//                       onKeyUp={this.loginChk}
//                     />
//                   </div>
//                   <div className="signin_body_loginAndSignup">
//                     <button
//                       className="signin_body_loginBtn"
//                       onClick={this.loginRequestHandler.bind(this)}
//                     >
//                       로그인
//                     </button>
//                     <button
//                       className="signin_body_signupBtn"
//                       onClick={this.check}
//                     >
//                       회원가입
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="signin_tail">
//               <div className="signin_tail_left"></div>
//               <div className="signin_tail_center">
//                 <Link to="/">
//                   <div className="tail_button_signin" />
//                 </Link>
//               </div>
//               <div className="signin_tail_right">
//                 <p className="signin_tail_right_triangle"></p>
//                 <p className="signin_tail_right_arrow">홈</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(Signin);
