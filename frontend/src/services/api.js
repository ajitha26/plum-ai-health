import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = {
  post: async (endpoint, data, isFile = false) => {
    let res;
    if (isFile) {
      res = await axios.post(`${API_BASE}${endpoint}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      res = await axios.post(`${API_BASE}${endpoint}`, data);
    }
    return res.data;
  },
};

export default api;
