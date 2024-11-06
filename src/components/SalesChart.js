import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
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

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [products, setProducts] = useState([]);

  // Buscar produtos e vendas do banco de dados
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/produto/');
        setProducts(response.data);
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
        label: 'Vendas por Produto',
        data: products.map(product => product.quantidadeVendas || 0),
        backgroundColor: 'linear-gradient(180deg, rgba(255, 165, 0, 0.8) 0%, rgba(255, 140, 0, 0.5) 100%)',
        borderColor: 'rgba(255, 140, 0, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 140, 0, 0.9)',
        borderRadius: 10,
      },      
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: '600',
          },
          color: '#333',
          padding: 15, // Adicionado para espaçamento entre as legendas
        },
      },
      title: {
        display: true,
        text: 'Análise de Vendas dos Produtos',
        font: {
          size: 22,
          weight: 'bold',
        },
        color: '#FF8C00',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: '#FFF3E0',
        titleColor: '#FF8C00',
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyColor: '#FF8C00',
        bodyFont: {
          size: 12,
        },
        borderColor: '#FF8C00',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#555',
          font: {
            size: 12,
          },
        },
      },
    },
  };
  

  return (
    <div className="chart-container bg-white p-6 shadow-xl rounded-lg transition-shadow hover:shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-orange-600">Top Produtos</h3>
        <Link to="/sales-form">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors shadow-md">
            Registrar Venda
          </button>
        </Link>
      </div>
      <div className="relative" style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
