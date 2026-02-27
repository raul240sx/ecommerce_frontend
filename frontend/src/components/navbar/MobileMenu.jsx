import { MenuIcon } from '../common/Icons';

function MobileMenu({ toggleMenu }) {

  
  return(
    <button
      className='burger-btn'
      onClick={toggleMenu}>
        <MenuIcon/>
    </button>
  )
}

export default MobileMenu;