import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/transactions";

// Fonction pour récupérer les en-têtes d'autorisation
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assurez-vous que le token est stocké dans localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Ajout de l'en-tête Authorization
    },
  };
};

// Ajouter une transaction
export const createTransaction = async (transactionData) => {
  const token = localStorage.getItem("token"); // Vérifie que le token est bien récupéré
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  try {
      const response = await axios.post(API_BASE_URL, transactionData, config);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la création de la transaction :", error.response?.data || error.message);
      throw error;
  }
};

// Récupérer les transactions d'un utilisateur
export const getTransactions = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/${userId}`, getAuthHeaders());
  return response.data;
};

// Modifier une transaction
export const updateTransaction = async (transactionId, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/${transactionId}`, updatedData, getAuthHeaders());
  return response.data;
};

// Supprimer une transaction
export const deleteTransaction = async (transactionId) => {
  const response = await axios.delete(`${API_BASE_URL}/${transactionId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};