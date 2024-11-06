import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8082/produto/');
        const sortedProducts = response.data.sort((a, b) => (b.quantidadeVendas || 0) - (a.quantidadeVendas || 0));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchTopProducts();
  }, []);

  const maxVendas = Math.max(...products.map(p => p.quantidadeVendas || 0));

  return (
    <div className="top-products p-4 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center text-orange-600">Produtos Mais Vendidos</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">#</th>
            <th className="border-b py-2 text-left">Produto</th>
            <th className="border-b py-2 text-left">Vendas</th>
            <th className="border-b py-2 text-left">Popularidade</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.idProduct} className="hover:bg-orange-50">
              <td className="py-2 px-2 text-center font-semibold text-orange-600">{index + 1}</td>
              <td className="py-2 px-2 font-medium text-gray-700">{product.nome}</td>
              <td className="py-2 px-2 text-center font-bold text-orange-500">{product.quantidadeVendas || 0}</td>
              <td className="py-2 px-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-orange-500 h-4 rounded-full"
                    style={{
                      width: `${(product.quantidadeVendas / maxVendas) * 100}%`,
                      transition: 'width 0.4s ease',
                    }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
