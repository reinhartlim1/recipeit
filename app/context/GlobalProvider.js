import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
        setUser(user);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    });
    setLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, isLogged, setIsLogged, setUser, loading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
