import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginAPI } from "../../api/authAPI";
import authValidation from "../../function/authValidation";

function Login({ handleLoginToken }: any) {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };
  const loginClickHandler = () => {
    const validCheck = authValidation(idInput, passwordInput);

    if (validCheck) {
      try {
        const data = {
          email: idInput,
          password: passwordInput,
        };

        loginAPI(data)
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
              localStorage.setItem("token", res.token);
              handleLoginToken(res.token);
              navigate("/");
            }
            if (res.message) alert("login success!");
            if (res.details) alert(res.details);
          });
      } catch (e) {
        console.error(e);
      }
    }
  };
  const signupClickHandler = () => {
    navigate("/auth/signup");
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Input
          type='text'
          placeholder='email'
          value={idInput}
          onChange={idChangeHandler}
        />
        <Input
          type='password'
          placeholder='password'
          value={passwordInput}
          onChange={passwordChangeHandler}
        />
        <LoginButton onClick={loginClickHandler}> Login </LoginButton>
        <DivideLine />
        <Para>if you don't have account</Para>
        <SignupButton onClick={signupClickHandler}> Sign up </SignupButton>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  width: 100vw;
`;
const LoginBox = styled.div`
  width: 30rem;
  height: 20rem;
  margin: 5rem auto;
`;

const Input = styled.input`
  display: block;
  width: 20rem;
  height: 2rem;
  border: none;
  border-bottom: 1px solid #ffb4b4;
  margin: 2rem auto;
  outline: none;
`;
const LoginButton = styled.button`
  width: 6rem;
  height: 6rem;
  font-size: 1.5rem;
  color: #555;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  position: relative;
  top: -8rem;
  left: 27rem;
  border-radius: 0.7rem;
  &:hover {
    color: #fff;
    background-color: #ffb4b4;
  }
`;
const DivideLine = styled.hr`
  width: 1rem;
  height: 1rem;
  border: none;
  background-color: #ffb4b4;
  display: block;
  margin: -5rem auto;
  transform: rotate(-45deg);
`;
const Para = styled.p`
  width: 11rem;
  text-align: center;
  color: #555;
  margin: 8rem auto 2rem;
`;

const SignupButton = styled.button`
  width: 11rem;
  height: 3rem;
  font-size: 1.5rem;
  color: #555;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  position: relative;
  left: 9.5rem;
  border-radius: 0.7rem;
  &:hover {
    color: #fff;
    background-color: #ffb4b4;
  }
`;
