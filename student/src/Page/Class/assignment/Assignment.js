import React from "react";
import styled from "styled-components";
import { DateChange2, CommentDateChange } from "../../../utils/dateChange";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";

import GoSubmitAssignment from "../../../images/goSubmitAssignment.png";
import useAssignment from "./useAssignment";

const Box = styled.div`
  width: 1000px;
  button {
    color: white;
    background-color: #6f91b5;
    font-weight: bold;
  }
`;
const Top = styled.div`
  width: 960px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-left: 3;
  // padding: 10px 0px;
  border-bottom: 3px solid #c4c4c4;
  div {
    display: flex;
    align-items: center;
  }
`;
const Myimg = styled.div`
  img {
    width: 180px;
    height: 180px;
  }
`;
const GoSubmit = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: fit-content;
  vertical-align: middle;
  margin-right: 10px;
  p {
    margin: 0;
    font-family: Roboto;
    font-weight: bold;
    color: #6f91b5;
  }
`;

const Comment = () => {
  const {
    data,
    studentInfo,
    commentList,
    deleteCommentHandler,
    submitCommentHandler,
    handleChange,
  } = useAssignment();

  return (
    <Form>
      <FormGroup
        row
        style={{
          marginLeft: 3,
          padding: "4px 0px",
          width: "960px",
          borderBottom: "1px solid #C4C4C4",
        }}
      >
        <Label
          for="name"
          sm={2}
          style={{
            fontWeight: "bold",
            paddingLeft: "5px",
            color: "#EF8F88",
            fontSize: "20px",
          }}
        >
          댓글
        </Label>
      </FormGroup>
      {commentList.results.map((comment) => {
        return (
          <FormGroup
            row
            style={{
              marginLeft: 5,
              padding: "7px 0px",
              width: "960px",
              borderBottom: "1px solid #c4c4c4",
            }}
          >
            <Label
              for="name"
              sm={1}
              style={{
                fontWeight: "bold",
                paddingLeft: "5px",
                fontSize: "15px",
              }}
            >
              {comment.name}
            </Label>
            <Label
              for="contents"
              sm={8}
              style={{ paddingLeft: "10px", fontSize: "15px" }}
            >
              {comment.contents}
            </Label>
            <Label
              for="name"
              sm={2}
              style={{
                fontWeight: "normal",
                paddingLeft: "5px",
                fontSize: "15px",
              }}
            >
              ({CommentDateChange(comment.createdAt)})
            </Label>
            {comment.memberId === studentInfo.id && (
              <Label for="contents" sm={1} style={{ paddingLeft: "5px" }}>
                <Button
                  close
                  style={{ background: "none", border: 0, color: "red" }}
                  onClick={() => {
                    deleteCommentHandler(comment.id);
                  }}
                />
              </Label>
            )}
          </FormGroup>
        );
      })}

      <FormGroup
        row
        style={{
          marginLeft: 3,
          padding: "15px 0px",
          alignItems: "center",
        }}
      >
        <Col sm={9}>
          <Input
            type="conmment"
            name="contents"
            id="contents"
            value={data.contents}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <button
            class="btn btn-secondary btn-sm"
            onClick={submitCommentHandler}
          >
            확인
          </button>
        </Col>
      </FormGroup>
    </Form>
  );
};

const Assignment = () => {
  const { loading, CTLoading, assignmentOne, submitHandler, listHandler } =
    useAssignment();

  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Top>
        <Label
          for="name"
          sm={2}
          style={{ fontWeight: "bold", paddingLeft: "5px", fontSize: "20px" ,  padding: "20px 0px 20px 0px"}}
        >
          과제
        </Label>
        <div>
          <GoSubmit onClick={submitHandler}>
            <img alt="assignmentImg" src={GoSubmitAssignment} />
            <p style={{ marginLeft: "5px" }}>과제 제출하러 가기</p>
          </GoSubmit>
          <button
            href="#"
            class="btn btn-secondary btn-sm"
            style={{ fontSize: "14px" }}
            onClick={listHandler}
          >
            목록
          </button>
        </div>
      </Top>
      <Form
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "718px",
        }}
      >
        <FormGroup
          row
          style={{
            marginLeft: 3,
            padding: "5px 0px",
            width: "960px",
            borderBottom: "1px solid #C4C4C4",
            alignItems: "center",
          }}
        >
          <Label
            for="name"
            sm={1}
            style={{ fontWeight: "bold", paddingLeft: "5px", color: "#7C7979" }}
          >
            과제명
          </Label>
          <Col sm={10} style={{ fontWeight: "bold" }}>
            {assignmentOne.name}
          </Col>
        </FormGroup>
        <FormGroup
          row
          style={{
            marginLeft: 3,
            padding: "5px 0px",
            width: "960px",
            borderBottom: "1px solid #C4C4C4",
            alignItems: "center",
          }}
        >
          <Label
            for="point"
            sm={1}
            style={{ fontWeight: "bold", paddingLeft: "5px", color: "#7C7979" }}
          >
            공개일
          </Label>
          <Col sm={5}>{DateChange2(assignmentOne.startDate)}</Col>
        </FormGroup>
        <FormGroup
          row
          style={{
            marginLeft: 3,
            padding: "5px 0px",
            width: "960px",
            borderBottom: "1px solid #C4C4C4",
            alignItems: "center",
          }}
        >
          <Label
            for="point"
            sm={1}
            style={{ fontWeight: "bold", paddingLeft: "5px", color: "#7C7979" }}
          >
            마감일
          </Label>
          <Col sm={5}>{DateChange2(assignmentOne.endDate)}</Col>
        </FormGroup>
        <FormGroup
          row
          style={{
            marginLeft: 3,
            padding: "5px 0px",
            width: "960px",
            borderBottom: "1px solid #C4C4C4",
            alignItems: "center",
          }}
        >
          <Label
            for="point"
            sm={1}
            style={{
              fontWeight: "bold",
              paddingLeft: "10px",
              color: "#7C7979",
            }}
          >
            배점
          </Label>
          <Col sm={4}>{assignmentOne.point}</Col>
        </FormGroup>
        <FormGroup
          row
          style={{
            marginLeft: 3,
            padding: "15px 0px 0px 10px",
            width: "960px",
            borderBottom: "3px solid #C4C4C4",
            fontSize: "16px",
            minHeight: "300px",
            height: "fit-content",
          }}
        >
          <Myimg>
            {assignmentOne.image !== null && (
              <img src={`/${assignmentOne.image}`} alt="이미지" />
            )}
          </Myimg>
          {assignmentOne.content}
        </FormGroup>
        <Comment />
      </Form>
    </Box>
  );
};

export default Assignment;
