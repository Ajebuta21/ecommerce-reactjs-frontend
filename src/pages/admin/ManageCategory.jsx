import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../features/productsSlice";
import { fetchCategories } from "../../features/categorySlice";
import toast from "react-hot-toast";
import api from "../../api/api";

const ManageCategory = () => {
  const category = useSelector((state) => state.category.items);
  const status = useSelector((state) => state.category.status);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteCategory = async (id, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.delete(`/category-destroy/${id}`);
      toast.success(res.data.message);
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error.response?.data?.message || "Try again later");
    } finally {
      setLoading(false);
    }
  };

  const filtered = category.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="flex flex-col w-full gap-5">
          <h1 className={GlobalStyle.formHeader}>Manage categories</h1>
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-light">
              {category.length} categories
            </span>
            <Link
              to={`/admin/add-category`}
              className={GlobalStyle.smallButton}
            >
              New Category
            </Link>
          </div>
          <div className={GlobalStyle.separatorCenter}>
            <input
              type="text"
              className={GlobalStyle.inputTwo}
              placeholder="Search category"
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
                No category found matching your search.
              </span>
            </div>
          ) : (
            <div className="w-full gap-2 md:gap-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {filtered
                .slice()
                .reverse()
                .map((item) => {
                  return (
                    <div
                      key={item.id}
                      data-aos="fade-up"
                      className="flex flex-col gap-2 p-5 bg-white border"
                    >
                      <h2 className="text-sm max-sm:text-xs font-medium text-center">
                        {item.name}
                      </h2>
                      <Link
                        to={`/admin/edit-category/${item.id}`}
                        className={GlobalStyle.fullButton}
                      >
                        Edit Category
                      </Link>
                      <button
                        onClick={(e) => deleteCategory(item.id, e)}
                        className={GlobalStyle.fullButton}
                      >
                        {loading ? <LoadingSpinner /> : "Delete Category"}
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
