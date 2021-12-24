import React from "react";
import { Route, Switch } from "react-router-dom";

import P05 from "./Page/Class/Enrolment/P05_04";
import P06 from "./Page/Class/Team/P06";
import P07 from "./Page/Class/Team/P07_05";
import P12 from "./Page/Class/Report/P12";
import P13 from "./Page/Class/Report/P13";

import AssignmentList from "./Page/Class/Assignment/AssignmentList";
import AddAssignment from "./Page/Class/Assignment/AddAssignment";
import AssignmentModify from "./Page/Class/Assignment/AssignmentModify";

import SideBar from "./Common/SideBar";
import Assignment from "./Page/Class/Assignment/Assignment";
import Header from "./Common/Header";
import Footer from "./Common/Footer";

import styled from "styled-components";

const ContentBox = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: flex;
`;

const ClassParent = () => {
  return (
    <>
      <SideBar />
      <Switch>
        <Route path="/professor/class/:code/enrol" exact component={P05} />
        <Route path="/professor/class/:code/team" exact component={P06} />
        <Route path="/professor/class/:code/assign" exact component={P07} />
        <Route
          path="/professor/class/:code/assignment/:id"
          exact
          component={Assignment}
        />
        <Route
          path="/professor/class/:code/assignment/:id/modify"
          exact
          component={AssignmentModify}
        />
        <Route
          path="/professor/class/:code/assignmentList"
          exact
          component={AssignmentList}
        />
        <Route
          path="/professor/class/:code/report/teamView"
          exact
          component={P12}
        />
        <Route
          path="/professor/class/:code/report/assignView"
          exact
          component={P13}
        />
        <Route
          path="/professor/class/:code/addAssignment"
          exact
          component={AddAssignment}
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
          <Route path="/professor/class/:code" component={ClassParent} />
        </ContentBox>
      </Switch>
      <Footer />
    </>
  );
};

export default Class;
