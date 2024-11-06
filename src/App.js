import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import SalesChart from './components/SalesChart';
import SalesChartPage from './components/SalesChartPage';
import SalesForm from './components/SalesForm';
import TopProducts from './components/TopProducts';
import LowStock from './components/LowStock';
import ProductSearch from './components/ProductSearch';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import Categories from './components/Categories';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'; // Adicione esta importação
import './App.css';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './services/api';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);
  
  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      return addedProduct.idProduct;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };
  
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.idProduct, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.idProduct === updatedProduct.idProduct ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <Router>
      <div className="dashboard bg-white">
        <ConditionalHeader />
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-container flex flex-col md:flex-row gap-4 p-4">
                <Menu />
                <div className="content flex-1 bg-white p-4 shadow-lg rounded-lg">
                  <SalesChart />
                  <div className="stats grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="stats-item w-full">
                      <TopProducts />
                    </div>
                    <div className="stats-item w-full">
                      <LowStock />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/products" element={<ProductSearch products={products} />} />
          <Route path="/add-product" element={<AddProduct onAddProduct={handleAddProduct} />} />
          <Route path="/product-details/:id" element={<ProductDetails products={products} onUpdateProduct={handleUpdateProduct} />} />
          <Route path="/sales-form" element={<SalesForm />} />
          <Route path="/sales-chart" element={<SalesChart />} />
          <Route path="/sales-chart-page" element={<SalesChartPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Adicione esta linha para a rota de cadastro */}
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  
  return (location.pathname !== '/login' && location.pathname !== '/register') ? <Header /> : null;
}

export default App;
