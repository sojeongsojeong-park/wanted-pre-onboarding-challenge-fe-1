import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Nav from "./components/Nav";
import Todo from "./pages/Todo";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const handleLoginToken = (value: string | null) => {
    setIsLoggedIn(value);
  };

  return (
    <BrowserRouter>
      <Nav handleLoginToken={handleLoginToken} token={isLoggedin!}></Nav>
      <Routes>
        <Route path='/' element={<Todo />} />
        <Route
          path='/auth/login'
          element={<Login handleLoginToken={handleLoginToken} />}
        />
        <Route path='/auth/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
