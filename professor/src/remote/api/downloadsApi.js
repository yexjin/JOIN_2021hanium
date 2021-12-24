import urls from "../urls";
import httpClient from "../httpClient";

export const get = (fileName) =>
  httpClient.get(`${urls.downloads}/${fileName}`);
