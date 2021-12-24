import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getDataFromStorage } from "../../../utils/storage";
import { useAssignments } from "../../../components/Use";

const useSubmit = () => {
  const history = useHistory();
  const { id, code } = useParams();
  const { submitAssignmentsApi, assignmentTeamOne, getAssignmentTeam  } = useAssignments();
  const [teamFile, setTeamFile] = useState(null); //파일
  const [data, setData] = useState({
    contents: "",
    file: "",
  });

  const submitHandler = async () => {
    try {
      const studentInfo = getDataFromStorage();
      const memberId = studentInfo.id;
      const fd = new FormData();
      console.log("err");
      if (teamFile) {
        fd.append("file",teamFile);
        // Object.value(teamFile).forEach((file) => fd.append("file", file));
      }
      // console.log("err");
      fd.append("contents", data.contents);
      const response = await submitAssignmentsApi(id, memberId, fd);

      if (response.data) {
        alert("제출했습니다");
        history.push(`/student/class/${code}/main/assignment/${id}`);
      }
    } catch (e) {
      // alert("과제 제출 실패");
      alert(e);
    }
  };

  const backHandler = async () => {
    history.push(`/student/class/${code}/main/assignment/${id}`);
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    // console.log(e.target.files)
    console.log(file.name);
    
    setTeamFile(file);
    setData({ ...data, file: file.name});
    //fd.append("file", e.target.files)
    console.log(teamFile);
    // setImgBase64([]);
    // for (let i = 0; i < e.target.files.length; i++) {
    //   if (e.target.files[i]) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
    //     // 파일 상태 업데이트
    //     reader.onloadend = () => {
    //       // 2. 읽기가 완료되면 아래코드가 실행됩니다.
    //       const base64 = reader.result;
    //       if (base64) {
    //         //  images.push(base64.toString())
    //         const base64Sub = {
    //           name: e.target.files[i].name,
    //           file: base64.toString(),
    //         };

    //         setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
    //         //  setImgBase64(newObj);
    //         // 파일 base64 상태 업데이트
    //         //  console.log(images)
    //       }
    //     };
    //   }
    // }
    // console.log(imgBase64);
  };

  const fetch = async () => {
    await getAssignmentTeam(id);
    setData({
      contents: assignmentTeamOne.contents,
      file: assignmentTeamOne.file,
    });
  }
  const deleteHandler = (e) => {
    setTeamFile(null);
    setData({...data, file: ""});
  };
  useEffect(() => {
    fetch();
  }, []);
  return {
    data,
    setData,
    submitHandler,
    handleChange,
    handleChangeFile,
    deleteHandler,
    backHandler,
    fetch,
    teamFile,
    setTeamFile,
  };
};

export default useSubmit;
