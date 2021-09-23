import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import NavLogo from "components/nav/NavLogo";
import NavMenu from "components/nav/NavMenu";

const NavContainer = () => {
  const userState = useSelector((state) => state.user.isLogged);

  return (
    <>
      <Container>
        <Wrapper>
          <NavLogo />
          <NavMenu isLogged={userState} />
        </Wrapper>
      </Container>
      <Space />
    </>
  );
};

export default NavContainer;

const Container = styled.header`
  position: fixed;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #30a9de;
`;

const Space = styled.div`
  width: 100%;
  height: 10vh;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
