import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productsSlice";

const EditProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount_price, setDiscount_price] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image_one, setImage_one] = useState(null);
  const [image_two, setImage_two] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.items);
  const navigate = useNavigate();

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data[0]);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [slug]);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setDiscount_price(product.discount_price);
      setQuantity(product.quantity);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (discount_price) {
      formData.append("discount_price", discount_price);
    }
    formData.append("quantity", quantity);
    formData.append("category", category);
    if (image_one) {
      formData.append("image_one", image_one);
    }
    if (image_two) {
      formData.append("image_two", image_two);
    }
    try {
      const res = await api.post(`/product-update/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      dispatch(fetchProducts());
      navigate(-1);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form className={GlobalStyle.form} onSubmit={handleSubmit}>
            <h2 className={GlobalStyle.formHeader}>edit product</h2>
            <input
              type="text"
              placeholder="Title"
              className={GlobalStyle.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className={GlobalStyle.inputText}
              cols={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="number"
              placeholder="Price"
              className={GlobalStyle.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Discount price (optional)"
              className={GlobalStyle.input}
              value={discount_price}
              onChange={(e) => setDiscount_price(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              className={GlobalStyle.input}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={GlobalStyle.inputThree}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <div className="w-full h-8 border rounded relative">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 cursor-pointer"
                onChange={(e) => setImage_one(e.target.files[0])}
              />
              <div className="w-full h-full bg-secondary text-white rounded flex items-center justify-center z-0">
                <p className="text-xs">
                  {image_one ? "Image added" : "Upload image 1"}
                </p>
              </div>
            </div>
            <div className="w-full h-8 border rounded relative">
              <input
                type="file"
                className="w-full h-full opacity-0 absolute top-0 cursor-pointer"
                onChange={(e) => setImage_two(e.target.files[0])}
              />
              <div className="w-full h-full bg-secondary text-white rounded flex items-center justify-center z-0">
                <p className="text-xs">
                  {image_two ? "Image added" : "Upload image 2 (optional)"}
                </p>
              </div>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <button className={GlobalStyle.formButton}>Update</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
