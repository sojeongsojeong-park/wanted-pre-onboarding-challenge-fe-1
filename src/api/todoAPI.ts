import baseUrl from "./baseURL";

const token: string | null = localStorage.getItem("token");
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("Authorization", token!);

interface dataType {
  title: string;
  content: string;
}

export const getAllTodo = () => {
  const allTodo = fetch(`${baseUrl}/todos`, {
    method: "GET",
    headers: requestHeaders,
  });
  return allTodo;
};
export const createTodo = (data: dataType) => {
  const newTodo = fetch("http://localhost:8080/todos", {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  return newTodo;
};
export const getTodoById = (id: string) => {
  const getTodoById = fetch(`${baseUrl}/todos/${id}`, {
    method: "GET",
    headers: requestHeaders,
  });
  return getTodoById;
};
export const deleteTodoById = (id: string) => {
  const deleteTodo = fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: requestHeaders,
  });
  return deleteTodo;
};
export const modifyTodoById = (id: string, data: dataType) => {
  const modifyTodoById = fetch(`${baseUrl}/todos/${id}`, {
    method: "PUT",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return modifyTodoById;
};
