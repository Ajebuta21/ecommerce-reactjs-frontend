import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/categorySlice";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import toast from "react-hot-toast";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/category-store", { name });
      toast.success(res.data.message);
      dispatch(fetchCategories());
      navigate(-1);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <form className={GlobalStyle.form} onSubmit={handleSubmit}>
            <h2 className={GlobalStyle.formHeader}>new product</h2>
            <input
              type="text"
              placeholder="Title"
              className={GlobalStyle.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {loading ? (
              <LoadingSpinner />
            ) : (
              <button className={GlobalStyle.formButton}>Create</button>
            )}
          </form>
        </div>
      </div>
      ;
    </div>
  );
};

export default NewCategory;
