import api from "./api";

// Login (admin only will be allowed by backend role)
export const login = async (payload) => {
  const res = await api.post("/auth/login", payload);

  const { access_token, name, role } = res.data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("name", name);
  localStorage.setItem("role", role);

  return res.data;
};

export const logout = () => {
  localStorage.clear();
};

export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};
