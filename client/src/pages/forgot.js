import React, { useState } from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert("Error sending password reset email. Please try again.");
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default Forgot;