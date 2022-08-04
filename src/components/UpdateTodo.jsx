import React, { useState, useEffect } from "react";

function UpdateTodo({ id, updateTodoHandler, token }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");

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
        .then((res) => {
          setTodoTitle(res.data.title);
          setTodoContent(res.data.content);
        });
    })();
  }, []);

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
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) alert("정상적으로 저장되었습니다.");
          if (res.details) alert(res.details);
          updateTodoHandler(false, "");
        });
    } catch (e) {
      console.error(e);
    }
  };
  const cancelUpdateClickHandler = () => {
    updateTodoHandler(false, "");
  };
  return (
    <>
      <input
        placeholder='What you have todo?'
        value={todoTitle}
        onChange={titleChangeHandler}
      />
      <textarea
        cols='30'
        rows='10'
        value={todoContent}
        onChange={contentChangeHandler}
      />
      <button onClick={clickHandler}>update Todo</button>
      <button onClick={cancelUpdateClickHandler}>cancel</button>
    </>
  );
}

export default UpdateTodo;
