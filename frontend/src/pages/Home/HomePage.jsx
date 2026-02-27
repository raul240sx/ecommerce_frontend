import { Link } from 'react-router-dom';




function HomePage() {
  return (
    <>
      <h1>Bienvenido a Guitar Zone</h1>
      <div>
        <div><Link to='/login'>Inicia sesión</Link></div>
        <div><Link to='/register'>Registrarse</Link></div>
      </div>
    </>
  );
};

export default HomePage;
