import React from "react";

import StudentBox from "./Student";
import AssignmentBox from "./Assignment";

import useClassMain from "./useClassMain";

const S05_05_06 = () => {
  const {
    loading,
    CTLoading,
    teamList,
    assignmentByTeamList,
    clickHandler,
    DateChange,
    array,
    pageHandler,
    studentInfo,
  } = useClassMain();

  return loading ? (
    <CTLoading />
  ) : (
    <div>
      <StudentBox List={teamList} me={studentInfo.id} />
      <AssignmentBox
        List={assignmentByTeamList}
        DateChange={DateChange}
        clickHandler={clickHandler}
        setData={pageHandler}
        array={array}
      />
    </div>
  );
};

export default S05_05_06;
