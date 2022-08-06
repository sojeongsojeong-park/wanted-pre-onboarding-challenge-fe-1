import React, { useState } from "react";
import styled from "styled-components";

function SignUp() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailValidation = emailRegex.test(idInput);
  const passwordValidation = passwordInput.length < 8;

  const idChangeHandler = (e) => {
    setIdInput(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };
  const signupClickHandler = async () => {
    if (!emailValidation) {
      alert("이메일을 확인해 주세요.");
    } else if (passwordValidation) {
      alert("비밀번호는 8자 이상이어야 합니다.");
    }
    if (emailValidation && !passwordValidation) {
      try {
        const data = {
          email: idInput,
          password: passwordInput,
        };

        await fetch("http://localhost:8080/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.token) localStorage.setItem("token", res.token);
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
