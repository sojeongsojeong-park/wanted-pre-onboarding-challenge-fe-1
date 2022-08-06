import React, { useState } from "react";
import styled from "styled-components";

function CreateTodo({ createTodoHandler, token }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");

  const titleChangeHandler = (e) => {
    setTodoTitle(e.target.value);
  };
  const contentChangeHandler = (e) => {
    setTodoContent(e.target.value);
  };
  const clickHandler = async () => {
    const data = {
      title: todoTitle.toString(),
      content: todoContent.toString(),
    };
    try {
      await fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) alert("success!");
          if (res.details) alert(res.details);
          createTodoHandler(false);
        });
    } catch (e) {
      console.error(e);
    }
  };
  const closeClickHandler = () => {
    createTodoHandler(false);
  };
  return (
    <CreateTodoSection onClick={closeClickHandler}>
      <CreateTodoBox onClick={(e) => e.stopPropagation()}>
        <Close onClick={closeClickHandler}>╳</Close>
        <Input
          placeholder='What you have todo?'
          value={todoTitle}
          onChange={titleChangeHandler}
        />
        <TodoDetail
          cols='30'
          rows='10'
          value={todoContent}
          onChange={contentChangeHandler}
        />
        <CreateButton onClick={clickHandler}>create Todo</CreateButton>
      </CreateTodoBox>
    </CreateTodoSection>
  );
}

export default CreateTodo;
const CreateTodoSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 5rem;
  left: 0;
`;
const CreateTodoBox = styled.div`
  width: 30rem;
  height: 30rem;
  background-color: #fff;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  margin: 5rem auto;
  border-radius: 1rem;
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
const TodoDetail = styled.textarea`
  display: block;
  width: 20rem;
  border: 1px solid #ffb4b4;
  margin: 2rem auto;
  resize: none;
  outline: none;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const CreateButton = styled.button`
  display: block;
  width: 20rem;
  height: 3rem;
  font-size: 1.5rem;
  color: #555;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  border-radius: 0.7rem;
  margin: auto;
  &:hover {
    color: #fff;
    background-color: #ffb4b4;
  }
`;
const Close = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  top: 1.5rem;
  left: 27rem;
  cursor: pointer;
`;
