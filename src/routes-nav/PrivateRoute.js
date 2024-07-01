import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

// function PrivateRoute({ exact, path, children }) {
function PrivateRoute({ children }) {
  const { currUser } = useContext(UserContext);

  if (!currUser) {
    return <Navigate replace to="/login" />;
  }

  // return <Route exact={exact} path={path} element={children}></Route>;
  return <>{children}</>;
}

export default PrivateRoute;
