import { Link } from 'react-router-dom'; 
import { UserIcon } from '../common/Icons';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';


function DesktopMenu() {
  const { user, isAuthenticated } = useAuth();
  const [categoryMenu, setCategoryMenu] = useState(false);
  const menuRef = useRef(null);

  const handleMenu = () => {
    setCategoryMenu(!categoryMenu)
  }



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setCategoryMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

  }, []);

  return(
    <>
      <div className='desktop-menu'>
        <div className='dropdown category' ref={menuRef}>
          <button className='dropdown-trigger' onClick={handleMenu}>Categorías</button>
          {categoryMenu && (
          <div className='category-links'>
            <Link to='/categories/guitars' onClick={handleMenu}>Guitarras</Link>
            <Link to='/categories/amplifiers' onClick={handleMenu}>Amplificadores</Link>
            <Link to='/categories/accesories' onClick={handleMenu}>Accesorios</Link>
          </div>
          )}


        </div>
        
        {isAuthenticated? (
          <div className='logged-links user-links'>
            <Link to='/profile'>{isAuthenticated && ( <p>{user.name || user.email.split('@')[0]}</p> )}</Link>
            <Link to='/logout'>Cerrar sesión</Link>
          </div>
        ) : (
          <div className='unlogged-links user-links'>
            <Link to='/login'>Iniciar Sesion</Link>
            <Link to="/register">Regístrate</Link>
          </div>
        )
        }

      </div>
      
    </>
    
  )
}

export default DesktopMenu;