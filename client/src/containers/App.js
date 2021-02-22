import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Main from "../components/Main";
import Test from "../components/Test";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Ranking from "../components/Ranking";
import Mypage from "../components/Mypage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/signin" render={() => <Signin />} />
          <Route exact path="/ranking" render={() => <Ranking />} />
          <Route exact path="/test" render={() => <Test />} />
          <Route exact path="/mypage" render={() => <Mypage />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
