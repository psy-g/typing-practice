import React, { Component } from "react";
import "./Main.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import running from "../image/run2.gif";

class Main extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div id="main">
          <div className="header"></div>
          <div className="main_body">
            <div className="main_body_running">
              <img
                // className="main_body_running"
                src={running}
                width="200px"
                height="150px"
                alt="run"
              />
            </div>
          </div>
          <div className="enter">
            <Link to="/test">들어가기</Link>
          </div>
          <div className="tail">하</div>
        </div>
      </div>
    );
  }
}

export default Main;

// import React, { Component } from "react";
// import "./Main.css";
// import Nav from "./Nav";
// import { Link } from "react-router-dom";

// class Main extends Component {
//   render() {
//     return (
//       <div>
//         <Nav />
//         <div id="main">
//           <div className="header"></div>
//           <div className="login">
//             {/* <div className="login-box">
//               <div className="out-box">
//                 <i className="in-box"></i>
//               </div>
//               <p>Loading...</p>
//             </div> */}
//           </div>
//           <div className="enter">
//             <Link to="/test">들어가기</Link>
//           </div>
//           <div className="tail">하</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Main;
