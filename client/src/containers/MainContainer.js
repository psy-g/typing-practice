import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";

import Main from "components/Main";

const MainContainer = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    scrollCheck();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollCheck = () => {
    const div = document.querySelector("#root div:nth-child(3)");

    $("#root div:nth-child(3)").on("scroll", function () {
      // 스크롤바 위치, 스크린 높이, 브라우저 화면 전체 높이
      const scrollValue = $("#root div:nth-child(3)").scrollTop();
      const windowHeight = window.innerHeight;
      const fullHeight = div.scrollHeight;

      // 스크롤바 끝까지 내려오면(아이콘 숨김)
      if (scrollValue + windowHeight >= fullHeight) {
        setScrollEnd({
          ...scrollEnd,
          scrollEnd: true,
        });
      } else {
        setScrollEnd({
          ...scrollEnd,
          scrollEnd: false,
        });
      }
    });
  };

  return <Main isLogged={isLogged} scrollEnd={scrollEnd} />;
};

export default MainContainer;
