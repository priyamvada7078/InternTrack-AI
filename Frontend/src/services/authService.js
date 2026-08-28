import api from "./api";

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: error.message || "Failed to login. Please try again.",
        }
      );
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: error.message || "Failed to register account.",
        }
      );
    }
  },

  // GET /api/auth/me — fetch current authenticated user from token
  getMe: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data; // { success: true, user: { id, name, email, role } }
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch user.",
        }
      );
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch profile.",
        }
      );
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
