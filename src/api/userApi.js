import axiosClient from "./axiosClient";

const userApi = {
  register(data) {
    const url = `/register`;
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  refreshToken() {
    return axiosClient.post("/refesh-token");
  },
  update(data, id) {
    const url = "/user/" + id;
    return axiosClient.patch(url, data);
  },
  delete(id, data) {
    const url = "/user/" + id;
    return axiosClient.post(url, data);
  },
  getAll(id) {
    const url = "/allUsers/" + id;
    return axiosClient.get(url);
  },
  lock2(id, data) {
    const url = "/create-pass-2/" + id;
    return axiosClient.post(url, data);
  },
  open2(id, data) {
    const url = "/open-pass-2/" + id;
    return axiosClient.post(url, data);
  },
  getNewUsers() {
    const url = "/lastUser";
    return axiosClient.get(url);
  },
  profile(id) {
    const url = "/profile/" + id;
    return axiosClient.get(url);
  },
};

export default userApi;
