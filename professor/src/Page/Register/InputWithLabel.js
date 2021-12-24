import React from "react";
import styled from "styled-components";
import oc from "open-color";

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
  padding: 0 auto;
  margin: 0 auto;
  // text-align: center;
  height: 60px;
  margin-left: 250px;
`;

const Label = styled.div`
display: inline-block;
text-align: left;
width: 100px;
margin-right: 59px;
margin-bottom: 0px;
  font-size: 1rem;
  color: ${oc.gray[6]};
`;

const Input = styled.input`
display:inline;
  width: 313px;
  height: 24px;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 15px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 0px;
background: #EBE7E7;
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({ children, label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
    {children}
  </Wrapper>
);

export default InputWithLabel;
