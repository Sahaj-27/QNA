import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // State variables for form fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // State variable for disabling the submit button during login
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      setSubmitButtonDisabled(true);

      // Firebase login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/QnA"); // Navigate to QnA page after successful login
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setError("Invalid email or password. Please try again.");
          setSubmitButtonDisabled(false); // Enable the submit button again after an error
        });
    }
  };

  // Function to handle Google sign in
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    // Firebase Google sign in
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/QnA"); // Navigate to QnA page after successful Google sign in
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setError("Error signing in with Google. Please try again.");
      });
  };

  // Render the login form and Google sign in button
  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit" disabled={submitButtonDisabled}>
          Login
        </button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p>
        <Link to="/forgot">Forgot Password</Link>
      </p>
      <p>{error}</p>
    </div>
  );
}

export default Login;