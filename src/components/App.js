import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "antd/dist/antd.css";

import routes from "../routes";
import Dashboard from "./Home/Dashboard";

const protectedRoutes = (routes || []).filter((route) => route?.protected);
const unprotectedRoutes = (routes || []).filter((route) => !route?.protected);

const App = () => {
  const isAuthenicated = !!localStorage.getItem("access_token");
  return (
    <Router>
      <Routes>
        {unprotectedRoutes.map(({ name, path, component }) => (
          <Route key={name} path={path} exact element={component} />
        ))}
        {protectedRoutes?.map(({ name, path, component }) => (
          <Route
            key={name}
            exact
            path={path}
            element={
              // !localStorage.getItem("access_token") ? (
              //   <Navigate to="/login" />
              // ) : (
              <Dashboard childern={component} />
              // )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
