import React from "react";
import styled from "styled-components/macro";

const NavLogo = () => {
  return (
    <LogoBlock href="/" title="홈으로 이동합니다">
      타자치자
    </LogoBlock>
  );
};

export default NavLogo;

const LogoBlock = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-left: 15px;
  font-size: 1.8rem;
  color: white;
`;
