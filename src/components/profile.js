import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { userDetails, setIsSignin, isSignin } = useContext(UserContext);
  const navigate = useNavigate();

  const [detail, setDetail] = useState(userDetails);
  useEffect(() => {
    if (!isSignin) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setDetail("");
    setIsSignin(false);
    navigate("/");
  };

  return (
    <div className="profile">
      <h1>Profile</h1>

      <div className="message-wrap">
        <p>Full Name : {userDetails && detail.name}</p>
        <p>Email : {userDetails && detail.email}</p>
        <p>Password : {userDetails && detail.password}</p>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;