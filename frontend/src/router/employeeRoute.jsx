import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpProfile from "../pages/employee/empProfile";
import EmpLanding from "../pages/employee/empLanding";

function EmployeeRoute() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<EmpLanding />} />
          <Route path="/profile" element={<EmpProfile />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default EmployeeRoute;
