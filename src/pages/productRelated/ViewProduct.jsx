import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import GlobalStyle from "../../global/GlobalStyle";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCaretLeft,
  FaCaretRight,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  addItemToCart,
} from "../../features/cartSlice";
import { formatNaira } from "../../global/formatNaira";
import { renderStars } from "../../global/renderStars";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const ViewProduct = () => {
  const auth = useSelector((state) => state.user.auth);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const { slug } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.cartQuantity : 0;

  const images = [product.image_one];
  if (product.image_two) {
    images.push(product.image_two);
  }

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data[0]);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [slug]);

  const getRating = async () => {
    try {
      const res = await api.get(`/products/${product.id}/rating`);
      setUserRating(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFavourite = async () => {
    try {
      const res = await api.get(`/favourites/check/${product.id}`);
      setIsFavourite(res.data.isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavourite = async () => {
    const product_id = product.id;
    try {
      const res = await api.post(`/favourites/toggle/${product_id}`);
      setIsFavourite(!isFavourite);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  useEffect(() => {
    if (auth) {
      getRating();
      checkIfFavourite();
    }
    // eslint-disable-next-line
  }, [auth, product]);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [images.length]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseItemQuantity(product.id));
  };

  const handleDecreaseQuantity = () => {
    if (cartQuantity > 1) {
      dispatch(decreaseItemQuantity(product.id));
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    submitRating(rating);
  };

  const submitRating = async (rating) => {
    try {
      const res = await api.post(`/products/${product.id}/rate`, {
        rating_number: rating,
      });
      toast.success(res.data.message);
      getProduct(); // Refresh product data to update rating
      getRating(); // Refresh user rating
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit rating.");
    }
  };

  if (loading) {
    return (
      <div className={GlobalStyle.containerStatic}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {product && (
        <div className="w-full h-screen pt-20 grid grid-cols-1 lg:grid-cols-2 text-secondary">
          <div className="relative w-full h-full p-10 flex justify-center items-center">
            <div className="w-full aspect-[1/1] relative">
              <img
                src={images[currentImageIndex]}
                alt=""
                className="w-full h-full"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="w-10 h-full flex items-center justify-center text-black/50 bg-transparent hover:bg-black/5 transition-all ease-in-out duration-1000 absolute left-0 top-1/2 transform -translate-y-1/2"
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="w-10 h-full flex items-center justify-center text-black/50 bg-gray-transparent hover:bg-black/5 transition-all ease-in-out duration-1000 absolute right-0  top-1/2 transform -translate-y-1/2"
                  >
                    <FaAngleRight />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/6 p-4 flex flex-col justify-center gap-1">
              <div className="w-full flex gap-5 items-center justify-between">
                <h1 className={GlobalStyle.formHeader}>{product.name}</h1>
                <button onClick={toggleFavourite}>
                  {isFavourite ? (
                    <IoHeart className="text-red-500 text-xl" />
                  ) : (
                    <IoHeartOutline className="text-xl" />
                  )}
                </button>
              </div>
              <div className="w-full flex justify-between text-xs">
                <span className="flex gap-2 items-center">
                  <span>Category:</span>
                  <Link
                    to={`/categories/${product.category}`}
                    className="hover:text-primary transition-all ease-in-out duration-1000"
                  >
                    {product.category}
                  </Link>
                </span>
                <span className="flex items-center gap-1">
                  <span>Ratings:</span>
                  <span className="flex items-center gap-0.5">
                    {product.people_rated > 0 ? (
                      <>
                        {renderStars(
                          parseInt(product.rating / product.people_rated)
                        )}
                      </>
                    ) : (
                      "No ratings yet"
                    )}
                  </span>
                  <span>({product.people_rated})</span>
                </span>
              </div>
            </div>
            <div className="w-full h-2/6 px-4">
              <div
                data-aos="zoom-in"
                className="w-full h-full flex flex-col border border-secondary/30 bg-gray-100 p-2"
              >
                <span className="w-full py-0.5 font-semibold">
                  <h2 className="">Description</h2>
                </span>
                <span className="w-full h-full overflow-scroll">
                  {product.description}
                </span>
              </div>
            </div>
            {product.discount_price === null ? (
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <span className="lg:text-xl">{formatNaira(product.price)}</span>
              </div>
            ) : (
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <span className="lg:text-xl">
                  {formatNaira(product.discount_price)}
                </span>
                <span className="line-through text-red-400 text-xs lg:text-sm">
                  {formatNaira(product.price)}
                </span>
              </div>
            )}

            <div className="w-full h-1/6 px-4 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <button
                  onClick={handleDecreaseQuantity}
                  className={GlobalStyle.weightButton}
                >
                  <FaCaretLeft />
                </button>
                <span>{cartQuantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className={GlobalStyle.weightButton}
                >
                  <FaCaretRight />
                </button>
              </div>
              {userRating === 0 ? (
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarClick(index + 1)}
                      className="text-xl"
                    >
                      {index < selectedRating ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  {renderStars(userRating)}
                </div>
              )}
            </div>
            <div className="w-full h-1/6 flex items-center px-4">
              <button
                onClick={handleAddToCart}
                className={GlobalStyle.fullButton}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
