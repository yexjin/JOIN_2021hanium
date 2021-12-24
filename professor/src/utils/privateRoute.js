import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getDataFromStorage } from "./storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    const professorInfo = getDataFromStorage();
    if (professorInfo === null) {
      alert("로그인 필요한 페이지입니다.");
      return false;
    }
    return true;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
