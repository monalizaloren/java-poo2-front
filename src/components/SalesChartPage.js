import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChartPage = () => {
  const [products, setProducts] = useState([]);

  // Buscar produtos e vendas do banco de dados
  useEffect(() => {
    const fetchSalesData = async () => {
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
        // Ordenar os produtos por quantidade de vendas em ordem decrescente
        const sortedProducts = response.data.sort((a, b) => (b.quantidadeVendas || 0) - (a.quantidadeVendas || 0));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Erro ao buscar dados de vendas:', error);
      }
    };

    fetchSalesData();
  }, []);

  // Preparar dados para o gráfico
  const data = {
    labels: products.map(product => product.nome),
    datasets: [
      {
        label: 'Quantidade de Vendas',
        data: products.map(product => product.quantidadeVendas || 0),
        backgroundColor: products.map((_, index) => `rgba(${255 - index * 20}, 165, 0, 0.2)`), // Laranja com transparência
        borderColor: products.map((_, index) => `rgba(${255 - index * 20}, 165, 0, 1)`), // Laranja sólido
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container bg-white p-4 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-orange-600">Top Produtos</h3>
        <Link to="/sales-form">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            Registrar Venda
          </button>
        </Link>
      </div>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border-b py-2 text-left">#</th>
            <th className="border-b py-2 text-left">Nome</th>
            <th className="border-b py-2 text-left">Vendas</th>
            <th className="border-b py-2 text-left">Popularidade</th>
          </tr>
        </thead>
        <tbody>
  {products.map((product, index) => (
    <tr key={product.idProduct} className="hover:bg-orange-100 transition-all">
      <td className="py-2 px-2 text-center font-semibold text-gray-600">{index + 1}</td>
      <td className="py-2 px-2 text-left font-medium text-gray-700">{product.nome}</td>
      <td className="py-2 px-2 text-center text-gray-800">
        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
          {product.quantidadeVendas || 0}
        </span>
      </td>
      <td className="py-2 px-2">
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full shadow-md"
            style={{
              width: `${(product.quantidadeVendas / Math.max(...products.map(p => p.quantidadeVendas || 1))) * 100}%`,
              transition: 'width 0.4s ease',
            }}
          ></div>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChartPage;
