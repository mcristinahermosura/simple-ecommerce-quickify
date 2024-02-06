import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedId = localStorage.getItem("id");

    if (storedToken) {
      setUser(JSON.parse(storedToken));
      setIsAdmin(JSON.parse(storedAdmin));
      setId(JSON.parse(storedId));
    }
  }, []);

  const updateUser = (newUserData) => {
    localStorage.setItem("token", JSON.stringify(newUserData.accessToken));
    localStorage.setItem("isAdmin", JSON.stringify(newUserData.isAdmin));
    localStorage.setItem("id", JSON.stringify(newUserData.id));
    setUser(newUserData.accessToken);
    setIsAdmin(newUserData.isAdmin);
    setId(newUserData.id);
  };

  const removeUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("id");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider
      value={{
        id,
        user,
        isAdmin,
        updateUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
