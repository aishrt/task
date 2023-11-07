import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/home";
import Fetch from "../pages/fetch";

function PrivateRoute() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/fetch" element={<Fetch />} />
          <Route path="/*" element={<Navigate to="home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PrivateRoute;
