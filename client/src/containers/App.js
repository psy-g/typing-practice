import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Main from "../components/Main";
import Test from "../components/Test";
import Signup from "../components/Signup";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/test" render={() => <Test />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
