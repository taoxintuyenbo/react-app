import httpAxios from "./httpAxios";

const OrderDetailService = {
  index: async (id) => {
    return await httpAxios.get(`orderdetail/${id}`);
  },
  trash: async () => {
    return await httpAxios.get(`orderdetail/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`orderdetail/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`orderdetail/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`orderdetail/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`orderdetail/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`orderdetail/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`orderdetail/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`orderdetail/destroy/${id}`);
  },
};

export default OrderDetailService;
