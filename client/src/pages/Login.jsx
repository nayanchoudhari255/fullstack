
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; //  Use useNavigate for better navigation
import '../styles/login.css';
import Navbar from "../components/Navbar";

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate(); // React Router navigation hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevents form from reloading the page
    setFormError(""); // ✅ Clear previous errors

    if (!email || !password) {
      setFormError("❌ Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard"); //  Redirect to dashboard after login
    } catch (err) {
      setFormError("❌ Invalid email or password"); // Handle login errors
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="box">
          <h2 className="text">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="sbutton" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>New user? <a className="register-link" href="/register">Register</a></p>

          {/* ✅ Display error messages */}
          {(formError || error) && <p className="error-message">{formError || error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
