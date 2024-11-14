import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const AddProduct = () => {
  const [product, setProduct] = useState({
    nome: '',
    descricao: '',
    preco: '',
    custo: '',
    unidadeMedida: '',
    quantidadeEstoque: ''
  });
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar o popup de sucesso
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://b605-2804-29b8-50b8-614-794c-9cd6-39ea-a332.ngrok-free.app/produto/',
        product,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true', // Cabeçalho para pular o aviso do Ngrok
          },
        }
      );
      setShowPopup(true); // Exibe o popup de sucesso
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Verifique os dados e tente novamente.');
    }
  };
  

  return (
    <div className="add-product-form-container relative">
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="flex items-center justify-center mb-3">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">Produto Adicionado com Sucesso!</h3>
            <p className="text-gray-600 text-center mt-1">O produto foi registrado e adicionado com sucesso ao sistema.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all shadow-md w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <div className="add-product-form">
        <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-icon">🖊️</span>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={product.nome}
              onChange={handleChange}
              maxLength={255}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-icon">📄</span>
            <input
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={product.descricao}
              onChange={handleChange}
              maxLength={255}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-icon">💲</span>
            <input
              type="number"
              name="preco"
              placeholder="Preço"
              value={product.preco}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-icon">💰</span>
            <input
              type="number"
              name="custo"
              placeholder="Custo"
              value={product.custo}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-icon">📏</span>
            <input
              type="text"
              name="unidadeMedida"
              placeholder="Unidade de Medida"
              value={product.unidadeMedida}
              onChange={handleChange}
              maxLength={255}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="input-group mb-4">
            <span className="input-icon">📦</span>
            <input
              type="number"
              name="quantidadeEstoque"
              placeholder="Quantidade em Estoque"
              value={product.quantidadeEstoque}
              onChange={handleChange}
              min="0"
              className="border p-2 rounded w-full"
            />
          </div>
          <button type="submit" className="add-button bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all w-full">
            Adicionar produto +
          </button>
        </form>
        <button
          className="back-button bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all mt-4 w-full"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
