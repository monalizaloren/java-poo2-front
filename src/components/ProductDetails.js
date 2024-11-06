import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/produto/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8082/produto/${id}`, product);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/produto/${id}`);
      navigate('/products');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="product-details-container">
      <h2>Detalhes do produto</h2>
      {isEditing ? (
        <div>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={product.nome || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="preco"
              value={product.preco || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descrição:
            <textarea
              name="descricao"
              value={product.descricao || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Unidade de Medida:
            <input
              type="text"
              name="unidadeMedida"
              value={product.unidadeMedida || ''}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Custo:
            <input
              type="number"
              name="custo"
              value={product.custo || ''}
              onChange={handleInputChange}
            />
          </label>
          {/* Novo campo para editar a quantidade em estoque */}
          <label>
            Quantidade em Estoque:
            <input
              type="number"
              name="quantidadeEstoque"
              value={product.quantidadeEstoque || ''}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleSave} className="save-button bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
            Salvar
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Nome:</strong> {product.nome}</p>
          <p><strong>Preço:</strong> R${product.preco != null ? product.preco.toFixed(2) : 'N/A'}</p>
          <p><strong>Descrição:</strong> {product.descricao}</p>
          <p><strong>Unidade de Medida:</strong> {product.unidadeMedida}</p>
          <p><strong>Custo:</strong> R${product.custo != null ? product.custo.toFixed(2) : 'N/A'}</p>
          {/* Mostrar a quantidade em estoque */}
          <p><strong>Quantidade em Estoque:</strong> {product.quantidadeEstoque != null ? product.quantidadeEstoque : 'N/A'}</p>
        </div>
      )}
      <button className="edit-button bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancelar' : 'Alterar detalhes'}
      </button>
      <button className="delete-button bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleDelete}>
        Remover produto
      </button>
      <button className="back-button bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};

export default ProductDetails;
