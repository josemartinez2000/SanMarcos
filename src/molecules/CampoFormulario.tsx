import Input from '../atoms/Input';

interface CampoProps {
  label: string;
  tipo: string;
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CampoFormulario({ label, tipo, valor, onChange }: CampoProps) {
  return (
    <div>
      <label>{label}</label><br />
      <Input tipo={tipo} valor={valor} onChange={onChange} />
    </div>
  );
}