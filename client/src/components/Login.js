import React, { useState } from "react";
import axios from "axios";

import loginImg from "../assets/user.svg";

export const Login = props => {
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
    <div className="login">
      <h1>Welcome to the Bubble App!</h1>
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form className="login-form" onSubmit={submitLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={handleChanges} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="password-input" type="password" name="password" placeholder="password" onChange={handleChanges} />
            </div>
            <div className="forgot-pw-div">
              <p className="forgot-password">Forgot your password?</p>
            </div>
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};



