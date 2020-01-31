import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChanges = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  console.log(credentials);

  const submitLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push('/protected');
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitLogin}>
        <input type="text" name="username" placeholder="Please enter username" onChange={handleChanges} />
        <input type="password" name="password" placeholder="Please enter password" onChange={handleChanges} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
