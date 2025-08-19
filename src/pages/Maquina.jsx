import { useParams, Link } from "react-router-dom";

const detalles = {
  1: { nombre: "Bicicleta Fija", ejercicios: ["Calentamiento", "Cardio moderado", "HIIT"] },
  2: { nombre: "Cinta de correr", ejercicios: ["Trote", "Sprints", "Caminata inclinada"] },
  3: { nombre: "Press de Banca", ejercicios: ["Press plano", "Press inclinado", "Press cerrado"] }
};

export default function Maquina() {
  const { id } = useParams();
  const maquina = detalles[id];

  if (!maquina) return <p>Máquina no encontrada</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{maquina.nombre}</h1>
      <ul className="list-disc ml-6">
        {maquina.ejercicios.map((ej, idx) => (
          <li key={idx}>{ej}</li>
        ))}
      </ul>
      <Link to="/" className="text-blue-500 mt-4 block">← Volver</Link>
    </div>
  )
}
