/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../index";
import { store } from "../store/store";
import { baseAPIUrl, requestDelay } from "../global";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const appApiClient = axios.create();

appApiClient.defaults.baseURL = baseAPIUrl;

appApiClient.interceptors.request.use((config) => {
  const token = "";
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

appApiClient.interceptors.response.use(
  async (response) => {
    await sleep(requestDelay * 1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        break;
      case 401:
        break;
      case 403:
        history.push("/access-error");
        break;
      case 404:
        break;
      case 500:
        history.push("/server-error");

        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => appApiClient.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => appApiClient.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => appApiClient.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => appApiClient.delete<T>(url).then(responseBody),
};

const Identity = {
  Authenticate: (body: any) => requests.post<any>("Identity", body),
  GetCurrentUserInfo: () => requests.get<any>("Identity"),
};

const agent = {
  Identity,
};

export default agent;
