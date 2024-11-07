import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaTags, FaWarehouse, FaChartLine } from 'react-icons/fa'; // Importando ícones

const Menu = () => (
  <div className="menu bg-white p-3 shadow-sm rounded-md">
    <h3 className="text-md font-medium text-orange-500 mb-4">Menu</h3>
    <div className="space-y-2">
      <Link to="/products" className="block">
        <button className="w-full bg-transparent text-orange-500 py-2 px-3 rounded border border-orange-300 hover:bg-orange-50 transition-all flex items-center justify-start">
          <FaBox className="icon text-orange-500" />
          <span>Produtos</span>
        </button>
      </Link>
      <Link to="/categories" className="block">
  <button className="w-full bg-transparent text-orange-500 py-2 px-3 rounded border border-orange-300 hover:bg-orange-50 transition-all flex items-center justify-start">
    <FaTags className="icon text-orange-500" />
    <span>Categorias</span>
  </button>
    </Link>
    <Link to="/stock"className="block" >
    <button className="w-full bg-transparent text-orange-500 py-2 px-3 rounded border border-orange-300 hover:bg-orange-50 transition-all flex items-center justify-start">
            <FaWarehouse className="icon text-orange-500" />
            <span>Estoque</span>
          </button>
    </Link>

      <Link to="/sales-chart-page" className="block">
        <button className="w-full bg-transparent text-orange-500 py-2 px-3 rounded border border-orange-300 hover:bg-orange-50 transition-all flex items-center justify-start">
          <FaChartLine className="icon text-orange-500" />
          <span>Vendas</span>
        </button>
      </Link>
    </div>
  </div>
);

export default Menu;
