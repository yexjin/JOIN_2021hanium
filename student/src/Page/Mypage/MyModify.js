import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import ImageInputWithLabel from "./ImageInputWithLabel";
import {
  Form,
  FormText,
} from "reactstrap";

import { useMember } from "../../components";
import { getDataFromStorage } from "../../utils/storage";
import styled from "styled-components";
import AlertBox from "../Register/AlertBox";
import { BirthDate } from "../../utils/dateChange";
import { useLoading, CTLoading } from "../../components";

const InputBox = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
 margin-top: 30px;
width: 100%;
height: 680px;
`
const Box = styled.div`
  height: 785px;
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
  margin-bottom: 38px;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 28.36px;
  left: 370px;
  top: 830px;

  background:  #6F91B5;
  color: white;
  border: #6F91B5;
`
const BackButton = styled.button`
  width: 100px;
  height: 28.36px;
  left: 370px;
  top: 830px;
  margin-right: 10px;
  margin-left: 220px;

  background:  #EF8F88;
  color: white;
  border: #EF8F88;
`

function MyModify() {

  const { loading, setLoading } = useLoading(true);
  const history = useHistory();

  const professor = getDataFromStorage();

  const [data, setData] = useState();

  const [image, setImage] = useState(null);
  const { memberInfo, getInfo, infoModifyApi } = useMember();

  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    setData({
      email: memberInfo.email,
      name: memberInfo.name,
      pw: memberInfo.password,
      pwC: memberInfo.password,
      mobile: memberInfo.mobile,
      studentID: memberInfo.studentID,
      department: memberInfo.department,
      grade : memberInfo.grade,
      birthDate: memberInfo.birthDate,
      type: "S",
      errName: undefined,
      errMessage: undefined,
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        await getInfo(professor.id);
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleError = (name, value) => {
    if (name === "email") {
      // return { errName: "email", errMessage: "이메일 주소를 잘못 입력하셨습니다."}
    }
    if (name === "password") {
      if (value.length < 8) {
        return {
          errName: "pw",
          errMessage: "패스워드는 반드시 8자리 이상으로 입력해 주세요.",
        };
      }
    }
    if (name === "pwC") {
      if (data.pw !== value) {
        return {
          errName: "pwC",
          errMessage: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        };
      }
    }

    return {
      errName: undefined,
      errMessage: undefined,
    };
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);

    const { errName = undefined, errMessage = undefined } = handleError(
      name,
      value
    );

    setData({
      ...data,
      [name]: value,
      errName,
      errMessage,
    });
  };

  const onModifyHandler = async (e) => {
    if (!data.errName && !data.errMessage) {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("password", data.pw);
      formData.append("mobile", data.mobile);
      formData.append("studentID", data.studentID);
      formData.append("department", data.department);
      formData.append("grade", data.grade);
      formData.append("birthDate", data.birthDate);
      formData.append("profileImg", image);

      try {
        alert("수정되었습니다.");
        await infoModifyApi(professor.id, formData);
        console.log("수정완!");
        history.push(`/student/mypage/myinfo`);
      } catch (e) {
        alert(e);
      }
    }
  };
  if (!data) return "로딩중";
  console.log(image);
  return loading ? (
    <CTLoading />
  ) : (
    <Box>
      <Page>개인 정보 수정</Page>
      <Hr />
    <InputBox>
      <Form>
        <InputWithLabel
              label="이메일"
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="이메일을 입력하세요."
              onChange={handleChange}
              value={data.email}
            />
        <br />
        {data.errName && data.errMessage && (
        <AlertBox available={false}>{data.errMessage}</AlertBox>
      )}
        <InputWithLabel
              label="비밀번호"
              type="password"
              name="pw"
              value={data.pw}
              onChange={handleChange}
            />
        <br />
        <InputWithLabel
              label="비밀번호 확인"
              type="password"
              name="pwC"
              id="examplePassword"
              onChange={handleChange}
              value={data.pwC}
            />
        <br />
        <InputWithLabel
              label="이름"
              type="name"
              name="name"
              id="exampleName"
              placeholder={memberInfo.name}
              onChange={handleChange}
              value={data.name}
            />
        <br />
        <InputWithLabel
              label="학과"
              type="department"
              name="department"
              placeholder="학과를 입력하세요"
              onChange={handleChange}
              value={data.department}
            />
        <br />
        <InputWithLabel
              label="학번"
              type="studentID"
              name="studentID"
              placeholder="학번을 입력하세요"
              onChange={handleChange}
              value={data.studentID}
            />
        <br />
        <InputWithLabel
              label="학년"
              type="grade"
              name="grade"
              placeholder="학년을 입력하세요"
              onChange={handleChange}
              value={data.grade}
            />
        <br />
      <InputWithLabel
        label="생년월일"
        name="birthDate"
        placeholder="생년월일"
        type="date"
        value={BirthDate(data.birthDate)}
        onChange={handleChange}
      />
      <br />
      <InputWithLabel
        label="전화번호"
        name="mobile"
        placeholder="전화번호"
        type="text"
        value={data.mobile}
        onChange={handleChange}
      />
      <br />
      <ImageInputWithLabel
        label="프로필 사진"
        type="file" 
        name="profileImg" 
        onChange={imageChange}/>
      <br />
      <FormText color="muted">
        뒤로가면 작성한 내용이 반영되지 않습니다.<br />
        "저장하기" 버튼을 눌러주세요.
      </FormText>

      <br />

        <Link
          to="/student/mypage/myinfo"
          style={{ textDecoration: "none", color: "black" }}
        >
          <BackButton>뒤로가기</BackButton>
        </Link> 

        <SubmitButton onClick={onModifyHandler}>
          제출하기 
        </SubmitButton>
         
    </Form>
    </InputBox>
    </Box>
  );
}

export default MyModify;