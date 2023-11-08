import React, { useEffect, useState } from "react";

import PrivateRoute from "./privateRoute";
import AuthRoutes from "./authRoutes";
import EmployeeRoute from "./employeeRoute";

const AuthorizationContext = React.createContext();

function IndexRoute() {
  const user = localStorage.getItem("user");
  return (
    <>
      <AuthorizationContext.Provider value={user}>
        {user ? (
          JSON.parse(user)?.role === "Manager" ? (
            <PrivateRoute />
          ) : (
            <EmployeeRoute />
          )
        ) : (
          <AuthRoutes />
        )}
      </AuthorizationContext.Provider>
    </>
  );
}

export default IndexRoute;
