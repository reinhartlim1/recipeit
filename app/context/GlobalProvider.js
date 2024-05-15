import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getRea } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

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
  }, []);

  return (
    <GlobalContext.Provider value={{ user, isLogged, setIsLogged, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
