import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const submitLogin = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        // console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push('/protected');
      })
      .catch(err => console.log(err))
  }

  const handleChanges = e => {
    // e.persist();
    // setCredentials({
    //   ...credentials,
    //   [e.target.name]: e.target.value
    // })
    e.persist();
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value
    }));
  }

  console.log(credentials);

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
