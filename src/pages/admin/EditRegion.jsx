import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { fetchRegions } from "../../features/regionSlice";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const EditRegion = () => {
  const { id } = useParams();
  const [region, setRegion] = useState({});
  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRegion = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/region/${id}`);
      setRegion(res.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRegion();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (region) {
      setName(region.name);
      setFee(region.fee);
    }
  }, [region]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(`/region-update/${region.id}`, { name, fee });
      toast.success(res.data.message);
      dispatch(fetchRegions());
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
            <h2 className={GlobalStyle.formHeader}>update region</h2>
            <input
              type="text"
              placeholder="Title"
              className={GlobalStyle.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="fee"
              className={GlobalStyle.input}
              value={fee}
              onChange={(e) => setFee(e.target.value)}
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

export default EditRegion;
