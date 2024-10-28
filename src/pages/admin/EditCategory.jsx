import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts } from "../../features/productsSlice";
import { fetchCategories } from "../../features/categorySlice";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import toast from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/categories/${id}`);
      setCategory(res.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(`/category-update/${category.id}`, { name });
      toast.success(res.data.message);
      dispatch(fetchProducts());
      dispatch(fetchCategories());
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
            <h2 className={GlobalStyle.formHeader}>edit category</h2>
            <input
              type="text"
              placeholder="Category name"
              className={GlobalStyle.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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

export default EditCategory;
