import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormvalue({
      ...formvalue,
      [event.target.name]: event.target.value,
    });
  };
  const lognav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let result = axios
      .post("http://localhost:4000/login", {
        email: formvalue.email,
        password: formvalue.password,
      })

      .then((result) => {
        if (result.data.status === "success") {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          toast.success(result.data.message);
          window.location.reload();
          lognav("/home");
        } else {
          // alert("Login failed due to : ", result.data.message);
          console.log("Login Failed : ", result.data.message);
          toast.error(result.data.message);
        }
      })

      .catch((error) => {
        console.log("Db not connected : ", result);
        toast.error("Db not connected");
      });
  };

  return (
    <>
      <Header />
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={formvalue.email}
            name="email"
            onChange={handleChange}
            autoComplete="on"
          ></input>

          <label htmlFor="">Password</label>
          <input
            type="password"
            value={formvalue.password}
            name="password"
            onChange={handleChange}
            autoComplete="off"
          ></input>

          <button color="primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
