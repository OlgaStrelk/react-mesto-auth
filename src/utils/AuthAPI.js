const BASE_URL = "https://auth.nomoreparties.co";

function checkResponse(res) { 
        return res.ok ? res.json() : Promise.reject(res.status)
    } 


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(res=> checkResponse(res));
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res=> checkResponse(res))
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(res=> checkResponse(res));
};
