import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

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
  const signupClickHandler = () => {
    if (!emailValidation) {
      alert("이메일을 확인해 주세요.");
    } else if (passwordValidation) {
      alert("비밀번호는 8자 이상이어야 합니다.");
    }
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    if (emailValidation && !passwordValidation) {
      try {
        const data = {
          email: idInput,
          password: passwordInput,
        };

        fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
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
    <div>
      <input
        type='text'
        placeholder='아이디를 입력하세요'
        value={idInput}
        onChange={idChangeHandler}
      />
      <input
        type='password'
        placeholder='비밀번호를 입력하세요'
        value={passwordInput}
        onChange={passwordChangeHandler}
      />
      <button onClick={signupClickHandler}>Login</button>
    </div>
  );
}

export default Login;
