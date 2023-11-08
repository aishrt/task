import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/navbar";
import "./auth.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let result = axios
      .post("http://localhost:4000/v1/auth/login", {
        email: formvalue.email,
        password: formvalue.password,
      })
      .then((result) => {
        console.log(result, "resultresultresultresultresultresultresult");

        if (result?.data?.status === "200") {
          localStorage.setItem("token", result?.data?.tokens?.access?.token);
          localStorage.setItem("user", JSON.stringify(result?.data?.data));
          localStorage.setItem("userRole", result?.data?.data?.role);
          toast.success(result?.data?.message);
          window.location.reload();
          navigate("/");
        } else {
          toast.error(result?.data?.message);
        }
      })

      .catch((error) => {
        console.log("Db not connected : ", result);
        toast.error("Db not connected");
      });
  };

  return (
    <>
      <div className="container">
        <div className="row form-main loginDivz">
          <div className="formDiv shadow">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    value={formvalue.email}
                    name="email"
                    onChange={handleChange}
                    autoComplete="on"
                  ></input>
                </div>
                <div className="passWordDiv">
                  <label htmlFor="">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formvalue.password}
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <span
                    className="eyeSpan"
                    id="togglePassword"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </span>
                </div>
              </div>

              <div className="row button-div">
                <button className="button-css" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
          <p className="linkText" onClick={() => navigate("/register")}>
            Sign up as new user!
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
