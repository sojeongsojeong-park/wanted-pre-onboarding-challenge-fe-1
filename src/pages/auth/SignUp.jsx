import React, { useState } from "react";

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
    <div>
      <input
        type='text'
        placeholder='email'
        value={idInput}
        onChange={idChangeHandler}
      />
      <input
        type='password'
        placeholder='password'
        value={passwordInput}
        onChange={passwordChangeHandler}
      />
      <button onClick={signupClickHandler}>SignUp</button>
    </div>
  );
}

export default SignUp;
