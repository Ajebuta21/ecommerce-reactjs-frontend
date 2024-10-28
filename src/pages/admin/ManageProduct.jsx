import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useSelector } from "react-redux";
import ProductAdminCard from "../../components/productComponents/ProductAdminCard";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const product = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtered = product.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="flex flex-col w-full gap-5">
          <h1 className={GlobalStyle.formHeader}>Manage products</h1>
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-light">
              {product.length} products
            </span>
            <Link to={`/admin/add-product`} className={GlobalStyle.smallButton}>
              New Product
            </Link>
          </div>
          <div className={GlobalStyle.separatorCenter}>
            <input
              type="text"
              className={GlobalStyle.inputTwo}
              placeholder="Search product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {status !== "succeeded" ? (
            <div className={GlobalStyle.separatorCenter}>
              <LoadingSpinner />
            </div>
          ) : filtered.length === 0 ? (
            <div className={GlobalStyle.separatorCenter}>
              <span className="text-xs">
                No products found matching your search.
              </span>
            </div>
          ) : (
            <div className={GlobalStyle.productGridAdmin}>
              {filtered
                .slice()
                .reverse()
                .map((item) => {
                  return <ProductAdminCard key={item.id} item={item} />;
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
