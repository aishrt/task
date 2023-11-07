import React from "react";

import PrivateRoute from "./privateRoutes";
import PublicRoutes from "./publicRoutes";

const AuthorizationContext = React.createContext();

function IndexRoute() {
  const token = localStorage.getItem("token");
  console.log("Loged in Successfully  : ", token);
  return (
    <>
      <AuthorizationContext.Provider value={token}>
        {token ? <PrivateRoute /> : <PublicRoutes />}
      </AuthorizationContext.Provider>
    </>
  );
}

export default IndexRoute;
