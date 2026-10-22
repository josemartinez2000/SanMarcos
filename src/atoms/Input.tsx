interface InputProps {
  tipo: string;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ tipo, valor, onChange }: InputProps) {
  return (
    <input 
      type={tipo} 
      value={valor} 
      onChange={onChange} 
      style={{ width: '100%', marginBottom: '15px' }} 
    />
  );
}