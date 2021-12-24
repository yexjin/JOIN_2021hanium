import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

import MyInfo from "./Page/Mypage/MyInfo";
import MyClass from "./Page/Mypage/MyClass";
import MyAssignment from "./Page/Mypage/MyAssignment";
import MyModify from "./Page/Mypage/MyModify";
import MySideBar from "./Common/SideBar_Mypage";

import Header from "./Common/Header";
import Footer from "./Common/Footer";

const ContentBox = styled.div`
 width: 1440px;
 margin: 0 auto;
 display: flex;
`


function App() {
  return (
    <>
      <Header />
      <ContentBox>
          <MySideBar />
            <Route path="/professor/mypage/myinfo" exact component={MyInfo} />
            <Route path="/professor/mypage/class" exact component={MyClass} />
            <Route path="/professor/mypage/assignment" exact component={MyAssignment} />
            <Route path="/professor/mypage/modify" exact component={MyModify} />
      </ContentBox>
      <Footer />
    </>
  );
}

export default App;
