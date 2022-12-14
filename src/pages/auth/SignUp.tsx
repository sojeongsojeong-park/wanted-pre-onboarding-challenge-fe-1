import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signupAPI } from "../../api/authAPI";
import authValidation from "../../function/authValidation";

function SignUp() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const navigator = useNavigate();

  const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdInput(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };
  const signupClickHandler = () => {
    const validCheck = authValidation(idInput, passwordInput);

    if (validCheck) {
      try {
        const data = {
          email: idInput,
          password: passwordInput,
        };

        signupAPI(data)
          .then((res) => res.json())
          .then((res) => {
            if (res.token) {
              navigator("/auth/login");
            }
            if (res.message) alert(res.message);
            if (res.details) alert(res.details);
          });
      } catch (e) {
        console.error(e);
      }
    }
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
        <SignupButton onClick={signupClickHandler}>SignUp</SignupButton>
      </LoginBox>
    </LoginContainer>
  );
}

export default SignUp;

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
const SignupButton = styled.button`
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
