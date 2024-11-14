import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
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
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-search-container bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="search-bar flex justify-between items-center border-b pb-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar produto"
          className="search-input flex-1 border-none focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button text-orange-500 ml-2">
          🔍
        </button>
      </div>
      <div className="product-list space-y-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.idProduct}
              className="product-item flex justify-between items-center p-2 border border-orange-500 rounded-lg hover:bg-orange-50"
            >
              <span className="product-name">{product.nome}</span>
              <Link to={`/product-details/${product.idProduct}`} className="text-orange-500">
                Ver detalhes
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
        )}
      </div>
      <button
        onClick={() => navigate('/add-product')}
        className="add-product-button bg-orange-500 text-white mt-4 py-3 w-full rounded-lg hover:bg-orange-600 transition-all"
      >
        + Adicionar novo produto
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
      >
        Voltar
      </button>
    </div>
    
  );
};

export default ProductSearch;
