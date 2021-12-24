import React from "react";
import styled from "styled-components";

import Plus from "./P04_Plus";
import ClassBox from "./P04_ClassBox";
import ClassAdd from "./P04_ClassAdd";

import useP04 from "./useP04";

const Box = styled.div`
  margin: 0 auto;
  width: 1440px;
  height: 800px;
  overflow-y: auto;
  background: rgba(229, 229, 229, 0.6);
  border-radius: 30px;
  padding: 50px;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const P04 = () => {
  const {
    professorInfo,
    classesList,
    ClickHandler,
    ModalOpen,
    ModalClose,
    Modal,
    name,
    handleChange,
    createClass,
  } = useP04();

  return (
    <Box>
      <ClassBox
        classesList={classesList}
        professorInfo={professorInfo}
        ClickHandler={ClickHandler}
      />
      <Plus open={ModalOpen} />
      <ClassAdd
        open={Modal}
        close={ModalClose}
        name={name}
        handleChange={handleChange}
        createClass={createClass}
      ></ClassAdd>
    </Box>
  );
};

export default P04;
