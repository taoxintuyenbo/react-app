import httpAxios from "./httpAxios";

const PostService = {
  index: async () => {
    return await httpAxios.get(`post`);
  },
  trash: async () => {
    return await httpAxios.get(`post/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`post/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`post/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`post/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`post/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`post/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`post/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`post/destroy/${id}`);
  },
  getPageBySlug: async (slug) => {
    return await httpAxios.get(`page/${slug}`);
  },
  getAllPosts: async () => {
    return await httpAxios.get(`posts`);
  },
  getPostBySlug: async (slug) => {
    return await httpAxios.get(`post/${slug}`);
  },
};

export default PostService;
