import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { Link } from "react-router-dom";

const AddMenu = () => {
  const [menu, setMenu] = useState({
    name: "",
    link: "",
    position: "mainmenu",
    status: 1, // Default status to "Xuất bản"
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [topics, setTopics] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await MenuService.fetchCategories();
        const brandResponse = await MenuService.fetchBrands();
        const topicResponse = await MenuService.fetchTopics();
        const pageResponse = await MenuService.fetchPages();

        setCategories(categoryResponse.categories || []);
        setBrands(brandResponse.brands || []);
        setTopics(topicResponse.topics || []);
        setPages(pageResponse.posts || []);
      } catch (err) {
        setError("Failed to load menu data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  const handleSubmitCategories = async (e) => {
    e.preventDefault();

    // Get the selected category's name for the API
    const selectedCategoryName = categories.find(
      (category) => category.id === Number(selectedCategory) // Ensure correct data type
    )?.name;

    if (!selectedCategoryName) {
      console.log("Debug - Selected Category ID:", selectedCategory);
      console.log("Debug - Available Categories:", categories);

      setError("Vui lòng chọn danh mục hợp lệ.");
      return;
    }

    const formData = {
      ...menu,
      category_id: selectedCategory,
      name: selectedCategoryName, // Include the category name
    };

    try {
      const respone = await MenuService.store(formData);
      console.log(respone);
      navigate("/admin/menu");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        console.log(err);
      } else {
        console.log(err);
        setError("Error adding menu. Please try again.");
      }
    }
  };

  const handleSubmitBrands = async (e) => {
    e.preventDefault();
    const selectedBrandName = brands.find(
      (brand) => brand.id === Number(selectedBrand) // Ensure correct data type
    )?.name;

    if (!selectedBrandName) {
      console.log("Debug - Selected Category ID:", selectedBrand);
      console.log("Debug - Available Categories:", categories);

      setError("Vui lòng chọn danh mục hợp lệ.");
      return;
    }
    const formData = {
      ...menu,
      brand_id: selectedBrand,
      name: selectedBrandName,
    };

    try {
      await MenuService.store(formData);
      navigate("/admin/menu");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError("Error adding menu. Please try again.");
      }
    }
  };

  const handleSubmitTopics = async (e) => {
    e.preventDefault();
    const selectedTopicName = topics.find(
      (topic) => topic.id === Number(selectedTopic) // Ensure correct data type
    )?.name;

    if (!selectedTopicName) {
      setError("Vui lòng chọn danh mục hợp lệ.");
      return;
    }

    const formData = {
      ...menu,
      topic_id: selectedTopic,
      name: selectedTopicName,
    };
    try {
      const respone = await MenuService.store(formData);
      console.log(respone);

      navigate("/admin/menu");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        console.log(err);
      } else {
        console.log(err);

        setError("Error adding menu. Please try again.");
      }
    }
  };

  const handleSubmitPages = async (e) => {
    e.preventDefault();
    console.log(pages);
    const selectedPostName = pages.find(
      (page) => page.id === Number(selectedPage) // Ensure correct data type
    )?.title;

    if (!selectedPostName) {
      setError("Vui lòng chọn danh mục hợp lệ.");
      return;
    }

    const formData = {
      ...menu,
      page_id: selectedPage,
      name: selectedPostName,
    };

    try {
      const respone = await MenuService.store(formData);
      console.log(respone);
      navigate("/admin/menu");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
        console.log(err);
      } else {
        setError("Error adding menu. Please try again.");
        console.log(err);
      }
    }
  };

  const handleSubmitCustomLink = async (e) => {
    e.preventDefault();

    const formData = {
      ...menu,
    };

    try {
      await MenuService.store(formData);
      navigate("/admin/menu");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError("Error adding menu. Please try again.");
      }
    }
  };

  return (
    <section className="content">
      <div className="container mx-auto py-6">
        <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-semibold mb-4">Thêm Menu</h1>
            <Link
              to="/admin/menu"
              className="btn bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block mx-3"
            >
              Quay lại
            </Link>
          </div>

          {/* Position Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="position">
              Vị trí
            </label>
            <select
              id="position"
              name="position"
              value={menu.position}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            >
              <option value="mainmenu">Main Menu</option>
              <option value="footermenu">Footer Menu</option>
            </select>
          </div>

          {/* Categories Dropdown */}
          <form onSubmit={handleSubmitCategories}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="category_id">
                Danh mục
              </label>
              <select
                id="category_id"
                name="category_id"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Chọn danh mục</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có danh mục nào</option>
                )}
              </select>
              {selectedCategory && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Thêm menu
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Brands Dropdown */}
          <form onSubmit={handleSubmitBrands}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="brand_id">
                Thương hiệu
              </label>
              <select
                id="brand_id"
                name="brand_id"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Chọn thương hiệu</option>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có thương hiệu nào</option>
                )}
              </select>
              {selectedBrand && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Thêm menu
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Topics Dropdown */}
          <form onSubmit={handleSubmitTopics}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="topic_id">
                Chủ đề
              </label>
              <select
                id="topic_id"
                name="topic_id"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Chọn chủ đề</option>
                {topics.length > 0 ? (
                  topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có chủ đề nào</option>
                )}
              </select>
              {selectedTopic && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Thêm menu
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Pages Dropdown */}
          <form onSubmit={handleSubmitPages}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="page_id">
                Bài viết
              </label>
              <select
                id="page_id"
                name="page_id"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              >
                <option value="">Chọn trang</option>
                {pages.length > 0 ? (
                  pages.map((page) => (
                    <option key={page.id} value={page.id}>
                      {page.title}
                    </option>
                  ))
                ) : (
                  <option disabled>Không có trang nào</option>
                )}
              </select>
              {selectedPage && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Thêm menu
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Custom Link */}
          <form onSubmit={handleSubmitCustomLink}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Tên menu
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={menu.name}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="link">
                Liên kết
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={menu.link}
                onChange={handleChange}
                className={`border border-gray-300 p-2 w-full ${
                  errors.link ? "border-red-500" : ""
                }`}
              />
              {errors.link && (
                <span className="text-red-500 text-sm">{errors.link}</span>
              )}
            </div>
            {menu.name && menu.link && (
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn bg-green-500 text-white py-2 px-4 rounded"
                >
                  Thêm menu
                </button>
              </div>
            )}
          </form>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Trạng thái</label>
            <select
              name="status"
              value={menu.status}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
            >
              <option value={1}>Xuất bản</option>
              <option value={2}>Chưa xuất bản</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMenu;
