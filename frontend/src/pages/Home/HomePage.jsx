import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar.jsx'



function HomePage() {

  return(
    <div>
      <Navbar/>
      <h1>Bienvenido a Guitar Zone</h1>
      
      <div>
        <div><Link to="/login">Inicia sesión</Link></div>
        <div><Link to="/register">Registrarse</Link></div>
      </div>
    </div>
      
  )

};

export default HomePage;
