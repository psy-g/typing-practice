import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { BrowserRouter as Router } from "react-router-dom";

// Redux 관련 불러오기
// import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import createStore from "./store";

// 스토어 생성
const store = createStore(reducers);

// const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// // Redux 관련 불러오기
// import { createStore } from "redux";
// import reducers from "./reducers";
// import { Provider } from "react-redux";

// // 스토어 생성
// const store = createStore(reducers);

// // const rootElement = document.getElementById("root");

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById("root")
// );
