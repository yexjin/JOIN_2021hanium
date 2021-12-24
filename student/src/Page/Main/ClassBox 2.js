import React from "react";
import styled from "styled-components";

const ClassBox = styled.div`
  width: 250px;
  height: 250px;
  margin-right: 50px;
  cursor: pointer;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 125px;
`;
const TextBox = styled.div`
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 125px;
  border: 0.1px solid #d8d8d8;
  border-top: none;
`;

function S04_ClassBox({ item }) {
  return (
    <ClassBox>
      <ImgBox>
        <img
          src={`./BGImg/${item.color}`}
          alt={item.id}
          width="100%"
          height="100%"
        ></img>
      </ImgBox>
      <TextBox>{item.className}</TextBox>
    </ClassBox>
  );
}

export default S04_ClassBox;
