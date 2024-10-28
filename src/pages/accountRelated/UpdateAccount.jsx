import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import logo from "../../components/logo/ss.png";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UpdateAccount = () => {
  const profile = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const user = {
    name,
    email,
  };
    const navigate = useNavigate();
    
    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email)
        }
    }, [profile])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/update-account", user);
        toast.success(res.data.message);
        navigate(-1)
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
        <h2 className={GlobalStyle.formHeader}>Update profile information</h2>
        <input
          type="text"
          placeholder="Full name"
          className={GlobalStyle.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className={GlobalStyle.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className={GlobalStyle.formButton}>Update</button>
        )}
      </form>
    </div>
  );
};

export default UpdateAccount;
