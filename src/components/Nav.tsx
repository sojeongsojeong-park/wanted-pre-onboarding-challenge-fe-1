import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface NavProps {
  handleLoginToken: any;
  token: string;
}

function Nav({ handleLoginToken, token }: NavProps) {
  const logoutClickHandler = () => {
    localStorage.removeItem("token");
    handleLoginToken(null);
    alert("logout!");
  };

  return (
    <NavContainer>
      <HomeButton to='/'>TODO</HomeButton>
      {token === null ? (
        <LoginButton to='/auth/login'>LOGIN</LoginButton>
      ) : (
        <LoginButton to='/' onClick={logoutClickHandler}>
          LOGOUT
        </LoginButton>
      )}
    </NavContainer>
  );
}

export default Nav;

const NavContainer = styled.nav`
  width: 100vw;
`;

const LoginButton = styled(NavLink)`
  display: block;
  width: 6rem;
  height: 2.3rem;
  line-height: 2.3rem;
  padding: 0.5rem 0;
  text-align: center;
  color: #555;
  font-size: 1.5rem;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  cursor: pointer;
  border-radius: 0.7rem;
  position: relative;
  top: -4.2rem;
  left: 80vw;
  &:hover {
    background-color: #ffb4b4;
    color: #fff;
  }
`;
const HomeButton = styled(NavLink)`
  display: block;
  color: #ffb4b4;
  width: 8rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  margin: 1rem auto;
  font-size: 2rem;
  cursor: pointer;
`;
