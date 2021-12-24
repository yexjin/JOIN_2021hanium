import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Class from "../../../images/noclass.png";
import Line from "../../../images/line.png";

const ClassBox = styled.div`
  width: 280px;
  height: 250px;
  margin: 0px 25px 40px 25px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 125px;
  border: none;
  background-color: ${(props) => props.color};
  border-radius: 25px 25px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 80px 20px 20px 20px;
`;

const ClassName = styled.div`
  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  color: white;
`;

const ProfessorName = styled.div`
  font-family: Roboto;
  font-size: 14px;
  color: white;
  line-height: 35px;
`;

const TextBox = styled.div`
  width: 100%;
  height: 125px;
  background-color: white;
  border: none;
  border-radius: 0 0 25px 25px;
  padding: 20px;
  line-height: 160px;
  font-family: Roboto;
  font-size: 12px;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-bottom: 2px;
  margin-left: 3px;
`;

const BoxClass = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Circle = styled.div`
  width: 350px;
  height: 350px;
  background: #c4c4c4;
  border-radius: 300px;
  margin: 100px 0px 0px 500px;
`;

const ClassImg = styled.img`
  width: 200px;
  height: 200px;
  margin: 75px 0px 0px 75px;
`;

const LineImg = styled.img`
  width: 130px;
  height: 130px;
  margin: 0px 0px 0px 300px;
`;

const NoText = styled.div`
  width: 300px;
  height: 50px;
  font-family: Monoton;
  font-size: 20px;
  line-height: 31px;
  color: #7c7979;
  margin: 330px 0px 0px 180px;
`;

const ClassBoxDetail = ({ item, professor, ClickHandler }) => {
  return (
    <ClassBox>
      <ImgBox color={item.color} onClick={() => ClickHandler(item.code)}>
        <ClassName>{item.name}</ClassName>
        <ProfessorName>{professor.name}</ProfessorName>
      </ImgBox>
      <TextBox>
        수업코드 : {item.code}
        <CopyToClipboard text={item.code}>
          <Img src="https://cdn-icons-png.flaticon.com/512/88/88026.png"></Img>
        </CopyToClipboard>
      </TextBox>
    </ClassBox>
  );
};

const P04_ClassBox = ({ classesList, professorInfo, ClickHandler }) => {
  return (
    <BoxClass>
      {classesList.count === 0 && (
        <>
          <div>
            <Circle>
              <ClassImg src={Class}></ClassImg>
            </Circle>
          </div>
          <div>
            <NoText>첫 번째 수업을 만들어 보세요.</NoText>
            <LineImg src={Line} />
          </div>
        </>
      )}
      {classesList.results.map((item) => {
        return (
          <ClassBoxDetail
            key={item.name}
            item={item}
            professor={professorInfo}
            ClickHandler={ClickHandler}
          ></ClassBoxDetail>
        );
      })}
    </BoxClass>
  );
};
export default P04_ClassBox;
