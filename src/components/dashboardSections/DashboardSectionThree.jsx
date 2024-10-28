import React, { useEffect, useState } from "react";
import api from "../../api/api";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../loader/LoadingSpinner";
import { Link } from "react-router-dom";

const DashboardSectionThree = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/get-top-products");
      setProducts(res.data.topProducts || []); // Adjust based on the API response structure
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className={GlobalStyle.separatorCenter}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col text-xs lg:text-sm bg-white">
          <div className="w-full gap-1 grid grid-cols-4 py-3 border-y">
            <span className="w-full pl-2 col-start-1 col-end-3">
              Product Name
            </span>
            <span className="w-full">Category</span>
            <span className="w-full pr-2 text-right">Total Sales</span>
          </div>
          {products.map((item) => {
            return (
              <Link
                to={`/products/${item.slug}`}
                key={item.id}
                className="w-full gap-2 grid grid-cols-4 py-2 border-b hover:bg-secondary/5 ease-in-out duration-1000"
              >
                <span className="w-full pl-2 col-start-1 col-end-3 flex items-center gap-2">
                  <img
                    src={item.image_one}
                    alt=""
                    className="w-8 h-8 rounded-full border"
                  />{" "}
                  <span className=" whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </span>
                </span>
                <span className="w-full flex items-center">
                  {item.category}
                </span>
                <span className="w-full flex items-center pr-2 justify-end">
                  {item.purchasedQuantity}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DashboardSectionThree;
