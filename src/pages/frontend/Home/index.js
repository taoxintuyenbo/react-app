import React from "react";
import Carousel from "../../../components/Carousel";
import NewProducts from "../../../components/NewProducts";
import SaleProducts from "../../../components/SaleProducts";
import BestSellerProducts from "../../../components/BestSellerProducts";
import ProductCategoryHome from "../../../components/ProductCategoryHome";
import LatestPost from "../../../components/LatestPost";
const Home = () => {
  return (
    <>
      <Carousel />
      {/* Product Grid */}
      <main className="container mx-auto py-8">
        <section className="my-12">
          <NewProducts />
          <SaleProducts />
          <BestSellerProducts />
          <ProductCategoryHome />
          <LatestPost />
        </section>
      </main>

      {/* Footer */}
    </>
  );
};

export default Home;
