import { useNavigate } from "react-router-dom";

export default function BotonVolver() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-secondary px-4"
    >
      Volver
    </button>
  );
}