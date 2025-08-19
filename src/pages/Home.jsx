import { Link } from "react-router-dom";

const maquinas = [
  { id: 1, nombre: "Bicicleta Fija", descripcion: "Ejercicio cardiovascular", qr: "/qr/bici.png" },
  { id: 2, nombre: "Cinta de correr", descripcion: "Cardio y resistencia", qr: "/qr/cinta.png" },
  { id: 3, nombre: "Press de Banca", descripcion: "Pecho y tríceps", qr: "/qr/press.png" }
];

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Máquinas disponibles</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {maquinas.map(m => (
          <div key={m.id} className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold">{m.nombre}</h2>
            <p className="text-sm text-gray-600">{m.descripcion}</p>
            <Link
              to={`/maquina/${m.id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              Ver más →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
