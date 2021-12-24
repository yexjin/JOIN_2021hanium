import React from "react";
import styled from "styled-components";

const PlusIcon = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 700px;
  right: 60px;
  cursor: pointer;
`;

function S04_Plus({ open }) {
  return (
    <PlusIcon onClick={open}>
      <img
        src={`./BGImg/plus.png`}
        width="100%"
        height="100%"
        alt="plusIcon"
      ></img>
    </PlusIcon>
  );
}

export default S04_Plus;
