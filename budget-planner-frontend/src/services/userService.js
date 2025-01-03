import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/user";

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};