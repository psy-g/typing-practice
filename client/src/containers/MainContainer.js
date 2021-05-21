import React from "react";
import Main from "../components/Main";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
  //   scrollTest() {
  //     $(document).ready(function () {
  //       $("#main").on("scroll", function () {
  //         // var scrollValue = $("#main").scrollTop();
  //         //   console.log("스크롤위치", scrollValue);

  //         // var scrollValue2 = $(".scroll_icon-img1").offset();
  //         // console.log("대상의위치값", scrollValue2);
  //         let scrollLocation = document.querySelector("#main").scrollTop; // 현재 스크롤바 위치
  //         let windowHeight = window.innerHeight; // 스크린 창
  //         let fullHeight = document.querySelector("#main").scrollHeight; //  margin 값은 포함 x

  //         // console.log("스크롤 위치는?", scrollLocation);

  //         const scrollImg = document.querySelector(".scroll_icon");

  //         // 스크롤 끝
  //         if (scrollLocation + windowHeight >= fullHeight) {
  //           scrollImg.style.display = `none`;
  //           // console.log("끝");
  //         } else {
  //           scrollImg.style.display = `block`;
  //         }
  //       });
  //     });
  //   }

  //   componentDidMount() {
  //     this.scrollTest();
  //   }

  return <Main isLogged={isLogged} />;
};

export default MainContainer;
