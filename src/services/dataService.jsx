import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

// Fungsi pembantu untuk mengambil token paling update dari browser
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 1. SERVIS UNTUK UPCOMING BILLS
export const billService = async () => {
  try {
    const response = await axios.get(`${API_URL}/bills`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};

// 2. SERVIS UNTUK EXPENSES
export const expenseService = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, getAuthHeader());
    return response.data.data ? response.data.data : response.data; 
  } catch (error) {
    throw error.response || error;
  }
};

// 3. SERVIS UNTUK GOAL
export const goalService = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals`, getAuthHeader());
    return response.data.data ? response.data.data : response.data;
  } catch (error) {
    throw error.response || error;
  }
};