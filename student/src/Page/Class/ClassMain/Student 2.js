import React from "react";
import styled from "styled-components";

const StudentBox = styled.div`
  width: 230px;
  height: 80px;
  margin-right: 50px;
  padding: 15px;
  border: 0.5px solid #d8d8d8;
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 500;
  font-size: 15px;
`;

const S05_Student = ({ student }) => {
  return (
    <StudentBox>
      {student.name}({student.grade}학년)<br></br>
      {student.department}
    </StudentBox>
  );
};

export default S05_Student;
