import { css } from "styled-components";

const size = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  tesktop: 2560,
};

export default Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${size[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
