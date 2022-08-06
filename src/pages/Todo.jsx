import React, { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoDetail from "../components/TodoDetail";
import styled from "styled-components";

const token = localStorage.getItem("token");

function Todo() {
  const [createState, setCreateState] = useState(false);
  const [getTodo, setGetTodo] = useState([]);
  const [clickedId, setClickedId] = useState({
    state: false,
    id: "",
    timing: "",
  });
  useEffect(() => {
    (async () => {
      await fetch("http://localhost:8080/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => setGetTodo(res.data));
    })();
  }, [createState, clickedId.timing]);

  const createTodoHandler = (value) => {
    setCreateState(value);
  };
  const updateTodoHandler = (value, id, timing) => {
    setClickedId({ state: value, id: id, timing: timing });
  };
  const TodoLiClickHandler = (e) => {
    setClickedId({ state: true, id: e.target.id, timing: "" });
  };
  return (
    <TodoContainer>
      <AddTodo onClick={() => createTodoHandler(true)}> + add todo</AddTodo>
      <TodoUl isClicked={clickedId.state}>
        {getTodo.map((data, idx) => {
          return (
            <TodoLi
              key={idx}
              id={data.id}
              onClick={TodoLiClickHandler}
              value={clickedId.id}
            >
              ✓ &nbsp; {data.title}
            </TodoLi>
          );
        })}
      </TodoUl>
      {clickedId.state && (
        <TodoDetail
          updateTodoHandler={updateTodoHandler}
          id={clickedId.id}
          token={token}
        />
      )}
      {createState && (
        <CreateTodo createTodoHandler={createTodoHandler} token={token} />
      )}
    </TodoContainer>
  );
}

export default Todo;

const AddTodo = styled.button`
  display: block;
  width: 15rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 0.7rem;
  background-color: #fff;
  border: 1px solid #ffb4b4;
  color: #555;
  margin: 5rem auto;
  &:hover {
    background-color: #ffb4b4;
    color: #fff;
  }
`;

const TodoContainer = styled.div`
  width: 100vw;
`;
const TodoUl = styled.ul`
  width: 15rem;
  margin: ${(props) => (props.isClicked ? "0 calc(35vw - 7.5rem)" : "auto")};
`;
const TodoLi = styled.li`
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ffb4b4;
    color: #fff;
  }
  background-color: ${(props) =>
    props.id === props.value ? "#ffb4b4" : "#fff"};
  color: ${(props) => (props.id === props.value ? "#fff" : "#555")};
`;
