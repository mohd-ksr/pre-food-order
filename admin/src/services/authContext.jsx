import { createContext, useContext, useState } from "react";
import { isAdmin as checkAdmin, isLoggedIn as checkLoggedIn } from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());
  const [isAdmin, setIsAdmin] = useState(checkAdmin());

  const syncAuth = () => {
    setIsLoggedIn(checkLoggedIn());
    setIsAdmin(checkAdmin());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, syncAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);