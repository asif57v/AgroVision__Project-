// src/utils/auth.js
export const setAuth = (token, userType = "farmer") => {
  // token can be a JWT or simple flag
  localStorage.setItem("authToken", token);
  localStorage.setItem("userType", userType);
};

export const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userType");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const getUserType = () => localStorage.getItem("userType") || null;
