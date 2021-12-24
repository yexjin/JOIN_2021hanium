import React, {useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useClasses } from "../../components/Use";
import { getDataFromStorage } from "../../utils/storage";
import { useLoading, CTLoading } from "../../components";

const Box = styled.div`
`;

const Page = styled.div`
color: #3D3D3D;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 20px;
margin-top: 27px;
`;

const Hr = styled.hr`
width: 1032px;
height: 0px;
border: 4px solid #C4C4C4;
`

const IntroText = styled.div`
  padding-left: 30px;
  color: #EF8F88;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 18px;
`;

const ClassText = styled.div`
  font-size: 20px;
  padding-left: 30px;

  font-family: Roboto;
font-style: normal;
font-weight: bold;
line-height: 23px;

color: #000000;

hr{
  width: 374.01px;
height: 0px;
left: 331px;
margin-top: 0px;
border: 1px solid #EF8F88;
margin-bottom: 20px;
}
`;

const List = styled.div`
overflow-x: hidden;
overflow-y: auto;
`


function MyClass() {
  const { loading, setLoading } = useLoading(true);

  const { classesList, listAllClasses } = useClasses();

  useEffect(() => {
    const fetch = async () => {
      try {
        const professorInfo = getDataFromStorage();
        await listAllClasses(professorInfo.id);
      } catch (e) {
        alert(e);
      }finally{
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return loading ? (
    <CTLoading />
  ) : (
    <Box>
    <Page>
      수강 과목
    </Page>
    <Hr />
    <List>
    <IntroText>강의를 클릭하면 해당 페이지로 이동합니다.</IntroText> <br />
      {classesList.results.map((item) => {
        return (
          <ClassText>
            <Link
        to={`/student/class/${item.code}/main`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
                <img src={require("../../images/Pencil.png").default} alt="수업"/>
                {item.className} ({item.code})
                <hr />
                </Link>
          </ClassText>
        )
      })}
      </List>
    </Box>
  );
}

export default MyClass;
