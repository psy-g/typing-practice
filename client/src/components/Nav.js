// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "./Nav.css";
// import Signout from "./Signout";

// //
// import { connect } from "react-redux";
// import * as actions from "../actions";

// class Nav extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // isOpen: false,
//       // isOpen: false,
//     };
//   }

//   // openBurger = () => {
//   //   this.setState({ isOpen: true });
//   // };
//   // closeBurger = () => {
//   //   this.setState({ isOpen: false });
//   // };

//   render() {
//     // const { isOpen } = this.state;
//     const loginCheck = window.localStorage.getItem("isLogin");

//     //
//     const { isOpen, openStoreNav, closeStoreNav } = this.props;
//     console.log({
//       isOpen: isOpen,
//       open: openStoreNav(),
//       close: closeStoreNav(),
//     });

//     return (
//       <div>
//         <div id="nav">
//           <div className="nav">
//             <span className="nav_logo">
//               <Link to="/" className="nav_logo_font">
//                 타자치자
//               </Link>
//             </span>
//             {/* {isOpen ? ( */}
//             {isOpen ? (
//               <div className="burger_container">
//                 <div className="bunger_container_header">
//                   {/* <div className="burger_icon" onClick={this.closeBurger}>
//                     &times;&nbsp;
//                   </div> */}
//                   <div className="burger_icon" onClick={closeStoreNav}>
//                     &times;&nbsp;
//                   </div>
//                 </div>
//                 {loginCheck ? (
//                   <div className="burger">
//                     <div className="burger_home">
//                       <div className="buger_home_home">
//                         <Link to="/">
//                           <span>🏠</span> 홈
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="burger_close">
//                       <div className="burger_close_logout">
//                         <Signout />
//                       </div>
//                       <div className="burger_close_ranking">
//                         <Link to="/ranking">
//                           <span className="buger_ranking_icon">🏆</span> 순위
//                         </Link>
//                       </div>
//                       <div className="burger_close_test">
//                         <Link to="/test">
//                           <span className="buger_test_icon">⌨</span> 타자연습
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="burger">
//                     <div className="burger_home">
//                       <div className="buger_home_home">
//                         <Link to="/">
//                           <span>🏠</span> 홈
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="burger_close">
//                       <div className="burger_close_signin">
//                         <Link to="/signin">
//                           <span className="buger_signup_icon">🖥</span> 로그인
//                         </Link>
//                       </div>
//                       <div className="burger_close_ranking">
//                         <Link to="/ranking">
//                           <span className="buger_ranking_icon">🏆</span> 랭킹
//                         </Link>
//                       </div>
//                       <div className="burger_close_test">
//                         <Link to="/test">
//                           <span className="buger_test_icon">⌨</span> 타자연습
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="bad">
//                 {/* <span className="burger_open" onClick={this.openBurger}>
//                   &#9776;
//                 </span> */}
//                 <span className="burger_open" onClick={openStoreNav}>
//                   &#9776;
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// //
// const mapStateToProps = (state) => ({
//   // storeNav: state.count.count,
//   isOpen: state.nav.isOpen,
// });

// const mapDispatchToProps = (dispatch) => ({
//   openStoreNav: () => dispatch(actions.openNav()),
//   closeStoreNav: () => dispatch(actions.closeNav()),
// });

// // export default Nav;
// export default connect(mapStateToProps, mapDispatchToProps)(Nav);

// import React, { useEffect, useState, useCallback } from "react";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Nav.css";
import Signout from "./Signout";
import * as actions from "../actions/nav";

const Nav = () => {
  const dispatch = useDispatch();
  const [navCheck, setNavCheck] = useState(0);
  const loginCheck = window.localStorage.getItem("isLogin");

  const openNav = useCallback(() => {
    setNavCheck(navCheck + 1);
    dispatch(actions.openNav());
  }, [navCheck, dispatch]);

  const closeNav = useCallback(() => {
    setNavCheck(navCheck - 1);
    dispatch(actions.closeNav());
  }, [navCheck, dispatch]);

  // useEffect(() => {
  //   console.log("Component did mount.");
  // }, []);

  return (
    <div>
      <div id="nav">
        <div className="nav">
          <span className="nav_logo">
            <Link to="/" className="nav_logo_font">
              타자치자
            </Link>
          </span>
          {navCheck !== 0 ? (
            <div className="burger_container">
              <div className="bunger_container_header">
                <div className="burger_icon" onClick={closeNav}>
                  &times;&nbsp;
                </div>
              </div>
              {loginCheck ? (
                <div className="burger">
                  <div className="burger_home">
                    <div className="buger_home_home">
                      <Link to="/">
                        <span>🏠</span> 홈
                      </Link>
                    </div>
                  </div>
                  <div className="burger_close">
                    <div className="burger_close_logout">
                      <Signout />
                    </div>
                    <div className="burger_close_ranking">
                      <Link to="/ranking">
                        <span className="buger_ranking_icon">🏆</span> 순위
                      </Link>
                    </div>
                    <div className="burger_close_test">
                      <Link to="/test">
                        <span className="buger_test_icon">⌨</span> 타자연습
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="burger">
                  <div className="burger_home">
                    <div className="buger_home_home">
                      <Link to="/">
                        <span>🏠</span> 홈
                      </Link>
                    </div>
                  </div>
                  <div className="burger_close">
                    <div className="burger_close_signin">
                      <Link to="/signin">
                        <span className="buger_signup_icon">🖥</span> 로그인
                      </Link>
                    </div>
                    <div className="burger_close_ranking">
                      <Link to="/ranking">
                        <span className="buger_ranking_icon">🏆</span> 순위
                      </Link>
                    </div>
                    <div className="burger_close_test">
                      <Link to="/test">
                        <span className="buger_test_icon">⌨</span> 타자연습
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bad">
              <span className="burger_open" onClick={openNav}>
                &#9776;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
