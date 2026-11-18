interface BotonProps {
  texto: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Boton({ texto, onClick }: BotonProps) {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        borderWidth: 0, 
        backgroundColor: 'rgb(24, 80, 43)', 
        color: 'white', 
        borderRadius: '5px', 
        padding: '8px 20px',
        cursor: 'pointer'
      }}
    >
      {texto}
    </button>
  );
}