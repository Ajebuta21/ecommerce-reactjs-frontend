import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../components/logo/ss.png";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const UpdateContact = () => {
  const profile = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const user = {
    phone,
    address,
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setPhone(profile.phone);
      setAddress(profile.address);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/update-contact", user);
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
        <h2 className={GlobalStyle.formHeader}>Update contact information</h2>
        <input
          type="tel"
          placeholder="Phone number"
          className={GlobalStyle.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className={GlobalStyle.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

export default UpdateContact;
