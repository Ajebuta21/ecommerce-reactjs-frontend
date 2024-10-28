import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import api from "../../api/api";
import ProductCard from "../../components/productComponents/ProductCard";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const WIshlistPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getFavourites = async () => {
    setLoading(false);
    try {
      const res = await api.get("/favourites");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourites();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={GlobalStyle.container}>
      <div className={GlobalStyle.separator}>
        <h2 className={GlobalStyle.formHeader}>My Wishlist</h2>
      </div>
      {loading ? (
        <div className={GlobalStyle.separatorCenter}>
          <LoadingSpinner />
        </div>
      ) : products.length === 0 ? (
        <div className={GlobalStyle.separatorCenter}>
          <span className="text-xs">
            You have not added any products to your wishlist yet.
          </span>
        </div>
      ) : (
        <div className={GlobalStyle.productGrid}>
          {products
            .slice()
            .reverse()
            .map((item) => {
              return <ProductCard key={item.id} item={item} />;
            })}
        </div>
      )}
    </div>
  );
};

export default WIshlistPage;
