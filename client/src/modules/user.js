import { request } from "../utils/axios";

// 유저(회원가입, 로그인, 로그아웃)
const SIGNUP_USER = "user/SIGNUP";
// const LOGIN_USER = "user/LOGIN";
const LOGOUT_USER = "user/LOGOUT";
//
const LOGIN_USER = "user/LOGIN_USER";
const LOGIN_USER_SUCCESS = "user/LOGIN_USER_SUCCESS";
const LOGIN_USER_FAILURE = "user/LOGIN_USER_FAILURE";

// 로그인
// const LOGIN_PENDING = "user/LOGIN_PENDING";
// const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
// const LOGIN_FAILURE = "user/LOGIN_FAILURE";

// 회원가입
export function signupUser(body) {
  const data = request("post", "/sign-up", body);

  return {
    type: SIGNUP_USER,
    payload: data,
  };
}

// 로그인
export const loginUser = (body) => (dispatch) => {
  // 시작
  dispatch({ type: LOGIN_USER });

  try {
    const data = request("post", "/auth/signin", body); // API 호출

    // 성공
    return dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });

    // 실패
  } catch (e) {
    return dispatch({
      type: LOGIN_USER_FAILURE,
      error: e,
    });
  }
};

// // 로그인
// export function loginUser(body) {
//   const data = request("post", "/auth/signin", body);

//   return {
//     type: LOGIN_USER,
//     payload: data,
//   };
// }

// 로그아웃
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

const initialState = {
  loading: false,
  error: null,
  data: {
    nickname: "",
    message: "",
    // isLogged: false,
  },
};

export default function loginActions(state = initialState, action) {
  switch (action.type) {
    // 로그인 대기
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    // 로그인 성공
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          nickname: action.payload.data.nickname,
          message: action.payload.data.message,
          // isLogged: true,
        },
      };

    // 로그인 실패
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}

// export default function user(state = initialState, action) {
//   switch (action.type) {
//     // 회원가입
//     case SIGNUP_USER:
//       return {
//         ...state,
//         nickname: action.payload.nickname,
//         isLogged: true,
//       };

//     // 로그인 대기
//     case LOGIN_USER:
//       return {
//         ...state,
//         nickname: action.payload.nickname,
//         isLogged: true,
//       };

//     // 로그아웃
//     case LOGOUT_USER:
//       return {
//         ...state,
//         nickname: "",
//         isLogged: false,
//       };
//     default:
//       return state;
//   }
// }
