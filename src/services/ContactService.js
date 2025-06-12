import httpAxios from "./httpAxios";

const ContactService = {
  index: async () => {
    return await httpAxios.get(`contact`);
  },
  trash: async () => {
    return await httpAxios.get(`contact/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`contact/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`contact/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`contact/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`contact/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`contact/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`contact/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`contact/destroy/${id}`);
  },
};

export default ContactService;
