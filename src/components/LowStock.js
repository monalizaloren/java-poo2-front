import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LowStock = () => {
  const [productCounts, setProductCounts] = useState([]);

  useEffect(() => {
    const fetchProductCounts = async () => {
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
        setProductCounts(response.data); // Removido o filtro para exibir todos os produtos
      } catch (error) {
        console.error('Erro ao buscar contagem de produtos:', error);
      }
    };

    fetchProductCounts();
  }, []);

  return (
    <div className="low-stock p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center text-orange-600">Estoque de Produtos</h3>
      <div className="stock-list space-y-2">
        {productCounts.length > 0 ? (
          productCounts.map((product) => (
            <div
              key={product.idProduct}
              className="stock-item flex justify-between items-center p-2 border-b border-gray-300 hover:bg-orange-50 rounded"
            >
              <span className="text-gray-800 font-medium">{product.nome}</span>
              <span className="text-orange-500 font-bold">{product.quantidadeEstoque}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default LowStock;
