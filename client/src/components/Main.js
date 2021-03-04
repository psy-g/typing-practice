import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import logo from "../image/taza.png";
import btn from "../image/power.png";

// import logo from "../image/logo6.png";
// import logo from "../image/boardland1.png";
// import running from "../image/run2.gif";

// const Circle = styled.div`
//   width: 5rem;
//   height: 5rem;
//   background: ${(state) => state.color || "black"};
//   border-radius: 50%;
// `;

// background: ${(props) => props.color || "black"};
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      checkRun: 10,
    };
  }

  render() {
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      <div>
        <Nav />
        <div id="main">
          <div className="header____tail">
            <div className="header">
              <div className="header_top">
                <img
                  className="header_logo"
                  src={logo}
                  // width="600px"
                  // height="150px"
                  alt="logo"
                />
              </div>
              <div className="header_enter">
                <Link to="/test" className="header_enter_test">
                  INSERT COIN
                </Link>
                <div className="header_enter_tail">@YG 2021</div>
              </div>
            </div>
            <div className="tail">
              <div className="tail_button">
                {!checkLogin ? (
                  <Link to="/signin">
                    <img
                      className="tail_button"
                      src={btn}
                      width="50px"
                      height="50px"
                      alt="btn"
                    />
                  </Link>
                ) : (
                  <Link to="/test">
                    <img
                      className="tail_button"
                      src={btn}
                      width="50px"
                      height="50px"
                      alt="btn"
                    />
                  </Link>
                )}
                {/* <Link to="/signin">
                <img
                  className="tail_button"
                  src={btn}
                  width="50px"
                  height="50px"
                  alt="btn"
                />
              </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div>
// <img src={running} width="200px" height="150px" alt="run" />
// </div>

//  <Running checkRun={this.state.checkRun}>
//  </Running>

// const Running = styled.div`
//   padding-top: 100px;
//   align-items: left;
//   padding-left: ${(props) => {
//     if (props.checkRun === 0) return "0px";
//     if (props.checkRun === 1) return "10px";
//     if (props.checkRun === 2) return "20px";
//     if (props.checkRun === 3) return "30px";
//     if (props.checkRun === 3) return "40px";
//     if (props.checkRun === 4) return "50px";
//     if (props.checkRun === 5) return "60px";
//     if (props.checkRun === 6) return "70px";
//     if (props.checkRun === 7) return "80px";
//     if (props.checkRun === 8) return "90px";
//     if (props.checkRun === 9) return "100px";
//     else return "0px";
//   }};
// `;

export default Main;
