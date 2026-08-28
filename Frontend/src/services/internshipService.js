import api from "./api";

const internshipService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get("/internships/stats/dashboard");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to load dashboard statistics.",
        }
      );
    }
  },

  getRecentInternships: async () => {
    try {
      const response = await api.get("/internships?limit=5");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch recent internships.",
        }
      );
    }
  },

  getAllInternships: async (page = 1, search = "", status = "") => {
    try {
      const response = await api.get("/internships", {
        params: {
          page,
          limit: 10,
          search,
          status,
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch internships.",
        }
      );
    }
  },

  createInternship: async (formData) => {
    try {
      const response = await api.post("/internships", formData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to create internship.",
        }
      );
    }
  },

  updateInternship: async (id, formData) => {
    try {
      const response = await api.put(`/internships/${id}`, formData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to update internship.",
        }
      );
    }
  },

  deleteInternship: async (id) => {
    try {
      const response = await api.delete(`/internships/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to delete internship.",
        }
      );
    }
  },
};

export default internshipService;