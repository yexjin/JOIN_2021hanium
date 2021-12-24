import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Example from "./Example";
import MypageLayout from "../Page/Mypage/MypageLayout";

const Main = () => {
  return (
    <main className="flex-shrink-0">
      <Switch>
        <Route path="/class/assignment" component={Example}></Route>
        <Route path="/mypage/myinfo" exact component={MypageLayout}></Route>
      </Switch>
    </main>
  );
};

export default Main;
