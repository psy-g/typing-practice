// Action types
export const OPEN_NAV = "nav/OPEN_NAV";
export const CLOSE_NAV = "nav/CLOSE_NAV";

// Action creators
export const openNav = () => {
  return {
    type: OPEN_NAV,
  };
};

export const closeNav = () => {
  return {
    type: CLOSE_NAV,
  };
};

// export const openNav = () => ({
//   type: types.OPEN_NAV,
// });

// export const closeNav = () => ({
//   type: types.CLOSE_NAV,
// });
