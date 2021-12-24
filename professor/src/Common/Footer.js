import React from "react";
import styled from "styled-components";

const Item = [
  {
    id: 1,
    text: "소개",
  },
  {
    id: 2,
    text: "정보",
  },
  {
    id: 3,
    text: "API",
  },
  {
    id: 4,
    text: "위치",
  },
  {
    id: 5,
    text: "마이페이지",
  },
  {
    id: 6,
    text: "개인정보 처리방침",
  },
  {
    id: 7,
    text: "약관",
  },
];

const Box = styled.div`
  width: 100%;
  padding-top: 20px;
`;

const ButtonText = styled.div`
  margin: 0 auto;
  width: 700px;
  height: 11px;
  display: flex;
`;

const Buttons = styled.button`
  font-family: Roboto;
  font-size: 16px;
  line-height: 11x;
  text-align: center;
  color: #7c7979;
  margin-right: 30px;
  background: none;
  border: none;
  margin: 0 auto;
`;

const CopyRight = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  width: 350px;
  height: 36px;
  font-family: Roboto;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #7c7979;
  margin-bottom: 15px;
`;

const Footer = () => {
  return (
    <Box>
      <ButtonText>
        {Item.map((item) => (
          <Buttons key={item.id}>{item.text}</Buttons>
        ))}
      </ButtonText>
      <CopyRight>
        2021 한이음 ICT 멘토링
        <br />© 2021 JOIN PROJECT BY EC
      </CopyRight>
    </Box>
  );
};

export default Footer;
