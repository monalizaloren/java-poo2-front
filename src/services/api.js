import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082' // URL base para o backend
});

// Exportações nomeadas
export const getAllProducts = async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error; // Lance o erro para ver onde ele é capturado
    }
  };

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
