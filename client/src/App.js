import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";

import Main from "./containers/MainContainer";
import Nav from "./containers/NavContainer";
import Signin from "./containers/SigninContainer";

// import Main from "../components/Main";
// import Test from "../components/Test";
// import Signin from "../components/Signin";
// import Ranking from "../components/Ranking";
// import Mypage from "../components/Mypage";

const App = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </>
  );
};

export default withRouter(App);

// class App extends Component {
//   render() {
//     return (
//       <div className="app">
//         <Switch>
//           <Route exact path="/" render={() => <Main />} />
//           <Route exact path="/signin" render={() => <Signin />} />
//           <Route exact path="/ranking" render={() => <Ranking />} />
//           <Route exact path="/test" render={() => <Test />} />
//           <Route exact path="/mypage" render={() => <Mypage />} />
//         </Switch>
//       </div>
//     );
//   }
// }

// export default withRouter(App);
