import Form from "./components/form";
import "./App.css";
import Navbar from "./components/navbar";
import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/profile";

export const UserContext = createContext();
function App() {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [isSignin, setIsSignin] = useState(() => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      return !!userDetails.token;
    }
    return false;
  });

  return (
    <div className="App">
      <UserContext.Provider
        value={{ userDetails, setUserDetails, isSignin, setIsSignin }}
      >
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" Component={Form} />
            <Route path="/profile" Component={Profile} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;