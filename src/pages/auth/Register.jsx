// src/pages/auth/Register.jsx - ACTUALIZADO

import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // 1. Importamos axios

export default function Register() {
  // 2. Creamos estados para guardar los datos de los inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Esta función se ejecutará cuando se envíe el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      // 4. Hacemos la petición POST al backend
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      
      // Si todo sale bien, mostramos la respuesta del servidor en la consola
      console.log('Respuesta del servidor:', response.data);
      alert('¡Registro exitoso!'); // Mostramos una alerta al usuario

    } catch (error) {
      // Si hay un error, lo mostramos en la consola
      console.error('Error en el registro:', error);
      alert('Hubo un error en el registro.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Crear Cuenta</h1>
        {/* 5. Conectamos el formulario con la función handleSubmit */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            {/* 6. Conectamos cada input con su estado */}
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu Nombre"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}