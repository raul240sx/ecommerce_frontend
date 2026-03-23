import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; 

import { handleScrollToTop } from '../../utils/ScrollUtils';

import { BackArrowIcon } from '../common/Icons';


function MobileMenuMultilevel({ isOpen, closeMenu }) {
  const { user, isAuthenticated, logOut } = useAuth();
  const [ levelMenu, setLevelMenu ] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setLevelMenu(0);
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
                <Link to='/my-account' onClick={closeMenu}>Mi perfil</Link>
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
          

        </nav>

      </div>
    </div>
  );
}

export default MobileMenuMultilevel;