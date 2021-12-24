import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) => httpClient.post(urls.member, form);
export const listAll = (qs) => httpClient.get(`${urls.member}?${qs}`);
export const get = (id) => httpClient.get(`${urls.member}/${id}`);
export const put = (id, form) => httpClient.put(`${urls.member}/student/${id}`, form);
export const remove = (id) => httpClient.remove(`${urls.member}/${id}`);

export const signup = (form) =>
  httpClient.post(`${urls.member}/register`, form);
export const login = (form) =>
  httpClient.post(`${urls.member}/student/login`, form);
