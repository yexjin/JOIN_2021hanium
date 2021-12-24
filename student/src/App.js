import React from "react";
import MyPage from "./MyPage";
import Main from "./Main";
import Class from "./ClassLayout";
import Login from "./Page/Login";
import Register from "./Register";
import FindIdPw from "./Page/FindIdPw";

import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/findIdPassword" exact component={FindIdPw} />
        <PrivateRoute path="/student/main" component={Main} exact />
        <PrivateRoute path="/student/class" component={Class} />
        <PrivateRoute path="/student/mypage" component={MyPage} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
