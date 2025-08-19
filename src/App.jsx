import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Maquina from "./pages/Maquina";

export default function App() {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">🏋 Gimnasio Municipal</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maquina/:id" element={<Maquina />} />
      </Routes>
    </div>
  )
}
