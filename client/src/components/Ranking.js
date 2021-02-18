import React, { Component } from "react";
import Nav from "./Nav";
import "./Ranking.css";
import axios from "axios";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.print = this.print.bind(this);
  }

  print() {
    const items = [];
    const printRank = [];
    const select = document.querySelector(".select_start");
    const selectValue = select.options[select.selectedIndex].text;

    if (selectValue) {
      axios
        .post("http://localhost:8080/ranking/print", {
          title: selectValue,
          // headers: {
          //   "Content-Type": "application/json",
          // },
        })
        .then((res) => {
          res.data.data.forEach((el) => {
            printRank.push({
              name: el.name,
              average: el.average,
              time: el.time,
            });
          });
          for (const [index, value] of printRank.entries()) {
            items.push(
              <div className={`rank__${index}`}>
                {index + 1}등 {value.name} {value.average}타수 {value.time}초
              </div>
            );
          }
          this.setState({ items: items });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("에러");
    }
  }

  componentDidMount() {
    // this.print();
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <Nav />
        <div id="ranking">
          <div className="ranking_list">
            랭킹
            <select
              type="button"
              className="select_start"
              onChange={this.print}
            >
              <option value="select_0">선택</option>
              <option value="select_1">눈 녹듯</option>
              <option value="select_2">말리꽃</option>
              <option value="select-3">오아시스</option>
            </select>
            <div className="rank">{items}</div>
          </div>
          <div className="ranking_detail">자세히</div>
        </div>
      </div>
    );
  }
}

export default Ranking;
