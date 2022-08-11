import React, { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoDetail from "../components/TodoDetail";
import styled from "styled-components";

interface TodoType {
  clickedId: { state: boolean; id: string; timing: string };
  todoData: { id: string; title: string };
}

const token: string | null = localStorage.getItem("token");
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("Authorization", token!);

function Todo() {
  const [createState, setCreateState] = useState(false);
  const [getTodo, setGetTodo] = useState([]);
  const [clickedId, setClickedId] = useState<TodoType["clickedId"]>({
    state: false,
    id: "",
    timing: "",
  });
  useEffect(() => {
    fetch("http://localhost:8080/todos", {
      method: "GET",
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => setGetTodo(res.data));
  }, [createState, clickedId.timing]);

  const createTodoHandler = (value: boolean) => {
    setCreateState(value);
  };
  const updateTodoHandler = (value: boolean, id: string, timing: string) => {
    setClickedId({ state: value, id: id, timing: timing });
  };
  const TodoLiClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e);

    setClickedId({
      state: true,
      id: (e.target as HTMLLIElement).id,
      timing: "",
    });
  };
  return (
    <TodoContainer>
      <AddTodo onClick={() => createTodoHandler(true)}> + add todo</AddTodo>
      <TodoUl isClicked={clickedId.state}>
        {getTodo.map((data: TodoType["todoData"], idx) => {
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
          token={token!}
        />
      )}
      {createState && (
        <CreateTodo createTodoHandler={createTodoHandler} token={token!} />
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
const TodoUl = styled.ul<{ isClicked: boolean }>`
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
