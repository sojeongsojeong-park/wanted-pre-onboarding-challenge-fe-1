import React, { useState } from "react";

function SignUp() {
  const [idInput, setIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const idChangeHandler = (e) => {
    setIdInput(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value);
  };
  const signupClickHandler = () => {
    const data = {
      email: idInput,
      password: passwordInput,
    };

    fetch("http://localhost:8080/users/create", {
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
      <button onClick={signupClickHandler}>SignUp</button>
    </div>
  );
}

export default SignUp;
