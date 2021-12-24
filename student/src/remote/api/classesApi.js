import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) => httpClient.post(urls.classes, form);
export const listAll = (id) => httpClient.get(`${urls.classes}/${id}`);
export const get = (id) => httpClient.get(`${urls.classes}/student/${id}`);
export const put = (id, form) =>
  httpClient.put(`${urls.classes}/student/${id}`, form);
export const remove = (id) =>
  httpClient.remove(`${urls.classes}/student/${id}`);
