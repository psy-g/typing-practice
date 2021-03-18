// Action type
export const OPEN_NAV = "nav/OPEN_NAV";
export const CLOSE_NAV = "nav/CLOSE_NAV";

// Action creator
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
