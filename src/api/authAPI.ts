import { useNavigate } from "react-router-dom";
import baseUrl from "./baseURL";

interface dataType {
  email: string;
  password: string;
}

export const signupAPI = (data: dataType) => {
  const res = fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
export const loginAPI = (data: dataType) => {
  const res = fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
