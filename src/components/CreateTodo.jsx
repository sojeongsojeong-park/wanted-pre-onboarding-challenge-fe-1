import React, { useState } from "react";

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
          if (res.data) alert("정상적으로 저장되었습니다.");
          if (res.details) alert(res.details);
          createTodoHandler(false);
        });
    } catch (e) {
      console.error(e);
    }
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
      <button onClick={clickHandler}>create Todo</button>
    </>
  );
}

export default CreateTodo;
