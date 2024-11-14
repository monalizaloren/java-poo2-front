import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Stock = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Função para buscar os dados de estoque do backend
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          'https://b605-2804-29b8-50b8-614-794c-9cd6-39ea-a332.ngrok-free.app/produto/',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true', 
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar estoque:', error);
      }
    };
    fetchStock();
  }, []);

  return (
    <div className="stock-container p-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Estoque de Produtos</h2>
      {products.length > 0 ? (
        <div className="product-list space-y-4">
          {products.map((product) => (
            <div key={product.idProduct} className="product-item p-4 border rounded-lg flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.nome}</h3>
                <p className="text-gray-500">{product.descricao}</p>
              </div>
              <div className="stock-quantity">
                <span className="text-orange-500 font-bold">{product.quantidadeEstoque}</span> unidades
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum produto em estoque.</p>
      )}
      <button
        onClick={() => navigate(-1)}  // Botão de voltar para a rota anterior
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
      >
        Voltar
      </button>
    </div>
  );
};

export default Stock;
