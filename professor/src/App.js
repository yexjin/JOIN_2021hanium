import React from "react";
import MyPage from "./MyPage";
import Main from "./Main";
import Class from "./Class";
import Register from "./Register";
import Login from "./Page/Login";
import FindIdPw from "./Page/FindIdPw";
import ChangePw from "./Page/FindIdPw/ChangePw";

import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/findIdPassword" exact component={FindIdPw} />
        <PrivateRoute path="/professor/main" component={Main} exact />
        <PrivateRoute path="/professor/class" component={Class} />
        <PrivateRoute path="/professor/mypage" component={MyPage} />
        <PrivateRoute path="/professor/changePw" component={ChangePw} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
