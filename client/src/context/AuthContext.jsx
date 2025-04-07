
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false); // ✅ Ensure loading state is set to false
  }, []);

  // ✅ Register User
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
  
      console.log("🔹 Sending Registration Request:", userData); // ✅ Log request data
  
      const { data } = await axios.post("http://localhost:5001/api/auth/register", userData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("✅ Registration Success:", data);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      
      return data;
    } catch (err) {
      console.error("❌ Registration Error:", err.response?.data || err.message); // ✅ Log Full Error
      setError(err.response?.data?.message || "Registration failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ Login User
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post("http://localhost:5001/api/auth/login", { email, password });

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("authToken", data.token); // ✅ Store token
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout User (Clear token & user data)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken"); // ✅ Remove stored token
  };

  // ✅ Fetch Profile Data (Ensures user session is active)
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ Get token
      if (!token) {
        console.log("No token available");
        return;
      }

      const response = await axios.get("http://localhost:5001/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data); // ✅ Update user state with profile data
      console.log("User Profile:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, logout, fetchProfileData, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
