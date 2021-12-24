import urls from "../urls";
import httpClient from "../httpClient";

export const enrolList = (code) => httpClient.get(`${urls.enrolment}/${code}`);
export const studentList = (code) =>
  httpClient.get(`${urls.enrolment}/students/${code}`);
export const put = (form) => httpClient.put(`${urls.enrolment}`, form);
export const removeEnrol = (qs) => httpClient.delete(`${urls.enrolment}?${qs}`);
export const removeStudent = (qs) =>
  httpClient.delete(`${urls.enrolment}/students?${qs}`);
