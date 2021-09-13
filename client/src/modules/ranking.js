import { request } from "utils/axios";

const REGISTER_RANKING = "ranking/REGISTER_RANKING";
const REGISTER_RANKING_SUCCESS = "ranking/REGISTER_RANKING_SUCCESS";
const REGISTER_RANKING_FAILURE = "ranking/REGISTER_RANKING_FAILURE";

const PRINT_RANKING = "ranking/PRINT_RANKING";
const PRINT_RANKING_SUCCESS = "ranking/PRINT_RANKING_SUCCESS";
const PRINT_RANKING_FAILURE = "ranking/PRINT_RANKING_FAILURE";

// 랭킹 등록
export const registerRanking = (body) => async (dispatch) => {
  // 시작
  dispatch({ type: REGISTER_RANKING });

  try {
    const data = await request("post", "/ranking/register", body); // API 호출

    // 성공
    return dispatch({
      type: REGISTER_RANKING_SUCCESS,
      payload: data,
    });

    // 실패
  } catch (e) {
    return dispatch({
      type: REGISTER_RANKING_FAILURE,
      error: e,
    });
  }
};

// 랭킹 출력
export const printRanking = (body) => async (dispatch) => {
  // 시작
  dispatch({ type: PRINT_RANKING });

  try {
    const data = await request("post", "/ranking/print", body); // API 호출

    // 성공
    return dispatch({
      type: PRINT_RANKING_SUCCESS,
      payload: data,
    });

    // 실패
  } catch (e) {
    return dispatch({
      type: PRINT_RANKING_FAILURE,
      error: e,
    });
  }
};

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export default function ranking(state = initialState, action) {
  switch (action.type) {
    // 등록 대기
    case REGISTER_RANKING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    // 등록 성공
    case REGISTER_RANKING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };

    // 등록 실패
    case REGISTER_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // 출력 대기
    case PRINT_RANKING:
      return {
        ...state,
        loading: true,
        data: {},
      };

    // 출력 성공
    case PRINT_RANKING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };

    // 출력 실패
    case PRINT_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
