export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => dispatch =>
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5_YL3QvR5pRiskcAXx2g90UA0P4LA7x0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    })
  })
    .then((response) => response.json())
    .then((resData) => {
      console.log(resData, "resData");
      return dispatch({ type: SIGNUP });
    });

export const login = (email, password) => dispatch =>
  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5_YL3QvR5pRiskcAXx2g90UA0P4LA7x0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    })
  })
    .then((response) => response.json())
    .then((resData) => {
      console.log(resData, "resData");
      return dispatch({ type: LOGIN });
    });