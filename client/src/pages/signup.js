import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      setSubmitButtonDisabled(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Signup successful");
          navigate("/login");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error signing up:", error);
          setError("Error signing up. Please try again.");
          setSubmitButtonDisabled(false);
        });
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={submitButtonDisabled}>
          Signup
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>{error}</p>
    </div>
  );
}

export default Signup;
