import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(JSON.parse(token) || null);

  useEffect(() => {
    // Update the user state whenever localStorage.getItem("token") changes
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser(JSON.parse(storedToken));
    }
  }, [token]);

  const updateUser = (newUserData) => {
    localStorage.setItem("token", JSON.stringify(newUserData));
    setUser(newUserData); // Update the user state directly
  };

  const removeUser = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the user state
  };

  const contextValue = {
    user,
    updateUser,
    removeUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
