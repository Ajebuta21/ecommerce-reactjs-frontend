import React from "react";
import { formatNaira } from "../../global/formatNaira";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { renderStars } from "../../global/renderStars";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div
      key={item.id}
      className="w-full flex flex-col gap-1 relative z-0 cursor-pointer"
      data-aos="fade-up"
    >
      <Link
        to={`/products/${item.slug}`}
        className="w-full flex flex-col gap-1"
      >
        {item.discount_price === null ? null : (
          <div className="w-12 h-12 bg-secondary text-white text-xs flex items-center justify-center text-center absolute right-2 top-2 rounded-full">
            -{" "}
            {Math.round(
              ((item.price - item.discount_price) / item.price) * 100
            )}
            %
          </div>
        )}
        {item.quantity !== 0 ? null : (
          <div className="w-fit px-3 h-10 bg-secondary text-white text-xs flex items-center justify-center absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
      <div className="w-full p-2">
        <button
          onClick={() => dispatch(addItemToCart(item))}
          className="border border-secondary text-sm rounded w-full py-1.5 hover:bg-secondary hover:text-white transition-all ease-in-out duration-1000"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
