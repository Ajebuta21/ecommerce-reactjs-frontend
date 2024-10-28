import React, { useState } from "react";
import GlobalStyle from "../global/GlobalStyle";
import logo from "../components/logo/ss.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/loader/LoadingSpinner";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const user = {
    name,
    email,
    password,
    password_confirmation: confirmpassword,
  };
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   try {
     const res = await api.post("/register", user);
     toast.success(res.data.message);
     setLoading(false);
     navigate("/login-user");
   } catch (error) {
     setLoading(false);
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
   }
 };


  return (
    <div className={GlobalStyle.containerStatic}>
      <form className={GlobalStyle.form} onSubmit={handleSubmit}>
        <img src={logo} className="w-16" alt="logo" />
        <h2 className={GlobalStyle.formHeader}>Create account</h2>
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
        <input
          type={hidden ? "password" : "text"}
          placeholder="Password"
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
          <button className={GlobalStyle.formButton}>Sign up</button>
        )}
        <span className={GlobalStyle.smallText}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:text-primary transition-all ease-in-out duration-500"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
