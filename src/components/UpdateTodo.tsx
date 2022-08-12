import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTodoById, modifyTodoById } from "../api/todoAPI";

interface TodoDetailType {
  id: string;
  updateTodoHandler: any;
  updateClickHandler: any;
}

function UpdateTodo({
  id,
  updateTodoHandler,
  updateClickHandler,
}: TodoDetailType) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");

  useEffect(() => {
    getTodoById(id)
      .then((res) => res.json())
      .then((res) => {
        setTodoTitle(res.data.title);
        setTodoContent(res.data.content);
      });
  }, []);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };
  const contentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoContent(e.target.value);
  };
  const clickHandler = () => {
    const data = {
      title: todoTitle.toString(),
      content: todoContent.toString(),
    };
    try {
      modifyTodoById(id, data)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) alert("정상적으로 저장되었습니다.");
          if (res.details) alert(res.details);
          updateTodoHandler(true, id, Date.now());
          updateClickHandler(false);
        });
    } catch (e) {
      console.error(e);
    }
  };
  const cancelUpdateClickHandler = () => {
    updateClickHandler(false);
  };
  return (
    <UpdateTodoSection onClick={cancelUpdateClickHandler}>
      <UpdateTodoBox onClick={(e) => e.stopPropagation()}>
        <Close onClick={cancelUpdateClickHandler}>╳</Close>
        <Input
          placeholder='What you have todo?'
          value={todoTitle}
          onChange={titleChangeHandler}
        />
        <TodoDetail
          cols={30}
          rows={10}
          value={todoContent}
          onChange={contentChangeHandler}
        />
        <ButtonContainer>
          <Button onClick={clickHandler}>update Todo</Button>
          <Button onClick={cancelUpdateClickHandler}>cancel</Button>
        </ButtonContainer>
      </UpdateTodoBox>
    </UpdateTodoSection>
  );
}

export default UpdateTodo;

const UpdateTodoSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 5rem;
  left: 0;
`;
const UpdateTodoBox = styled.div`
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
const ButtonContainer = styled.ul`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  margin: 4rem auto 0;
`;
const Button = styled.button`
  display: block;
  width: 10rem;
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
