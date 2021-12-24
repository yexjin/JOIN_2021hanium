import React from "react";
import { Route } from "react-router-dom";

import P04 from "./Page/Class/Main/P04";
import Header from "./Common/Header";
import styled from "styled-components";

const ContentBox = styled.div`
 width: 1440px;
 margin: 0 auto;
 display: flex;
`


const Main = () => {
  return (
    <>
      <Header />
      <ContentBox>
      <Route path="/professor/main" exact component={P04} />
      </ContentBox>
    </>
  );
};

export default Main;
