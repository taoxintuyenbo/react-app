import httpAxios from "./httpAxios";

const ProductService = {
  index: async () => {
    return await httpAxios.get(`product`);
  },

  fetchCategories: async () => {
    return await httpAxios.get(`category`); // Adjust the URL as needed
  },
  fetchBrands: async () => {
    return await httpAxios.get(`brand`); // Adjust the URL as needed
  },
  trash: async () => {
    return await httpAxios.get(`product/trash`);
  },
  show: async (id) => {
    return await httpAxios.get(`product/show/${id}`);
  },
  store: async (data) => {
    return await httpAxios.post(`product/store`, data);
  },
  update: async (id, data) => {
    return await httpAxios.post(`product/update/${id}`, data);
  },
  status: async (id) => {
    return await httpAxios.get(`product/status/${id}`);
  },
  delete: async (id) => {
    return await httpAxios.get(`product/delete/${id}`);
  },
  restore: async (id) => {
    return await httpAxios.get(`product/restore/${id}`);
  },
  destroy: async (id) => {
    return await httpAxios.delete(`product/destroy/${id}`);
  },
  getNewProducts: async (limit) => {
    return await httpAxios.get(`product/new/${limit}`);
  },
  getSaleProducts: async (limit) => {
    return await httpAxios.get(`product/sale/${limit}`);
  },
  getBestSellerProducts: async (limit) => {
    return await httpAxios.get(`product/bestseller/${limit}`);
  },
  getCategoryHomeProducts: async (limit) => {
    return await httpAxios.get(`product/productcategoryhome/${limit}`);
  },

  allProducts: async ({
    categoryId,
    brandId,
    priceMin,
    priceMax,
    page,
    sort,
  }) => {
    const params = new URLSearchParams();
    if (categoryId.length > 0)
      params.append("category_id", categoryId.join(","));
    if (brandId.length > 0) params.append("brand_id", brandId.join(","));
    params.append("price_min", priceMin ?? 0);
    params.append("price_max", priceMax ?? 9999999999);
    params.append("page", page || 1); // Pass page parameter
    params.append("sort", sort || "newest"); // Pass page parameter

    const url = `product_all?${params.toString()}`;
    return await httpAxios.get(url);
  },
  productByCat: async (slug, page = 1) => {
    return await httpAxios.get(`category/${slug}`, {
      params: { page },
    });
  },
  detail: async (slug) => {
    return await httpAxios.get(`product/${slug}`);
  },
};

export default ProductService;
