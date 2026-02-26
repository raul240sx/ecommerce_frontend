import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom'; 
import { BackArrowIcon } from '../common/Icons';


function MobileMenuMultilevel({ isOpen, closeMenu }) {
  const { user, isAuthenticated } = useAuth();
  const [ levelMenu, setLevelMenu ] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setLevelMenu(0);
    }
  }, [isOpen]);


  return (
    <div className={`sidebar-container ${isOpen? 'active' : ''}`}>
      <div className='sidebar-overlay' onClick={closeMenu}></div>


      <div className='sidebar-drawer'>
        <nav className='mobile-nav-links'>
          { (levelMenu === 0 ) && (
            <div className='first-menu submenu'>
              {isAuthenticated && ( <h3>{user.name || user.email.split('@')[0]}</h3> )}
              <Link to='/' onClick={closeMenu}>Inicio</Link>
              <button className='category-button' onClick={() => setLevelMenu(1)}>Categorías</button>
              
     
              {isAuthenticated? (
                <>
                <Link to='/profile' onClick={closeMenu}>Mi perfil</Link>
                <Link to='/my-purchases' onClick={closeMenu}>Mis compras</Link>
                <Link to='/logout' onClick={closeMenu}>Cerrar sesión</Link>
                </>
              ) : (
                <>
                  <Link to='/login'>Iniciar Sesion</Link>
                  <Link to="/register">Regístrate</Link>
                  <Link to='/password-recovery'>Recuperar contraseña</Link>
                </>
              )
              }
            </div>
            
          ) }

          { (levelMenu === 1) && (
            <div className='second-menu submenu'>
              <button onClick={() => setLevelMenu(0)} className='return-button'>
                <BackArrowIcon/>
              </button>
              
              <Link to='/categories/guitars' onClick={closeMenu}>Guitarras</Link>
              <Link to='/categories/amplifiers' onClick={closeMenu}>Amplificadores</Link>
              <Link to='/categories/accesories' onClick={closeMenu}>Accesorios</Link>
            </div>
          ) }
          

        </nav>

      </div>
    </div>
  );
}

export default MobileMenuMultilevel;