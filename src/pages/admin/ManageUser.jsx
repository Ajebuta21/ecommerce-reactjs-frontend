import React, { useEffect, useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import api from "../../api/api";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/all-users");
      setUsers(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-lin
  }, []);

  const filtered = users.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={GlobalStyle.containerAdmin}>
      <div className={GlobalStyle.adminWrap}>
        <div className="flex flex-col w-full gap-5">
          <h1 className={GlobalStyle.formHeader}>Manage users</h1>
          <div className="w-full flex justify-between items-center">
            <span className="text-xs font-light">{users.length} users</span>
          </div>
          <div className={GlobalStyle.separatorCenter}>
            <input
              type="text"
              className={GlobalStyle.inputTwo}
              placeholder="Search user by email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {loading ? (
            <div className={GlobalStyle.separatorCenter}>
              <LoadingSpinner />
            </div>
          ) : filtered.length === 0 ? (
            <div className={GlobalStyle.separatorCenter}>
              <span className="text-xs">
                No users found matching your search.
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col border-x border-t">
              {filtered
                .slice()
                .reverse()
                .map((item) => {
                  return (
                    <Link
                      to={`/admin/manage-users/${item.id}`}
                      key={item.id}
                      className="p-2 border-b w-full bg-white flex items-center justify-between gap-1 hover:bg-secondary/5 transition-all ease-in-out duration-1000"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="capitalize">{item.name}</span>
                        <span className="text-xs">{item.email}</span>
                      </div>
                      <div className="py-1 px-3 rounded bg-secondary text-xs font-light text-white w-fit h-fit capitalize">
                        {item.role}
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
