import React from "react";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: rgb(25, 25, 25, 0.64);
`;

const ModalBlock = styled.div`
  width: 300px;
  background-color: #fff;
  height: 250px;
  border-radius: 15px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.25);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
  font-family: Kanit;
  font-size: 18px;
  font-weight: bold;
  .button {
    position: relative;
    width: 25px;
    height: 25px;
    cursor: pointer;
    span {
      position: absolute;
      height: 2px;
      width: 20px;
      border-radius: 7px;
      background-color: #b0b0b0;
      top: 10px;
      right: 5px;
    }
    span:nth-child(1) {
      transform: rotate(-45deg);
    }
    span:nth-child(2) {
      transform: rotate(45deg);
    }
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 10px 0px 0px 25px;
`;

const CodeInput = styled.input`
  margin-top: 10px;
  width: 250px;
  height: 30px;
`;

const AddButton = styled.button`
  width: 90px;
  font-size: 15px;
  background: none;
  border: none;
  color: red;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
`;

const P04_ClassAdd = ({ open, close, name, handleChange, createClass }) => {
  return (
    <>
      {open && (
        <Block State={open}>
          <ModalBlock>
            <Header>수업 등록</Header>
            <Content>
              <div>수업명을 입력하여 주세요.</div>
              <CodeInput
                label="수업명"
                type="text"
                name="className"
                placeholder="(수업명)"
                value={name}
                onChange={handleChange}
              ></CodeInput>
            </Content>
            <Box>
              <AddButton onClick={close}>취소</AddButton>
              <AddButton onClick={createClass}>추가</AddButton>
            </Box>
          </ModalBlock>
        </Block>
      )}
    </>
  );
};

export default P04_ClassAdd;
