import httpAxios from "./httpAxios";

const CategoryService = {
  index: async () => {
    return await httpAxios.get(`category`);
  },
  trash: async () => {
    return await httpAxios.get(`category/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`category/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`category/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`category/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`category/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`category/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`category/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`category/destroy/${id}`);
  },
};

export default CategoryService;
