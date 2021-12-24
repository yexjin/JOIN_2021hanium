import React from "react";
import styled from "styled-components";

import StudentList from "./P05_StudentList";
import Enrolment from "./P05_Enrolment";

import useP05_04 from "./useP05_04";

const Layout = styled.div`
  width: "1032px";
`;

const P05_04 = () => {
  const {
    loading,
    studentList,
    enrolList,
    removeStudentHandler,
    AcceptHandler,
    RefuseHandler,
    CTLoading,
  } = useP05_04();

  return loading ? (
    <CTLoading />
  ) : (
    <Layout>
      <StudentList
        studentList={studentList}
        removeHandler={removeStudentHandler}
      />
      <Enrolment
        enrolList={enrolList}
        AcceptHandler={AcceptHandler}
        RefuseHandler={RefuseHandler}
      />
    </Layout>
  );
};

export default P05_04;
