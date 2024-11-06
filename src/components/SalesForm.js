import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const SalesForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar a exibição do popup
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8082/produto/');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert('Selecione um produto para registrar a venda.');
      return;
    }

    try {
      await axios.post(`http://localhost:8082/produto/venda/${selectedProduct}`, null, {
        params: {
          quantidade: quantity,
        },
      });

      // Exibe o popup de sucesso
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Oculta o popup após 3 segundos

      setSelectedProduct('');
      setQuantity(1);
      fetchProducts();
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      alert('Erro ao registrar venda. Tente novamente.');
    }
  };

  return (
    <div className="sales-form-container p-4 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl transform transition-transform duration-300 scale-100">
            <div className="flex items-center justify-center mb-2">
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Venda registrada com sucesso!</h3>
            <p className="mt-2 text-gray-600">A venda foi processada e registrada com sucesso.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all shadow-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-blue-600">Registrar Venda</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all shadow"
        >
          Voltar
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 border-t border-gray-300 pt-4">
        <div className="flex-1 pr-4 border-r border-gray-300">
          <form onSubmit={handleSaleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-gray-700 font-medium">Selecione o Produto:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">-- Selecione um Produto --</option>
                {products.map((product) => (
                  <option key={product.idProduct} value={product.idProduct}>
                    {product.nome} (Estoque: {product.quantidadeEstoque})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="block text-gray-700 font-medium">Quantidade:</label>
              <input
                type="number"
                min="1"
                max={products.find(p => p.idProduct === selectedProduct)?.quantidadeEstoque || 1}
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors shadow">
              Registrar Venda
            </button>
          </form>
        </div>
        <div className="flex-1 pl-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">Resumo de Vendas</h2>
          <ul className="space-y-2 mt-2">
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.idProduct} className="border-b border-gray-200 pb-2 flex justify-between">
                  <span className="text-gray-800 font-medium">{product.nome}</span>
                  <span className="text-green-500 font-bold">Vendas: {product.quantidadeVendas || 0}</span>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">Nenhum produto disponível.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
