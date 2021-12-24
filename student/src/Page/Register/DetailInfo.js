import React, { useState, useEffect, useCallback } from "react";
import InputWithLabel from "./InputWithLabel";
import RegisterButton from "./RegisterButton";
import BackButton from "./BackButton";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import { useHistory } from "react-router-dom";
import { typeParameter } from "@babel/types";
import { useMember } from "../../components";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

const Box = styled.div`
display: block;
width: 1041px;
height: 590px;
margin-top: 30px;
margin-bottom: 200px;
padding: 0 auto;
padding-top: 80px;
margin: 0 auto;
  background-color: white;
  border: 4px solid #89C0B7;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;
const TextBox = styled.div`
width: 1041px;
height: 116.19px;
  background: #89C0B7;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  text-align: center;
  margin: 0 auto;
  padding-top: 39px;
  margin-top: 85px;
  text-align: center;
  color: #FFFFFF;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;

function Register(props) {

  const [data, setData] = useState({
    email: "",
    name: "",
    pw: "",
    pwC: "",
    mobile: "",
    birth: "",
    type:"S",
    errName: undefined,
    errMessage: undefined,
  });

  useEffect(() => {
    if (data.mobile.length === 10) {
      setData({
        ...data,
        mobile: data.mobile.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
      });
    }
    if (data.mobile.length === 13) {
      setData({
        ...data,
        mobile: data.mobile.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      });
    }
  }, [data.mobile]);

  const { signupApi } = useMember();
  const history = useHistory();

  const handleError = (name, value) => {
    if (name === "email") {
      const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if(!regExp.test(value))
        return { errName: "email", errMessage: "이메일 주소를 잘못 입력하셨습니다."}
    }
    if (name === "pw") {
      if (value.length < 8) {
        return { errName: "pw", errMessage: "패스워드는 반드시 8자리 이상으로 입력해 주세요."}
      }
    }
    if (name === "pwC") {
      if (data.pw !== value) {
        return { errName: "pwC", errMessage: "비밀번호가 일치하지 않습니다."}
      }
    }

    return {
      errName: undefined,
      errMessage: undefined
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const {errName=undefined, errMessage=undefined } = handleError(name, value);

    setData({
      ...data,
      [name] : value,
      errName,
      errMessage
    });
  }

  const onSubmitHandler = async (e) => {
    if (!data.errName && !data.errMessage  ) {
      const body = {
        email: data.email,
        name: data.name,
        password: data.pw,
        mobile: data.mobile,
        birthDate: data.birth,
        type:"P",
      };

      try {
        await signupApi(body);
        alert("가입이 정상적으로 완료되었습니다.");
        history.push("/login");
      } catch(e) {
        alert(e)
      }
    }
  }

  return (
    <>
      <TextBox>회원가입</TextBox>
    <Box>
      <InputWithLabel
        label="이름"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
      />
      <InputWithLabel
        label="이메일"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
      >
        {data.errName=="email" && data.errMessage && (
        <AlertBox available={false}>{data.errMessage}</AlertBox>)}
      </InputWithLabel>

      <InputWithLabel
        label="비밀번호"
        name="pw"
        type="password"
        value={data.pw}
        onChange={handleChange}
      >
        {data.errName=="pw" && data.errMessage && (
        <AlertBox available={false}>{data.errMessage}</AlertBox>)}
      </InputWithLabel>
      <InputWithLabel
        label="비밀번호 확인"
        name="pwC"
        type="password"
        value={data.pwC}
        onChange={handleChange}
      >
        {data.errName=="pwC" && data.errMessage && (
          <AlertBox available={false}>{data.errMessage}</AlertBox>)}
      </InputWithLabel>

      <InputWithLabel
        label="전화번호"
        name="mobile"
        type="text"
        value={data.mobile}
        onChange={handleChange}
      />
      <InputWithLabel
        label="생년월일"
        name="birth"
        type="date"
        value={data.birth}
        onChange={handleChange}
      />
      <RegisterButton onClick={onSubmitHandler}>가입하기</RegisterButton>
      <BackButton>뒤로가기</BackButton>
    </Box>
    </>
  );
}

export default Register;
