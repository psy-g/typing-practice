import * as navActions from "../actions/nav";

// 초기 상태를 정의
const initialState = {
  isOpen: false,
};

const reducers = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case navActions.OPEN_NAV: {
      return {
        ...state,
        isOpen: state.isOpen + 1,
      };
    }
    case navActions.CLOSE_NAV: {
      return {
        ...state,
        isOpen: state.isOpen - 1,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;

// function nav(state = initialState, action) {
//   switch (action.type) {
//     case types.OPEN_NAV:
//       return {
//         ...state,
//         isOpen: true,
//       };
//     case types.CLOSE_NAV:
//       return {
//         ...state,
//         isOpen: false,
//       };
//     default:
//       return state;
//   }
// }

// export default nav;
