import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://44f0-2804-29b8-50b8-614-794c-9cd6-39ea-a332.ngrok-free.app/produto/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true', 
            },
          }
        );
        console.log('Dados recebidos:', response.data); // Verifique os dados no console
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setError('Erro ao carregar categorias. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  
  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="categories-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-orange-600 mb-4">Categorias</h2>
      {categories.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 text-left">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.idProduct} className="hover:bg-orange-50">
                <td className="py-2">{category.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Nenhuma categoria encontrada.</p>
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
      >
        Voltar
      </button>
    </div>
  );
};

export default Categories;
