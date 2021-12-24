export const DateChange = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const sec = New.getSeconds();
  const result =
    year +
    "년" +
    " " +
    month +
    "월 " +
    " " +
    day +
    "일 " +
    " " +
    hour +
    "시 " +
    " " +
    min +
    "분 ";
  return result;
};

export const DateChange2 = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const sec = New.getSeconds();
  const result =
    year +
    "/" +
    (month >= 10 ? month : "0" + month) +
    "/" +
    (day >= 10 ? day : "0" + day) +
    " " +
    (hour >= 10 ? hour : "0" + hour) +
    ":" +
    (min >= 10 ? min : "0" + min);
  return result;
};

export const DateChange3 = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const sec = New.getSeconds();
  const result =
    year +
    "-" +
    (month >= 10 ? month : "0" + month) +
    "-" +
    (day >= 10 ? day : "0" + day) +
    "T" +
    (hour >= 10 ? hour : "0" + hour) +
    ":" +
    (min >= 10 ? min : "0" + min);
  return result;
};

export const DateChange4 = (date) => {
  const New = new Date(date);
  const Year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const result =
    Year + "/" + month + "/" + day + "    " + hour + ":" + min + "";
  return result;
};

export const BirthDate = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const result =
    year +
    "-" +
    (month >= 10 ? month : "0" + month) +
    "-" +
    (day >= 10 ? day : "0" + day);

  return result;
};

export const CommentDateChange = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const sec = New.getSeconds();
  const result =
    (year % 100) +
    "/" +
    (month >= 10 ? month : "0" + month) +
    "/" +
    (day >= 10 ? day : "0" + day) +
    " " +
    (hour >= 10 ? hour : "0" + hour) +
    ":" +
    (min >= 10 ? min : "0" + min);
  return result;
};

export const AssignmentDateChange = (date) => {
  const New = new Date(date);
  const year = New.getFullYear();
  const month = New.getMonth() + 1;
  const day = New.getDate();
  const hour = New.getHours();
  const min = New.getMinutes();
  const sec = New.getSeconds();
  const result =
    year + "." + month + "." + day + " " + hour + "시 " + " " + min + "분 ";
  return result;
};
