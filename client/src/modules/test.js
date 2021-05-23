import { request } from "../utils/axios";

const RANDOM_TEST = "test/RANDOM_TEST";
// const SELECT_TEST = "test/SELECT_TEST";

// 랜덤 문제 요청
export function requestRandom(body) {
  const data = request("post", "/problem/random", body);

  return {
    type: RANDOM_TEST,
    payload: data,
  };
}

const initialState = {
  message: "",
  data: "",
  //   data: {},
};

export default function test(state = initialState, action) {
  switch (action.type) {
    // 랜덤 요청
    case RANDOM_TEST:
      return {
        ...state,
        message: action.payload.data.message,
        data: action.payload.data.data,
        // data: action.payload,
      };

    default:
      return state;
  }
}
