import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../features/userSlice";
import api from "../api/api";

const useFetchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.post("/me");
        dispatch(addUser(res.data));
      } catch (error) {
        localStorage.removeItem("access_token");
        dispatch(removeUser());
        navigate("/");
      }
    };

    if (token) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, dispatch, navigate]);

  return null;
};

export default useFetchUser;
