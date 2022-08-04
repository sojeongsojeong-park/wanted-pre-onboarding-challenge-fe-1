import React, { useState, useEffect } from "react";

function TodoDetail({ id, token }) {
  const [data, setData] = useState({});

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

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <ul>
        <li> update </li>
        <li> delete </li>
      </ul>
    </>
  );
}

export default TodoDetail;
