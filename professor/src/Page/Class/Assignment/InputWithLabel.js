import React from "react";
import styled from "styled-components";
import oc from "open-color";

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  padding: 0 auto;
  margin: 0 auto;
`;

const Label = styled.div`
  display: inline-block;
  margin-right: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 15px;
  width: 60px;

  color: #3d3d3d;
  margin-bottom: 10px;
  text-align: center;
  margin-top: 5px;
`;

const Input = styled.input`
  margin-top: 10px;
  display: inline;
  width: 800px;
  height: 26px;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 15px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: #e5e5e5;
`;

const Hr = styled.hr`
  border: 1px solid #c4c4c4;
  transform: rotate(-0.16deg);
  width: 95%;
  margin-bottom: 20px;
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
    <Hr />
  </Wrapper>
);

export default InputWithLabel;
