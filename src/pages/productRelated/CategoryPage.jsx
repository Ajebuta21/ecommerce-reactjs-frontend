import React from "react";
import { useParams } from "react-router-dom";
import GlobalStyle from "../../global/GlobalStyle";
import { useSelector } from "react-redux";
import ProductCard from "../../components/productComponents/ProductCard";

const CategoryPage = () => {
  const { name } = useParams();
  const product = useSelector((state) => state.products.items);
  return (
    <div className={GlobalStyle.container}>
      <div className="w-full p-5 lg:p-10">
        <h2 className={GlobalStyle.formHeader}>Shop for {name}</h2>
      </div>
      <div className="w-full px-5 lg:px-10 gap-2 md:gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {product
          .filter((product) => product.category === name)
          .map((item) => {
            return <ProductCard item={item} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPage;
