import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UpdateTodo from "./UpdateTodo";

function TodoDetail({ id, token, updateTodoHandler }) {
  const [data, setData] = useState({});
  const [updateClick, setUpdateClick] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.data));
    })();
  }, [id, updateClick]);

  const deleteClickHandler = async () => {
    if (window.confirm("are you sure to delete?")) {
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data === null) alert("deleted!");
          updateTodoHandler(false, "");
        });
    } else {
      console.log("alive");
    }
  };
  const updateClickHandler = (value) => {
    setUpdateClick(value);
  };

  return (
    <TodoDetailBox>
      <TodoTitle>{data.title}</TodoTitle>
      <TodoContent>{data.content}</TodoContent>
      <ButtonContainer>
        <Button onClick={() => updateClickHandler(true)}> update </Button>
        <Button onClick={deleteClickHandler}> delete </Button>
      </ButtonContainer>
      {updateClick && (
        <UpdateTodo
          id={id}
          token={token}
          updateTodoHandler={updateTodoHandler}
          updateClickHandler={updateClickHandler}
        />
      )}
    </TodoDetailBox>
  );
}

export default TodoDetail;

const TodoDetailBox = styled.article`
  width: 15rem;
  height: 20rem;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  border-radius: 1rem;
  position: absolute;
  top: 20rem;
  left: calc(65vw - 7.5rem);
`;
const TodoTitle = styled.h2`
  text-align: center;
  margin: 1rem 0;
`;
const TodoContent = styled.p`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
`;

const ButtonContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 0;
`;

const Button = styled.li`
  display: block;
  width: 5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: #555;
  text-align: center;
  line-height: 2.5rem;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  border-radius: 0.7rem;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #ffb4b4;
  }
`;
