import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";

function Login() {
    // Define state variables for email, password, error message, and submit button status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [emailAuthSuccess, setEmailAuthSuccess] = useState(false);
    const [googleAuthSuccess, setGoogleAuthSuccess] = useState(false);
    // Define a navigate function using the useNavigate hook from react-router-dom
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Handle the back button click event here`
        window.history.back();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!email || !password) {
            setError("Please fill in all fields");
        } else {
            setError("");
            setSubmitButtonDisabled(true);
    
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/QnA"); // Navigate immediately after successful email/password login
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error signing in:", error);
                    setError("Invalid email or password. Please try again.");
                    setSubmitButtonDisabled(false);
                });
        }
    };
    
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate("/QnA"); // Navigate immediately after successful Google login
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
                setError("Error signing in with Google. Please try again.");
            });
    };

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent");
                setForgotPassword(false);
                setError("Password reset email sent. Please check your inbox.");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                setError("Error sending password reset email. Please try again.");
            });
    };

  return (
    <div >
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
};

export default Login;
