import React, { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoDetail from "../components/TodoDetail";

const token = localStorage.getItem("token");

function Todo() {
  const [createState, setCreateState] = useState(false);
  const [getTodo, setGetTodo] = useState([]);
  const [clickedId, setClickedId] = useState({
    state: false,
    id: "",
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
  }, [createState]);

  const addTodoClickHandler = () => {
    setCreateState(true);
  };
  const createTodoHandler = (value) => {
    setCreateState(value);
  };
  const TodoLiClickHandler = (e) => {
    setClickedId({ state: true, id: e.target.id });
  };
  return (
    <div>
      <button onClick={addTodoClickHandler}> + add todo</button>
      <ul>
        {getTodo.map((data, idx) => {
          return (
            <li key={idx} id={data.id} onClick={TodoLiClickHandler}>
              {data.title}
            </li>
          );
        })}
      </ul>
      {clickedId.state && <TodoDetail id={clickedId.id} token={token} />}
      {createState && (
        <CreateTodo createTodoHandler={createTodoHandler} token={token} />
      )}
    </div>
  );
}

export default Todo;
