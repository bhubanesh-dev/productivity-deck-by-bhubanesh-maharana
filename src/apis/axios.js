import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";

import { AUTO_HIDE_TOAST_DURATION, NEWS_API_URL, NEWS_KEY } from "./constants";

const showErrorToastr = error => {
  const {
    response: { data: { status, message: serverMessage } = {} },
    message,
  } = error || {};

  if (status === "error" && serverMessage) {
    Toastr.error(serverMessage, { autoClose: AUTO_HIDE_TOAST_DURATION });
  } else {
    const fallbackMessage =
      message === t("error.networkError")
        ? t("error.noInternetConnection")
        : t("error.somethingWentWrong");

    Toastr.error(fallbackMessage, { autoClose: AUTO_HIDE_TOAST_DURATION });
  }
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => response.data,
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL = NEWS_API_URL;
  axios.defaults.params = { apiKey: NEWS_KEY };

  responseInterceptors();
}
