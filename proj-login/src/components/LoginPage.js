// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {auth} from "../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('user:', user);
            onLogin(email);
        } catch (error) {
            const errorCode = error.code;
            let errorMessage = error.message;

            // Customize error message based on error code
            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'User not found';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/missing-email':
                    errorMessage = 'Please enter an email address';
                    break;
                case 'auth/missing-password':
                    errorMessage = 'Please enter a password';
                    break;
                default:
                    break;
            }

            console.error('errorCode:', errorCode);
            console.error('errorMessage:', errorMessage);

            alert(errorMessage);
        }
    };
  return (
    <div>
      <Navbar isAuthenticated={false} /> {/* Pass isAuthenticated as false for login page */}
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
