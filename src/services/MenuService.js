import httpAxios from "./httpAxios";

const MenuService = {
  getMenus: async () => {
    return await httpAxios.get(`mainMenu`);
  },
  parentMenu: async (id) => {
    return await httpAxios.get(`parentMenu/${id}`);
  },
  getFooterMenus: async () => {
    return await httpAxios.get(`footerMenu`);
  },
  index: async () => {
    return await httpAxios.get(`menu`);
  },
  trash: async () => {
    return await httpAxios.get(`menu/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`menu/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`menu/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`menu/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`menu/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`menu/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`menu/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`menu/destroy/${id}`);
  },
  fetchCategories: async () => {
    return await httpAxios.get(`category`); // Define API route for fetching categories
  },

  // Fetch all active brands
  fetchBrands: async () => {
    return await httpAxios.get(`brand`); // Define API route for fetching brands
  },

  // Fetch all active topics
  fetchTopics: async () => {
    return await httpAxios.get(`topic`); // Define API route for fetching topics
  },

  // Fetch all active pages
  fetchPages: async () => {
    return await httpAxios.get(`post`); // Define API route for fetching pages
  },
};

export default MenuService;
