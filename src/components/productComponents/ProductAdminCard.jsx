import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { Link } from "react-router-dom";
import { formatNaira } from "../../global/formatNaira";
import api from "../../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../loader/LoadingSpinner";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";
import { renderStars } from "../../global/renderStars";

const ProductAdminCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const deleteProduct = async (id, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.delete(`/product-destroy/${id}`);
      toast.success(res.data.message);
      dispatch(fetchProducts());
    } catch (error) {
      toast.error(error.response?.data?.message || "Try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-1 relative z-0 cursor-pointer bg-white border">
      <Link
        to={`/products/${item.slug}`}
        className="w-full flex flex-col gap-1"
      >
        {item.discount_price === null ? null : (
          <div className="w-12 h-12 bg-secondary text-white text-xs flex items-center justify-center absolute right-2 top-2 rounded-full">
            -{" "}
            {Math.round(
              ((item.price - item.discount_price) / item.price) * 100
            )}
            %
          </div>
        )}
        {item.quantity !== 0 ? null : (
          <div className="w-fit px-3 h-10 bg-secondary text-white text-xs flex items-center justify-center text-center absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Out Of Stock
          </div>
        )}
        <img
          src={item.image_one}
          alt=""
          className="w-full aspect-[1/1] object-cover"
        />
        <div className="px-1 w-full text-center text-xs lg:text-sm whitespace-nowrap overflow-hidden text-ellipsis capitalize">
          {item.name}
        </div>
        <div className="px-1 w-full text-center text-xs lg:text-sm">
          {item.discount_price === null
            ? formatNaira(item.price)
            : formatNaira(item.discount_price)}
        </div>
        {item.discount_price === null ? (
          <div className="px-1 w-full text-center text-xxs text-transparent">
            no discount
          </div>
        ) : (
          <div className="px-1 w-full text-center text-xxs">
            <span className="line-through text-red-400">
              {formatNaira(item.price)}
            </span>
          </div>
        )}
        <div className="px-2 w-full flex justify-between text-xxs">
          <span>{item.quantity} item(s) left</span>
          <span className="flex items-center gap-1">
            <span className="flex items-center gap-0.5">
              {item.people_rated > 0 ? (
                <>{renderStars(parseInt(item.rating / item.people_rated))}</>
              ) : (
                "No ratings yet"
              )}
            </span>
            <span>({item.people_rated})</span>
          </span>
        </div>
      </Link>
      <div className="w-full px-2">
        <Link
          to={`/admin/edit-product/${item.slug}`}
          className={GlobalStyle.fullButton}
        >
          Edit Product
        </Link>
      </div>
      <div className="w-full px-2 pb-2">
        <button
          className={GlobalStyle.fullButton}
          onClick={(e) => deleteProduct(item.id, e)}
        >
          {loading ? <LoadingSpinner /> : "Delete Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductAdminCard;
