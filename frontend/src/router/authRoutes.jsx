import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";

function AuthRoutes() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AuthRoutes;
