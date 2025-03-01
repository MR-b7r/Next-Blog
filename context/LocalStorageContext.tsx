import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

function updateLocalStorage(updateUser) {
  localStorage.setItem("currentUser", JSON.stringify(updateUser));
}
const userContext = createContext();

const userProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [setUser]);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};

userProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useCurrentUser() {
  const context = useContext(userContext);
  if (context === undefined)
    throw new Error("userContext used outside Provider");
  return context;
}

export { userProvider, useCurrentUser };
