
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // ✅ Use React Router for navigation
import '../styles/register.css';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate(); // ✅ Use navigate instead of window.location.href

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevents page refresh
    setFormError(""); // ✅ Clears previous errors

    if (!name || !email || !password || !confirmPassword) {
      setFormError("❌ Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("❌ Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setFormError("❌ Password must be at least 6 characters");
      return;
    }

    try {
      await register({ name, email, password });
      navigate("/login"); // ✅ Redirect to login after successful registration
    } catch (err) {
      setFormError("❌ Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="box">
          <h2 className="text">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="sbutton" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p> Already have an account? <a className="llink" href="/login">Login</a></p>

          {/* ✅ Display error messages */}
          {(formError || error) && <p className="error-message">{formError || error}</p>}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
