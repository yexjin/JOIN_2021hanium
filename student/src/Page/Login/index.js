import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useMember } from "../../components";
import InputWithLabel from "./InputWithLabel";
import LoginButton from "./LoginButton";
import { saveDataToStorage } from "../../utils/storage";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

const TextBox = styled.div`
  width: 730px;
  height: 117px;
  background-color: #ef8f88;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  margin: 0 auto;
  padding-top: 39px;
  margin-top: 85px;

  color: #ffffff;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Box = styled.div`
  display: block;
  width: 730px;
  margin: 0 auto;
  margin-bottom: 100px;
  background-color: white;
  border: 1px solid #ef8f88;
  height: 502px;

  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Find = styled.div`
  margin-top: 22px;
  margin-bottom: 22px;
  margin-left: 148px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  /* identical to box height */

  color: #686868;
`;

const RegisterButton = styled.div`
  text-align: center;
  margin-left: 148px;
  margin-top: 14px;
  padding-top: 15px;
  padding-bottom: 15px;

  background: #ffffff;
  border: #ef8f88 2px solid;
  width: 434px;
  height: 57px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 23px;
  line-height: 27px;
  /* identical to box height */

  color: #ef8f88;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  margin-bottom: 1rem;

  :hover {
    background: #ef8f88;
    color: white;
  }
`;

const Login = () => {
  const history = useHistory();
  const { loginApi } = useMember();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      const request = {
        email: data.email,
        password: data.password,
      };

      const response = await loginApi(request);

      if (response.data) {
        saveDataToStorage(response.data);
      }

      history.push("/student/main");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <>

      <TextBox>JOIN</TextBox>
      <Box>
        <InputWithLabel
          name="email"
          type="email"
          placeholder="이메일(아이디)를 입력하세요."
          value={data.email}
          onChange={handleChange}
        />
        <InputWithLabel
          name="password"
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <Link
          to="/findIdPassword"
          style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
        >
          <Find>이메일 / 비밀번호 찾기</Find>
        </Link>
        <LoginButton onClick={submitHandler}>로그인</LoginButton>
        <Link
          to="/findIdPassword"
          style={{ textDecoration: "none", color: "black" }}
        ></Link>
        <br></br>
        <Link
          to="/register/terms"
          style={{ textDecoration: "none", color: "black" }}
        >
          <RegisterButton>회원가입</RegisterButton>
        </Link>
      </Box>
    </>
  );
};

export default withRouter(Login);
