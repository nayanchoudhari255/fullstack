// import axios from "axios";

// const API_URL = "http://localhost:5001/api"; // Ensure this matches your backend

// const API = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// export const register = async (userData) => {
//   const response = await API.post("/auth/register", userData);
//   return response.data;
// };

// export const login = async (email, password) => {
//   const response = await API.post("/auth/login", { email, password });
//   return response.data;
// };

// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("user");
// };

// export { API }; // ✅ Fix: Exporting API correctly

import axios from "axios";

const API_URL = "http://localhost:5001/api"; // ✅ Ensure this matches your backend URL

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Function to set Authorization token automatically
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("authToken", token); // ✅ Store token in localStorage
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
  }
};

// ✅ Register User
export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    setAuthToken(response.data.token); // ✅ Store token after registration
    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store user data
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Registration failed";
  }
};

// ✅ Login User
export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    setAuthToken(response.data.token); // ✅ Store token after login
    localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store user data
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};

// ✅ Logout User
export const logout = () => {
  setAuthToken(null); // ✅ Remove token from requests
  localStorage.removeItem("user");
};

export default API; // ✅ Fix: Properly export API instance
