import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ManagerLanding from "../pages/manager/managerLanding";
import ManagerProfile from "../pages/manager/managerProfile";

function PrivateRoute() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<ManagerLanding />} />
          <Route path="/profile" element={<ManagerProfile />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PrivateRoute;
