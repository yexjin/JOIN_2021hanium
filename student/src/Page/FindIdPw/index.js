import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import FindButton from "./FindButton";
import Modal from "./Modal";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { saveDataToStorage } from "../../utils/storage";

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
const InnerLabel = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  // margin-left: 144px;
  margin-top: 30px;
  color: #686868;
  margin-bottom: 20px;
`;
const Box = styled.div`
  display: block;
  width: 730px;
  margin: 0 auto;
  margin-bottom: 100px;
  background-color: white;
  border: 1px solid #EF8F88;
  height: 502px;

filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
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

const FindIdPw = () => {
  const history = useHistory();
  const [data, setData] = useState({
    findEmail: false,
    findPw: false,
    sended: false,
    emailRes: "",
    name: "",
    mobile: "",
    email: "",
    pw: "",
    verifyCode: "",
  });

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const openFindEmail = () => {
    setData({
      ...data,
      findEmail: true,
    });
  };

  const closeFindEmail = () => {
    setData({
      ...data,
      findEmail: false,
      sended: false,
      name: "",
      mobile: "",
      email: "",
      verifyCode: "",
      emailRes: false,
    });
  };

  const closeFindPw = () => {
    setData({
      ...data,
      findPw: false,
    })
  }
  const sendSmsHandler = async () => {
    console.log("문자전송");
    const body = {
      name: data.name,
      mobile: data.mobile,
    };
    const res = await axios.post("/api/v1/verify/sms", body);

    if (res.data.success) {
      setData({
        ...data,
        sended: true,
      });
    }
  };

  const openFindPw = async () => {
    const regExp 
      = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!regExp.test(data.email)){
      alert("잘못된 이메일 형식입니다.");
      return;
    }
    const body = { email: data.email };
    try {
      const response = await axios.post("/api/v1/verify/email", body);
      if(response.data.success){
        setData({
          ...data,
          findPw: true,
        })
      } else {
        alert("이메일 전송 실패");
      }
    } catch (e) {
      console.log(e);
      alert("이메일 전송 실패");
    }
  }

  const smsSubmitHandler = async () => {
    const body = {
      name: data.name,
      mobile: data.mobile,
      verifyCode: data.verifyCode,
    };
    const res = await axios.post("/api/v1/verify/sms/verify", body);

    console.log(res);

    if (res.data.success) {
      setData({
        ...data,
        emailRes: res.data.email,
      });
    } else {
      console.log("정보가 없습니다.");
      alert("정보가 없습니다.");
    }
  };

  const emailSubmitHandler = async () => {
    const body = {
      email: data.email,
      verifyCode: data.verifyCode,
    };
    try {
      const response = await axios.post("/api/v1/verify/email/verify", body);
      if(response.data){
        saveDataToStorage(response.data);
      }
      console.log("인증성공");
      history.push("/professor/changePw");
    } catch (e) {
      alert("인증번호가 틀렸습니다.");
    }
  }

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

  return (
    <>
    <TextBox>이메일/비밀번호 찾기</TextBox>
    <Box>
      <Label>이메일 찾기</Label>
      <FindButton onClick={openFindEmail}>이메일 찾기</FindButton>
      <br></br>
      <Label>비밀번호 찾기</Label>
      <InputWithLabel
        name="email"
        placeholder="이메일(아이디)를 입력하세요"
        type="text"
        value={data.email}
        onChange={changeHandler}
      />
      <FindButton onClick={openFindPw}>비밀번호 찾기</FindButton>



    </Box>
      <Modal open={ data.findEmail } close={ closeFindEmail } submit={ smsSubmitHandler } header="이메일 찾기">
        {data.emailRes ? <EmailText>이메일은 { data.emailRes }입니다</EmailText> : null }
        <InnerLabel>이름</InnerLabel>
        <InputWithLabel
          name="name"
          placeholder="이름"
          type="text"
          value={data.name}
          onChange={changeHandler}
        />
        <InnerLabel>전화번호</InnerLabel>
        <InputWithLabel
          name="mobile"
          placeholder="숫자만 입력"
          type="text"
          value={data.mobile}
          onChange={changeHandler}
        />
        <SendBox onClick={sendSmsHandler}>{!data.sended? "전송" : "재전송"}</SendBox>
        <InnerLabel>인증번호</InnerLabel>
        <InputWithLabel
          name="verifyCode"
          placeholder="인증번호"
          type="text"
          value={data.verifyCode}
          onChange={changeHandler}
        />
      </Modal>

      <Modal open={ data.findPw } close={ closeFindPw } submit={ emailSubmitHandler } header="비밀번호 변경">
        <InnerLabel>인증번호</InnerLabel>
        <InputWithLabel
          name="verifyCode"
          placeholder="인증번호"
          type="text"
          value={data.verifyCode}
          onChange={changeHandler}
        />
      </Modal>
    </>
  );
}

export default FindIdPw;
