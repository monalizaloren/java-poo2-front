import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8082/produto/');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-orange-600 mb-4">Categorias</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">#</th>
            <th className="border-b py-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.idProduct} className="hover:bg-orange-50">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{category.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
