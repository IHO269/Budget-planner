import axios from "axios";

const API_URL = "http://localhost:3000/api/categories";

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/${categoryId}`);
  return response.data;
};