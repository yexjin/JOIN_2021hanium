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
width: 100px;
margin-right: 59px;
  font-size: 1rem;
  color: ${oc.gray[6]};
  text-align: center;
  margin-bottom: 15px;
`;

const Input = styled.input`

`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
  </Wrapper>
);

export default InputWithLabel;
