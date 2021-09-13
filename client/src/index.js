import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Store, persistor } from "modules";
import GlobalStyle from "style/GlobalStyle";
import Routes from "Routes";

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <GlobalStyle />
        <Routes />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
