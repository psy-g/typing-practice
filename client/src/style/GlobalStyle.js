import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    @font-face {
    font-family: 'BMJUA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    }


    body {
    font-family: "BMJUA", sans-serif;
    -ms-overflow-style: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    body::-webkit-scrollbar {
    display: none;
    }

    html {
    background: #30a9de; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to bottom,
        #30a9de,
        #30a9de
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to bottom,
        #30a9de,
        #30a9de
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    height: auto !important;
    }

    .app {
    width: 100%;
    height: 100vh;
    /* overflow: auto; */
    }

    a {
    text-decoration: none;
    color: black;
    }
`;

export default GlobalStyle;
