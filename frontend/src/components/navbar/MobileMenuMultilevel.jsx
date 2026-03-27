import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

import { handleScrollToTop } from '../../utils/ScrollUtils';

import { BackArrowIcon } from '../common/Icons';


function MobileMenuMultilevel({ isOpen, closeMenu }) {
  const { user, isAuthenticated, logOut } = useAuth();
  const [ levelMenu, setLevelMenu ] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      if (location.pathname.startsWith('/my-account')) {
      setLevelMenu(2)
      }
      else {
        setLevelMenu(0);
      }

    }
    
  }, [isOpen]);

  const handleLogOut = async() => {
    await logOut();
    navigate('/')
  };


  return (
    <div className={`sidebar-container ${isOpen? 'active' : ''}`}>
      <div className='sidebar-overlay' onClick={closeMenu}></div>


      <div className='sidebar-drawer'>
        <nav className='mobile-nav-links'>
          { (levelMenu === 0 ) && (
            <div className='first-menu submenu'>
              {isAuthenticated && ( <h3>{user.name || user.email.split('@')[0]}</h3> )}
              <Link to='/' onClick={ () => {
                closeMenu();
                handleScrollToTop(true);
                }}>Inicio</Link>
              <button className='nav-button' onClick={() => setLevelMenu(1)}>Categorías</button>
              
     
              {isAuthenticated? (
                <>
                <button className='nav-button' onClick={() => {setLevelMenu(2)}}>Mi perfil</button>
                <button className='nav-button' onClick={handleLogOut}>Cerrar Sesion</button>
                </>
              ) : (
                <>
                  <Link to='/login' onClick={closeMenu}>Iniciar Sesion</Link>
                  <Link to="/register" onClick={closeMenu}>Regístrate</Link>
                  <Link to='/password-recovery' onClick={closeMenu}>Recuperar contraseña</Link>
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
              
              <Link to={`/products/categories/${1}`} onClick={closeMenu}>Guitarras</Link>
              <Link to={`/products/categories/${2}`} onClick={closeMenu}>Amplificadores</Link>
              <Link to={`/products/categories/${3}`} onClick={closeMenu}>Accesorios</Link>
            </div>
          ) }

          { (levelMenu === 2) && (
            <div className='third-menu submenu'>
              <button onClick={() => setLevelMenu(0)} className='return-button'>
                <BackArrowIcon/>
              </button>

              <Link to={'/my-account'} onClick={closeMenu} >Información</Link>
              <Link to={'/my-account/my-orders'} onClick={closeMenu} >Mis Ordenes</Link>
              <Link to={'/my-account/my-addresses'} onClick={closeMenu} >Mis Direcciones</Link>
              <Link to={'/my-account/update-info'} onClick={closeMenu} >Actualizar información</Link>
              <Link to={'/my-account/configurations'} onClick={closeMenu} >Configuraciones</Link>

            </div>

          ) }
          

        </nav>

      </div>
    </div>
  );
}

export default MobileMenuMultilevel;