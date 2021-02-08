import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <div>
        <div id="nav">
          <div className="nav">
            <span className="nav_logo">
              <Link to="/">로고</Link>
            </span>
            <span className="nav_btn">버튼</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
