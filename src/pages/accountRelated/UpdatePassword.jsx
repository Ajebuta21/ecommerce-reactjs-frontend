import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import logo from "../../components/logo/ss.png";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [old_password, setOld_password] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const user = {
    old_password: old_password,
    password: password,
    password_confirmation: confirmpassword,
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/update-password", user);
      toast.success(res.data.message);
      navigate(-1);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          if (Array.isArray(errors[key])) {
            errors[key].forEach((message) => {
              toast.error(message);
            });
          } else {
            toast.error(errors[key]);
          }
        });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={GlobalStyle.containerStatic}>
      <form className={GlobalStyle.form} onSubmit={handleSubmit}>
        <img src={logo} className="w-16" alt="logo" />
        <h2 className={GlobalStyle.formHeader}>Update password</h2>
        <input
          type={hidden ? "password" : "text"}
          placeholder="Old password"
          className={GlobalStyle.input}
          value={old_password}
          onChange={(e) => setOld_password(e.target.value)}
        />
        <input
          type={hidden ? "password" : "text"}
          placeholder="New password"
          className={GlobalStyle.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type={hidden ? "password" : "text"}
          placeholder="Confirm password"
          className={GlobalStyle.input}
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <div className="w-full flex justify-end">
          {hidden ? (
            <div
              onClick={() => sethidden(!hidden)}
              className="flex items-center gap-1 text-secondary text-xs cursor-pointer"
            >
              <p className="">Show password</p>
              <FaRegEye />
            </div>
          ) : (
            <div
              onClick={() => sethidden(!hidden)}
              className="flex items-center gap-1 text-secondary text-xs cursor-pointer"
            >
              <p className="">Hide password</p>
              <FaRegEyeSlash />
            </div>
          )}
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className={GlobalStyle.formButton}>Update</button>
        )}
      </form>
    </div>
  );
};

export default UpdatePassword;
