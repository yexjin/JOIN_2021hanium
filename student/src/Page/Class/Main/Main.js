import React from "react";
import styled from "styled-components";

import ClassBox from "./ClassBox";
import Plus from "./Plus";
import ClassAdd from "./ClassAdd";

import useMain from "./useMain";

const Box = styled.div`
  margin: 0 auto;
  width: 1440px;
  height: 800px;
  background: rgba(229, 229, 229, 0.6);
  border-radius: 30px;
  padding: 50px;
`;

const Main = () => {
  const {
    code,
    Modal,
    classesList,
    handleChange,
    ClickHandler,
    ModalOpen,
    ModalClose,
    createEnrol,
  } = useMain();

  return (
    <Box>
      <ClassBox classesList={classesList} ClickHandler={ClickHandler} />
      <Plus open={ModalOpen} />
      <ClassAdd
        open={Modal}
        close={ModalClose}
        code={code}
        handleChange={handleChange}
        createEnrol={createEnrol}
      ></ClassAdd>
    </Box>
  );
};

export default Main;
