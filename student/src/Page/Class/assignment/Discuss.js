import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DateChange4 } from "../../../utils/dateChange";

import useDiscusses from "./useDiscusses";

const Box = styled.div`
  width: 1100px;
  height: 450px;
  overflow-y: scroll;
`;

const DiscussInput = styled.textarea`
  width: 950px;
  height: 50px;
  margin-right: 20px;
`;

const Submit = styled.button`
  border: none;
  background: #6f91b5;
  color: white;
  width: 100px;
  height: 50px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  line-height: 50px;
`;

const InputBox = styled.div`
  display: flex;
  margin-top: 30px;
`;

const ButtonBox = styled.div`
  width: 300px;
  display: flex;
  margin: 0 auto;
  padding-top: 30px;
`;

const Btn = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  color: white;
  background: ${(props) => props.color};
  margin-right: 10px;
`;

const Box2 = styled.div`
  width: 1040px;
  height: fit-content;
  border-bottom: 1px solid #7c7979;
  padding-top: 10px;
  margin: 0px 0px 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  width: 500px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  color: #7c7979;
  margin-bottom: 10px;
`;

const Contents = styled.div`
  width: 900px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
`;

const Delete = styled.button`
  width: 50px;
  border: none;
  color: #ef8f88;
  background: none;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
`;

const DiscussBox = ({ data, DeleteHandler }) => {
  return (
    <Box2>
      <div>
        <Name>
          {data.name}&nbsp;&nbsp;({DateChange4(data.createdAt)})
        </Name>
        <Contents>{data.content}</Contents>
      </div>
      <Delete onClick={() => DeleteHandler(data.id)}>삭제</Delete>
    </Box2>
  );
};

const Discuss = () => {
  const {
    data,
    setData,
    DiscussList,
    submitHandler,
    DeleteHandler,
    backHandler,
  } = useDiscusses();
  return (
    <>
      <div>
        <Box>
          {DiscussList.count === 0 && <p>글을 작성해주세요.</p>}
          {DiscussList.results.map((item) => {
            return <DiscussBox DeleteHandler={DeleteHandler} data={item} />;
          })}
        </Box>
        <InputBox>
          <DiscussInput
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></DiscussInput>
          <Submit onClick={submitHandler}>전송</Submit>
        </InputBox>
      </div>
      <div>
        <ButtonBox>
          <Btn color="#EF8F88" onClick={backHandler}>
            취소
          </Btn>
          <Btn color="#6F91B5">제출</Btn>
        </ButtonBox>
      </div>
    </>
  );
};

export default Discuss;
