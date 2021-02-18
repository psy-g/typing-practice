import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    axios
      .post("http://localhost:8080/auth/signout", { credentials: "include" })
      .then((res) => {
        if (res.data.message === "signout") {
          window.localStorage.removeItem("isLogin");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("id");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div onClick={() => this.logout()} className="logoutBtn">
        로그아웃
      </div>
    );
  }
}

export default withRouter(Signout);
