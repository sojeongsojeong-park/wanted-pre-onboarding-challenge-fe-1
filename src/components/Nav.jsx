import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const loginButtonClickHandler = () => {
    navigate("/auth/login");
  };
  const homeButtonClickHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={homeButtonClickHandler}>home</button>
      <button onClick={loginButtonClickHandler}>login</button>
    </div>
  );
}

export default Nav;
