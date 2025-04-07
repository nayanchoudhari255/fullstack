// --- src/utils/localStorage.js ---
export const getUserFromStorage = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null; // ✅ Fix: Check if user is null before parsing
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };
  
  
  export const saveUserToStorage = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);
  };
  
  export const removeUserFromStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };
  