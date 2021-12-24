import React from "react";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";

import filePlus from "../../../images/add.png";

import useSubmit from "./useSubmit";

const Title = styled.div`
  width: 100px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  color: #7c7979;
  margin: 20px 0px 20px 0px;
`;

const ContentBox = styled.textarea`
  border: 1px solid #7c7979;
  width: 1100px;
  height: 250px;
  overflow-y: scroll;
`;

const DropBox = styled.div`
  border: 1px dashed gray;
  height: 150px;
  line-height: 150px;
  width: 1100px;
  display: flex;
`;

const DropText = styled.div`
  width: 600px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  color: #c4c4c4;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  margin: 40px 10px 0px 230px;
`;

const ButtonBox = styled.div`
  width: 300px;
  display: flex;
  margin: 0 auto;
  padding-top: 30px;
`;

const Btn2 = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  color: white;
  background: ${(props) => props.color};
  margin-right: 10px;
`;

const FileItem = styled.div`
  position: relative;
  width: 600px;
  height: 26px;
  a{
    text-decoration: none;
    color : black;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Btn = styled.button`
  top: 0px;
  right: 0px;
  height: 26px;
  width: 26px;
  text-align: middle;
  vertical-align: center;
  background : none;
  border: none;
  color: red;
  font-size: 20px;
`;
const Submit = () => {
  const {
    data,
    setData,
    teamFile,
    setTeamFile,
    submitHandler,
    handleChange,
    handleChangeFile,
    deleteHandler,
    backHandler,
  } = useSubmit();

  return (
    <Row>
      <Col sm="12">
        <Title>내용 작성</Title>
        <ContentBox
          rows="10"
          name="contents"
          value={data.contents}
          onChange={handleChange}
        ></ContentBox>

        {/* {imgBase64.map((item) => {
          return (
            <FileItem>
              <span style={{ fontSize: "14px" }}>{item.name}</span>
              <Btn name={item.name} onClick={deleteHandler}>
                x
              </Btn>
            </FileItem>
          );
        })} */}
        {data.file?
          <FileItem>
            <a href={`http://localhost:3000/api/v1/downloads/${data.file}`} download>
              <span style={{ fontSize: "14px" }}>
                {data.file}
              </span>
            </a>
            <Btn name={data.file} onClick={deleteHandler}>
              x
            </Btn>
          </FileItem>
        :null}
        <Dropzone onDrop={(acceptedFiles) => {
          console.log(acceptedFiles);
          setTeamFile(acceptedFiles[0]);
          setData({ ...data, file: acceptedFiles[0].name});
        }}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} type="file" onChange={handleChangeFile} />
                <Title>파일 첨부</Title>
                <DropBox>
                <Img src={filePlus} alt="file" />
                <DropText>
                  버튼 선택 혹은 첨부 파일을 선택하여 이곳에 드래그 & 드롭해주세요
                </DropText>
                </DropBox>
              </div>
            </section>
          )}
        </Dropzone>
        <ButtonBox>
          <Btn2 color="#EF8F88" onClick={backHandler}>취소</Btn2>
          <Btn2 color="#6F91B5" onClick={submitHandler}>
            제출
          </Btn2>
        </ButtonBox>
      </Col>
    </Row>
  );
};

export default Submit;
