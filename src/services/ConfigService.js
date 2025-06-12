import httpAxios from "./httpAxios";

const ConfigService = {
  index: async () => {
    return await httpAxios.get(`config`);
  },
  trash: async () => {
    return await httpAxios.get(`config/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`config/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`config/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`config/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`config/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`config/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`config/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`config/destroy/${id}`);
  },
};

export default ConfigService;
