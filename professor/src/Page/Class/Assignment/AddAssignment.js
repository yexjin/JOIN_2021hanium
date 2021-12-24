import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import styled from "styled-components";
import useAddAssignment from "./useAddAssignment";
import InputWithLabel from "./InputWithLabel";
import FileInputWithLabel from "./FileInputWithLabel";

const ListText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  // line-height: 23px;
  padding: 20px 0px 20px 0px;

  color: #3d3d3d;
  // margin-top: 42px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  background: #ffffff;
  border: 2px solid #426589;
  box-sizing: border-box;

  margin-bottom: 30px;
  margin-top: 20px;
  float: right;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 23px;
  text-align: center;

  color: #426589;

  width: 60px;
  height: 30px;
  :hover {
    background-color: #426589;
    color: white;
  }
`;

const HeadLabel = styled.div`
  display: inline-block;
  margin-left: -12px;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  width: 60px;

  color: #3d3d3d;
  margin-bottom: 15px;
  text-align: center;
`;
const Box = styled.div`
  width: 1032px;
  height: 785px;
`;

const Hr = styled.hr`
  border: 1px solid #c4c4c4;
  transform: rotate(-0.16deg);
  width: 95%;
`;

const TextArea = styled.input`
  width: 920px;
  height: 367px;
  margin-left: 10px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const CheckText = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;

  color: #000000;
  margin-left: 10px;
  padding-top: -40px;
`;

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #ef8f88;
  margin-top: 10px;
  margin-left: 160px;
`;

const InputDiv = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 10px;
  height: 680px;
`;

const AssignmentView = () => {
  const {
    imageChange,
    handleChange,
    checkboxChange,
    answerFileChange,
    teamList,
    createHandler,
    data,
  } = useAddAssignment();

  return (
    <>
      <Box>
        <Top>
          <ListText>과제 등록</ListText>
          <SubmitButton size="sm" onClick={createHandler}>
            완료
          </SubmitButton>
        </Top>
        <Form>
          <InputDiv>
            <InputWithLabel
              label="과제명"
              for="name"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
            />

            <InputWithLabel
              label="배점"
              type="point"
              for="name"
              name="point"
              id="point"
              value={data.point}
              onChange={handleChange}
            />

            <InputWithLabel
              label="공개일"
              name="birthDate"
              type="datetime-local"
              name="startDate"
              id="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
            <InputWithLabel
              label="마감일"
              type="datetime-local"
              name="endDate"
              id="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
            <FormGroup
              row
              style={{
                marginLeft: 3,
                padding: "8px 0px",
                alignItems: "center",
              }}
            >
              <Label for="point" sm={1} style={{ marginRight: "25px" }}>
                <HeadLabel>팀지정</HeadLabel>
              </Label>
              {teamList.results.map((team) => (
                <Col sm={1} style={{ marginTop: -16 }}>
                  <>
                    <Input
                      type="checkbox"
                      name={team.id}
                      onChange={checkboxChange}
                    />
                    <CheckText>{team.name}팀</CheckText>
                  </>
                </Col>
              ))}
            </FormGroup>

            <TextArea
              type="textarea"
              name="content"
              id="assignmentText"
              value={data.content}
              onChange={handleChange}
              placeholder="과제에 대한 세부내용을 입력하세요."
            />

            <FileInputWithLabel
              label="첨부 파일"
              name="profileImg"
              type="file"
              onChange={imageChange}
            />
            <Hr />
            <FileInputWithLabel
              label="해답 파일"
              type="file"
              name="solutionFile"
              id="solutionFile"
              onChange={answerFileChange}
            />

            <Text>
              * 해답 파일은 학생들에게 공개되지 않으며 자동 채점을 위한 비교
              파일입니다.
            </Text>
            <Hr />
          </InputDiv>
        </Form>
      </Box>
    </>
  );
};

export default AssignmentView;
