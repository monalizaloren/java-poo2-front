// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://44f0-2804-29b8-50b8-614-794c-9cd6-39ea-a332.ngrok-free.app' // URL base para o backend
});

export const getAllProducts = async () => {
  try {
    const response = await api.get('/produto/'); // Corrigido para usar o endpoint correto
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Outras funções mantidas sem alterações
export const getProductById = async (id) => {
  const response = await api.get(`/produto/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post('/produto', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/produto/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/produto/${id}`);
  return response.data;
};
