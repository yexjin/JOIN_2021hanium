import React, { useEffect } from "react";
import styled from "styled-components";
import { useMember } from "../../components";
import { getDataFromStorage } from "../../utils/storage";
import { Link } from "react-router-dom";
import { useLoading, CTLoading } from "../../components";

const Box = styled.div`
width: 1032px;
`;

const Page = styled.div`
  color: #3d3d3d;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-top: 27px;
`;

const Hr = styled.hr`
  width: 1032px;
  height: 0px;
  border: 4px solid #c4c4c4;
`;

const InfoBox = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-around;
`;

const Myimg = styled.div`
  img {
    width: 180px;
    height: 180px;
  }
`;

const Info = styled.div`
  width: 408px;
`;

const Name = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 27px;
  color: #000000;
`;

const Major = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #3d3d3d;
`;

const Email = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  color: #000000;
  img {
    margin-right: 21px;
  }

  margin-top: 30px;
`;

const School_num = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  color: #000000;
  img {
    margin-right: 21px;
  }
  margin-top: 10px;
`;

const Phone = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  color: #000000;
  img {
    margin-right: 21px;
  }
  margin-top: 10px;
`;

const Modify = styled.div`
  background-color: #6f91b5;
  width: 160px;
  height: 39px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  padding-top: 9px;
`;

function MyInfo() {
  const { memberInfo, getInfo } = useMember();
  const { loading, setLoading } = useLoading(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const student = getDataFromStorage();
        await getInfo(student.id);
        console.log(student)
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    };
    fetch();
  }, []);
  
  
  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Page>내 프로필</Page>
      <Hr />
      <InfoBox>
        {console.log(memberInfo.profileImg)}
        <Myimg>
          { memberInfo.profileImg ? (
          <img
            src={`/${memberInfo.profileImg}`}
            alt="이미지"
            /> ) : (<img
            src={require("../../images/person_default.png").default}
            alt="이미지"
          />)}
          
        </Myimg>
        <Info>
          <Name> {memberInfo.name} </Name>{" "}
          <Major> ( {memberInfo.department} / {memberInfo.grade}학년 ) </Major>
          <Email>
            <img src={require("../../images/Email.png").default} alt="이메일" />
            {memberInfo.email}
          </Email>
          <School_num>
            <img
              src={require("../../images/Major.png").default}
              alt="학사번호"
            />
            {memberInfo.studentID}
          </School_num>
          <Phone>
            <img src={require("../../images/Phone.png").default} alt="폰" />
            {memberInfo.mobile}
          </Phone>
        </Info>
        <Link
          to="/student/mypage/modify"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Modify>정보 수정</Modify>
        </Link>
      </InfoBox>
    </Box>
  );
}

export default MyInfo;
