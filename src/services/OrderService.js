import httpAxios from "./httpAxios";

const OrderService = {
  index: async () => {
    return await httpAxios.get(`order`);
  },
  trash: async () => {
    return await httpAxios.get(`order/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`order/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`order/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`order/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`order/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`order/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`order/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`order/destroy/${id}`);
  },
  getOrdersByUserId: async (id) => {
    return await httpAxios.get(`order/userOrder/${id}`);
  },
  momoPayment: async (data) => {
    return await httpAxios.post(`order/momo/`, data);
  },
  vnpayPayment: async (data) => {
    return await httpAxios.post(`order/vnpay/`, data);
  },
};

export default OrderService;
