import React from "react";
import styled from "styled-components/macro";

import { ProfileInfo } from "constant";

const NavFooter = () => {
  return (
    <FooterBlock>
      <Link href={ProfileInfo.BLOG} target="_blank" rel="noopener noreferrer">
        블로그
      </Link>
      <Link href={ProfileInfo.EMAIL}>이메일</Link>
      <Link href={ProfileInfo.GITHUB} target="_blank" rel="noopener noreferrer">
        깃허브
      </Link>
    </FooterBlock>
  );
};

export default NavFooter;

const FooterBlock = styled.div`
  width: 100%;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  display: none;

  @media all and (max-width: 767px) {
    display: flex;
  }
`;

const Link = styled.a`
  color: #fafafa;
  font-family: "HeirofLightRegular";
  font-size: 18px;
  margin-left: 15px;
  opacity: 0.6;

  &:hover {
    color: #fafafa;
    font-family: "HeirofLightRegular";
    font-size: 18px;
    margin-left: 15px;
    opacity: 1;
  }
`;
