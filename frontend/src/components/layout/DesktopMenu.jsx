import { UserIcon } from '../common/Icons';
import { useState } from 'react';


function DesktopMenu() {
  const [categoryMenu, setCategoryMenu] = useState(false)
  
  
  return(
    <div className='desktop-menu'>
      <button className='category-button' onClick={() => setLevelMenu(1)}>Categorías</button>
      {isAuthenticated? (
        <>
        <button className='profile'>
          {isAuthenticated? ( <p>{user.name || user.email.split('@')[0]}</p> ) : <UserIcon className='user-icon'/>}
        </button>
          <Link to='/profile' onClick={closeMenu}>{isAuthenticated && ( <p>{user.name || user.email.split('@')[0]}</p> )}</Link>
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
    
  )
}

export default DesktopMenu;