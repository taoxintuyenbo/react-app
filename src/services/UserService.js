import httpAxios from "./httpAxios";

const UserService = {
  index: async () => {
    return await httpAxios.get(`user`);
  },
  trash: async () => {
    return await httpAxios.get(`user/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`user/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`user/store`, data);
  },
  update: async (id, data) => {
    console.log("data", data);
    return await httpAxios.post(`user/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`user/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`user/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`user/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`user/destroy/${id}`);
  },
  login: async (data) => {
    console.log(data);
    return await httpAxios.post(`user/login`, data);
  },
  googleLogin: async (data) => {
    return await httpAxios.post(`/user/login/google`, data);
  },
  facebookLogin: async (data) => {
    return await httpAxios.post(`/user/login/facebook`, data);
  },
};

export default UserService;
