import React from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "./Common/Footer";
import Header from "./Common/Header";
import SideBar from "./Common/SideBar";
import Assignment from "./Page/Class/assignment/Assignment";
import SubmitAndDiscuss from "./Page/Class/assignment/SubmitAndDiscuss";
import ClassMain from "./Page/Class/ClassMain/ClassMain";

import styled from "styled-components";

const ContentBox = styled.div`
 width: 1440px;
 margin: 0 auto;
 display: flex;
`


const ClassParent = () => {
  return (
    <>
      <SideBar />
      <Switch>
        <Route path="/student/class/:code/main" exact component={ClassMain} />
        <Route
          path="/student/class/:code/main/assignment/:id"
          exact
          component={Assignment}
        />
        <Route
          path="/student/class/:code/main/assignment/:id/submit"
          exact
          component={SubmitAndDiscuss}
        />
      </Switch>
    </>
  );
};

const Class = () => {
  return (
    <>
      <Header />
      <Switch>
        <ContentBox>
          <Route path="/student/class/:code" component={ClassParent} />
        </ContentBox>
      </Switch>
      <Footer />
    </>
  );
};

export default Class;
