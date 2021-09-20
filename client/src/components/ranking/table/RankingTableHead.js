import React from "react";
import styled from "styled-components";

import arrow from "image/arrow2.png";

const RankingTableHead = () => {
  return (
    <HeadBlock>
      <Dropdown>
        {/* <DropBtn onClick={selectBtn}>
          <span ref={titleName}>{title}</span>
          <img src={arrow} alt="arrow" />
        </DropBtn> */}
        {/* <Menu ref={dropMenu} toggle={toggle}>
          <span onClick={() => print("님의 손길")}>님의 손길</span>
          <span onClick={() => print("광야")}>광야</span>
          <span onClick={() => print("진달래꽃")}>진달래꽃</span>
        </Menu> */}
      </Dropdown>
    </HeadBlock>
  );
};

export default RankingTableHead;

const HeadBlock = styled.div`
  display: flex;
  height: 7%;
`;

const Dropdown = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

const DropBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: max(15px, 0.6vw);
  color: white;
  background-color: #4e4e4e;
  width: 22%;
  height: 40%;
  min-height: 20px;
  border-radius: 5px 5px 0px 0px;
  outline: none;

  span {
    width: 100%;
  }

  img {
    display: flex;
    width: 15%;
    min-width: 18px;
    max-width: 25px;
  }

  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
  }

  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: ${(props) => (props.toggle ? "block" : "none")};
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px 0px 5px 5px;

  span {
    background-color: #1a1919;
    color: white;
    padding: 12px 16px;
    display: block;

    &:hover {
      background-color: #353535;
    }
  }

  show {
    display: block;
  }
`;
