import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Main from "containers/MainContainer";
import Nav from "components/nav/NavContainer";
import Signin from "containers/SigninContainer";
import Signup from "containers/SignupContainer";
// import Test from "containers/TestContainer";
import Test from "components/test/TestContainer";
import Ranking from "components/ranking/RankingContainer";
import theme from "style/theme";

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/ranking" component={Ranking} />
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(Routes);
