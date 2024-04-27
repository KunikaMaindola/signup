import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Form() {
  const { userDetails, setUserDetails, isSignin, setIsSignin } =
    useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.conformpassword.value) {
      setErrorMessage("Error: Passwords do not match");
      return;
    }
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const token = Array.from(array, (byte) =>
      ("0" + (byte & 0xff).toString(16)).slice(-2)
    ).join("");

    setUserDetails({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      token: token,
    });

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
     
    setIsSignin(true)
    
    navigate('/profile');
  };
  return (
    <div className="form-container">
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="conformpassword"
          placeholder="Confirm Password"
          required
        />

        {errorMessage && (
          <p className="message-error">Error : All the fields are mandatory</p>
        )}
        {isSignin && <p className="message-success">Successfully Signed Up!</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Form;