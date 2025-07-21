const baseUrl = process.env.REACT_APP_API_URL;

const buildUrl = (endpoint) => `${baseUrl}/${endpoint}`;
const getToken = () => localStorage.getItem("token") || "";

export const fetchNoToken = (endpoint, data, method = "GET") => {
  const options = { method };

  if (method !== "GET") {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }

  return fetch(buildUrl(endpoint), options);
};

export const fetchWithToken = (endpoint, data, method = "GET") => {
  const token = getToken();
  const headers = { "x-token": token };
  const options = { method, headers };

  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  return fetch(buildUrl(endpoint), options);
};
