import FormularioLogin from '../organism/FormularioLogin';

export default function Login() {
  return (
    <div style={{ 
      backgroundImage: "url('/img/perrologin.jpg')", 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <div className="container">
        <FormularioLogin />
      </div>
    </div>
  );
}