import React, { useState, useEffect } from "react";
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
  }, [id]);

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
  const updateClickHandler = () => {
    setUpdateClick(true);
  };

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <ul>
        <li onClick={updateClickHandler}> update </li>
        <li onClick={deleteClickHandler}> delete </li>
      </ul>
      {updateClick && (
        <UpdateTodo
          id={id}
          token={token}
          updateTodoHandler={updateTodoHandler}
        />
      )}
    </>
  );
}

export default TodoDetail;
