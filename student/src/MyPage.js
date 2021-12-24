import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Footer from "./Common/Footer";
import Header from "./Common/Header";

import MyInfo from "./Page/Mypage/MyInfo";
import MyClass from "./Page/Mypage/MyClass";
import MyAssignment from "./Page/Mypage/MyAssignment";
import MyModify from "./Page/Mypage/MyModify";

import MySideBar from "./Common/SideBar_Mypage";

const ContentBox = styled.div`
 width: 1440px;
 margin: 0 auto;
 display: flex;
`

function MyPage() {
  return (
    <>
      <Header />
      <ContentBox>
          <MySideBar />
            <Route path="/student/mypage/myinfo" exact component={MyInfo} />
            <Route path="/student/mypage/class" exact component={MyClass} />
            <Route
              path="/student/mypage/assignment"
              exact
              component={MyAssignment}
            />
            <Route path="/student/mypage/modify" exact component={MyModify} />

      </ContentBox>
      <Footer />
    </>
  );
}

export default MyPage;
