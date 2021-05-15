import { request } from "../utils/axios";

// 유저(회원가입, 로그인, 로그아웃)
const SIGNUP_USER = "user/SIGNUP";
const LOGIN_USER = "user/LOGIN";
const LOGOUT_USER = "user/LOGOUT";

// 회원가입
export function signupUser(body) {
  const data = request("post", "/sign-up", body);

  return {
    type: SIGNUP_USER,
    payload: data,
  };
}

// 로그인
export function loginUser(body) {
  const data = request("post", "/auth/signin", body);

  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// 로그아웃
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

const initialState = {
  nickname: "",
  isLogged: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    // 회원가입
    case SIGNUP_USER:
      return {
        ...state,
        nickname: action.payload.nickname,
        isLogged: true,
      };

    // 로그인
    case LOGIN_USER:
      return {
        ...state,
        nickname: action.payload.nickname,
        isLogged: true,
      };

    // 로그아웃
    case LOGOUT_USER:
      return {
        ...state,
        nickname: "",
        isLogged: false,
      };
    default:
      return state;
  }
}
