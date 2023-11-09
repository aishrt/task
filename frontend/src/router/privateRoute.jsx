import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ManagerLanding from "../pages/manager/managerLanding";
import ManagerProfile from "../pages/manager/managerProfile";
import EmployeeListing from "../pages/manager/employeeList";
import UpdateEmployee from "../pages/manager/updateEmployee";
import ManagerList from "../pages/manager/managerList";

function PrivateRoute() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<ManagerLanding />} />
          <Route path="/profile" element={<ManagerProfile />} />
          <Route path="/employee-list" element={<EmployeeListing />} />
          <Route path="/manager-list" element={<ManagerList />} />
          <Route path="/employee-update/:id" element={<UpdateEmployee />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PrivateRoute;
