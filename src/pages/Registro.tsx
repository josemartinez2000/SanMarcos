import FormularioRegistro from '../organism/FormularioRegistro';

export default function Registro() {
  return (
    <div style={{ 
      backgroundImage: "url('/img/perrocrear.jpg')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <div className="container">
        <FormularioRegistro />
      </div>
    </div>
  );
}