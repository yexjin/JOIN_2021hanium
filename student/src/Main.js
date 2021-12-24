import React from "react";
import { Route } from "react-router-dom";

import S04 from "./Page/Class/Main/Main";
import Header from "./Common/Header";
import styled from "styled-components";
import Footer from "./Common/Footer";

const ContentBox = styled.div`
 width: 1440px;
 margin: 0 auto;
 display: flex;
`


const Main = () => {
  return (
    <>
      <Header />
      <ContentBox />
      <Route path="/student/main" exact component={S04} />
      <ContentBox />
    </>
  );
};

export default Main;
