import "isomorphic-fetch";
import axios from "axios";
import { stringify } from "query-string";
import merge from "lodash/merge";

export const NODE_ENV = process.env.NODE_ENV;
// export const apiUrl = process.env.REACT_APP_API_URL
export const apiUrl = "http://localhost:8080";

// Add a request interceptor

// console.log({ NODE_ENV, apiUrl })
export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};

export const parseData = (response) =>
  response.data ? Promise.resolve(response.data) : Promise.resolve(null);

export const parseJSON = (response) =>
  response.json().catch((e) => {
    if (response.ok) {
      return;
    }
    e.response = response;
    throw e;
  });

export const parseSettings = ({
  method = "get",
  data,
  locale = "ko",
  binary,
  ...otherSettings
} = {}) => {
  const headers = !binary
    ? {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": locale,
      }
    : {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Accept-Language": locale,
      };
  const settings = !binary
    ? merge(
        { body: data ? JSON.stringify(data) : undefined, method, headers },
        otherSettings
      )
    : merge({ headers }, otherSettings);

  return settings;
};

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf("http") === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : "";
  return `${url}${querystring}`;
};

const api = {
  settings: {},
};

api.setToken = (token) => {
  api.settings.headers = {
    ...api.settings.headers,
    Authorization: `Bearer ${token}`,
  };
};

api.unsetToken = () => {
  api.settings.headers = {
    ...api.settings.headers,
    Authorization: undefined,
  };
};

api.request = (endpoint, { params, ...settings } = {}) =>
  !settings.binary
    ? fetch(parseEndpoint(endpoint, params), parseSettings(settings)).then(
        parseJSON
      )
    : axios
        .post(
          parseEndpoint(endpoint, params),
          settings.data,
          parseSettings(settings)
        )
        .then(parseData);
["delete", "get"].forEach((method) => {
  api[method] = (endpoint, settings) =>
    api.request(endpoint, merge({ method }, api.settings, settings));
});
["post", "put", "patch"].forEach((method) => {
  api[method] = (endpoint, data, settings) =>
    api.request(endpoint, merge({ method, data }, api.settings, settings));
});
["upload"].forEach((method) => {
  api[method] = (endpoint, data, settings) =>
    api.request(
      endpoint,
      merge({ method: "post", data, binary: true }, api.settings, settings)
    );
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: "post", data, ...settings });
  },

  upload(endpoint, data, settings) {
    return this.request(endpoint, {
      method: "post",
      data,
      binary: true,
      ...settings,
    });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: "get", ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: "put", data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: "patch", data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: "delete", ...settings });
  },
});

export default api;
