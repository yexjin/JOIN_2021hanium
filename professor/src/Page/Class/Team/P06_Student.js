import React from "react";
import styled from "styled-components";

const StudentBox = styled.div`
  border: 0.5px solid #EF8F88;
  padding: 10px;
  padding-left: 14px;
  width: 208px;
  height: 61px;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 20px;
  margin-left: 20px;
  display: flex;
  font-size: 13px;
  font-weight: 500;
`;

function S05_Student({ students }) {
  return (
    <>
    {students.map((student) => {
      return( 
        <StudentBox>
        {student.name}({student.grade}학년)<br></br>
      {student.department}
      </StudentBox>
      
      )})}
      </>
  );
}

export default S05_Student;
