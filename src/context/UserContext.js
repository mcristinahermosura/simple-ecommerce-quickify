import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("isAdmin");

    if (storedToken) {
      setUser(JSON.parse(storedToken));
      setIsAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const updateUser = (newUserData) => {
    localStorage.setItem("token", JSON.stringify(newUserData.accessToken));
    localStorage.setItem("isAdmin", JSON.stringify(newUserData.isAdmin));
    setUser(newUserData.accessToken);
    setIsAdmin(newUserData.isAdmin);
  };

  const removeUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider
      value={{
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

export default UserContext;
