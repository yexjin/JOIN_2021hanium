import urls from "../urls";
import httpClient from "../httpClient";

export const create = (form) => httpClient.post(`${urls.enrolment}`, form);
