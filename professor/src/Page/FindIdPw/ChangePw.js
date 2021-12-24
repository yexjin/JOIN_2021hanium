import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import InputWithLabel from "./InputWithLabel";
import FindButton from "./FindButton";
import Modal from "./Modal";
import { useMember } from "../../components";
import { getDataFromStorage } from "../../utils/storage";
import { useHistory } from "react-router";

// const Label = styled.div`
//   font-size: 1.2rem;
//   margin-top: 1rem;
//   margin-bottom: 0.75rem;
// `;
const Box = styled.div`
  display: block;
  width: 730px;
  margin: 0 auto;
  padding-top: 40px;
  margin-bottom: 100px;
  background-color: white;
  border: 1px solid #EF8F88;
  height: 450px;
`;
const TextBox = styled.div`
  width: 730px;
  height: 117px;
  background-color: #EF8F88;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  margin: 0 auto;
  padding-top: 39px;
  margin-top: 85px;

  color: #FFFFFF;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Label = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 25px;
line-height: 29px;
margin-left: 144px;
margin-top: 30px;
color: #686868;
margin-bottom: 20px;
`;
const Title = styled.div`
  text-align: center;
  width: 500px;
  display: block;
  font-size: 30px;
  margin-bottom: 50px;
`;

const SendBox = styled.button`
  padding: 6px 12px;
  margin-top: 5px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 15px;
`;

const EmailText = styled.div`
  background: #8f8f8f;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  padding: 10px 30px;
  font-size: 20px;
  border-radius: .3rem;
  transform: translate(-50%, -50%);
`;

const ChangePw = () => {
  const history = useHistory();
  const { changePwApi } = useMember();
  const [data, setData] = useState({
    pw: "",
    pwC: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const submitHandler = async (e) => {
    const request = {
        password: data.pw,
    };
    const token = getDataFromStorage().access_token;
    try {
      const response = await changePwApi(token, request);
      if(response.data.success) {
        alert("비밀번호를 변경하였습니다.");
        history.push("/login");
      }
    } catch (e) {
      console.log(e);
      alert("비밀번호 변경 실패");
    }
  }
  return (
    <>
    <TextBox>비밀번호 변경</TextBox>
    <Box>
      <Label>비밀번호</Label>
      <InputWithLabel
        name="pw"
        placeholder="비밀번호"
        type="password"
        value={data.pw}
        onChange={handleChange}
      />
      <Label>비밀번호 확인</Label>
      <InputWithLabel
        name="pwC"
        placeholder="비밀번호 확인"
        type="password"
        value={data.pwC}
        onChange={handleChange}
      />
      <FindButton onClick={submitHandler}>비밀번호 변경</FindButton>
    </Box>
    </>
  );
}

export default ChangePw;
