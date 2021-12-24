import React, { useState, useCallback, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import RegisterButton from "./RegisterButton";
import styled from "styled-components";
import AlertBox from "./AlertBox";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../../Common/Logo";
import Footer from "../../Common/Footer";

const HeaderBar = styled.div`
  width: 100%;
  height: 85px;
  padding: 20px 50px 0px 50px;
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

  color: #FFFFFF;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;
const RegistBox = styled.div`
display: block;
// padding-left: 65px;
width: 1041px;
  height: 496px;
  margin-top: 50px;
  margin-bottom: 200px;
  padding: 0 auto;
  padding-top: 43px;
  margin: 0 auto;
  background-color: white;
  border: 4px solid #89C0B7;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Sub = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 28px;
line-height: 33px;
/* identical to box height */

color: #686868;
`;
const TermBox = styled.div`
  margin-top: 17px;
  margin-bottom: 10px;
  width: 915px;
height: 246px;
  display: block;
  overflow-y: scroll;
  border: 1px solid #7C7979;
`;
const AgreeBox = styled.div`
  display: block;font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 17px;
line-height: 20px;
margin-bottom: 20px;
/* identical to box height */

color: #232323;
`;
const TermWrapper = styled.div`
  margin-left: 65px;
`;
const RegisterBox = () => {

  const [terms, setTerms] = useState("");
  useEffect(async () => {
    const response = await axios.get("/api/v1/terms");
    setTerms(response.data.result);
  },[]);
  const [isChecked, setChecked] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setChecked(e.target.checked);
  }


  const handleAgreeBox = () => {
    if (isChecked) {
      history.push("/register/detailInfo");
    } else {
      alert("이용 약관에 동의해 주세요.");
    }
  }

  return (
    <>
    <TextBox>회원가입</TextBox>
    <RegistBox>
      <TermWrapper>
        <Sub>이용 약관 동의</Sub>
        <TermBox><pre>{terms}</pre></TermBox>

        <AgreeBox>
          <input type="checkbox" onChange={handleChange}/>
          <span>동의합니다</span>
        </AgreeBox>
      </TermWrapper>
        <RegisterButton
          style={{
            margin: "0 auto",
            width: "400px",
            fontSize: "18px",
          }}

          onClick={handleAgreeBox}
        >
          동의하고 넘어가기
        </RegisterButton>
    </RegistBox>
    </>
  );
}

export default RegisterBox;
