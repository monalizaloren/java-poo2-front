import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'; // Substitua pelo caminho correto da logo
import mainImage from './assets/imagens.png'; // Substitua pelo caminho correto da imagem da esquerda
import { FaEnvelope, FaLock, FaUser, FaStore } from 'react-icons/fa'; // Adicione os ícones
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro (a ser implementada)
    console.log('Email:', email, 'Password:', password, 'Full Name:', fullName, 'Store Name:', storeName);
  };

  return (
    <div className="login-container flex min-h-screen items-center justify-center bg-gray-100">
      <div className="login-content flex max-w-4xl shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Imagem à esquerda */}
        <div className="login-image hidden md:flex w-1/2">
          <img src={mainImage} alt="Fashion display" className="w-full h-full object-cover rounded-l-lg" />
        </div>

        {/* Formulário de cadastro */}
        <div className="login-form w-full md:w-1/2 p-8 flex flex-col items-center">
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-48" />
          <form onSubmit={handleRegister} className="w-full space-y-4">
            <div className="input-group relative border-b border-orange-500 focus-within:border-b-2">
              <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <input
                type="email"
                placeholder="Email"
                className="w-full py-2 pl-10 pr-3 bg-transparent focus:outline-none placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group relative border-b border-orange-500 focus-within:border-b-2">
              <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <input
                type="text"
                placeholder="Nome Pessoal"
                className="w-full py-2 pl-10 pr-3 bg-transparent focus:outline-none placeholder-gray-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="input-group relative border-b border-orange-500 focus-within:border-b-2">
              <FaStore className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <input
                type="text"
                placeholder="Nome da Loja"
                className="w-full py-2 pl-10 pr-3 bg-transparent focus:outline-none placeholder-gray-500"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>
            <div className="input-group relative border-b border-orange-500 focus-within:border-b-2">
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                className="w-full py-2 pl-10 pr-10 bg-transparent focus:outline-none placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="cursor-pointer text-orange-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all"
            >
              Cadastrar
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Já possui uma conta? <Link to="/login" className="text-orange-500 font-semibold">Entre aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;