interface BotonProps {
  texto: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function Boton({ texto, onClick, disabled = false }: BotonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        borderWidth: 0,
        backgroundColor: 'rgb(24, 80, 43)',
        color: 'white',
        borderRadius: '5px',
        padding: '8px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {texto}
    </button>
  );
}
