// src/App.jsx - MODIFICADO

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Maquina from "./pages/Maquina";
// Nuevas importaciones
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <div>
      {/* Hacemos la barra de navegación un poco más completa */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">🏋️ Gimnasio Municipal</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="bg-white text-blue-600 font-semibold py-2 px-3 rounded hover:bg-gray-200">
            Registrarse
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maquina/:id" element={<Maquina />} />
          {/* Nuevas rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
