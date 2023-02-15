import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggin: false,
  login: (token) => {},
  logOut: () => {},
});

 export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const isUserLogin = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token)
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  const contextValue = {
    token: token,
    isLoggin: isUserLogin,
    login: loginHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;