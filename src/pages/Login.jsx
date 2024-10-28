import React, { useState } from "react";
import GlobalStyle from "../global/GlobalStyle";
import logo from "../components/logo/ss.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/loader/LoadingSpinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    email,
    password,
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", user);
      localStorage.setItem("access_token", res.data.access_token);
      toast.success("Log in successful");
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className={GlobalStyle.containerStatic}>
      <form className={GlobalStyle.form} onSubmit={handleSubmit}>
        <img src={logo} className="w-16" alt="logo" />
        <h2 className={GlobalStyle.formHeader}>Welcome back</h2>
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
          <LoadingSpinner/>
        ) : (
          <button className={GlobalStyle.formButton}>Sign in</button>
        )}
        <span className={GlobalStyle.smallText}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="hover:text-primary transition-all ease-in-out duration-500"
          >
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
