import { Link, useNavigate } from 'react-router-dom'; 
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';


function DesktopMenu() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logOut} = useAuth();
  const [categoryMenu, setCategoryMenu] = useState(false);
  const menuRef = useRef(null);

  const handleMenu = () => {
    setCategoryMenu(!categoryMenu)
  }

  const handleLogOut = async() => {
    logOut();
    navigate('/')
  };


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
            <Link to={`/products/categories/${1}`} onClick={handleMenu}>Guitarras</Link>
            <Link to={`/products/categories/${2}`} onClick={handleMenu}>Amplificadores</Link>
            <Link to={`/products/categories/${3}`} onClick={handleMenu}>Accesorios</Link>
          </div>
          )}


        </div>
        
        {isAuthenticated? (
          <div className='logged-links user-links'>
            <Link to='/my-account'>{isAuthenticated && ( <p>{user?.first_name || user?.email.split('@')[0]}</p> )}</Link>
            <button className='logout-button' onClick={handleLogOut}>Cerrar Sesion</button>
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