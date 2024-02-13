import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllUsers } from "../api";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || false
  );
  const [id, setId] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || null
  );

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(token);

      if (response.status === "success") {
        setUsers(response.data);
      } else {
        Swal.fire({
          title: "Failed to retrieve users",
          icon: "error",
          text: response.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to retrieve users",
        icon: "error",
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const updateUser = (newUserData) => {
    localStorage.setItem("token", JSON.stringify(newUserData.accessToken));
    localStorage.setItem("isAdmin", JSON.stringify(newUserData.isAdmin));
    localStorage.setItem("id", JSON.stringify(newUserData.id));

    setToken(newUserData.accessToken);
    setIsAdmin(newUserData.isAdmin);
    setId(newUserData.id);
  };

  const removeUser = () => {
    localStorage.clear();
    setUsers([]);
    setToken(null);
    setIsAdmin(false);
    setId(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedId = localStorage.getItem("id");

    if (storedToken) {
      setToken(JSON.parse(storedToken));
      setIsAdmin(JSON.parse(storedAdmin));
      setId(JSON.parse(storedId));
    }
    if (isAdmin) {
      fetchUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <UserContext.Provider
      value={{
        id,
        token,
        isAdmin,
        users,
        updateUser,
        removeUser,
        fetchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
