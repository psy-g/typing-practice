import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import rootReducer from "modules";
import "./index.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddlerware, reduxThunk))
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";

// // Redux 관련 불러오기
// import { createStore } from "redux";
// import reducers from "./reducers";
// import { Provider } from "react-redux";

// // 스토어 생성
// const store = createStore(reducers);

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById("root")
// );
