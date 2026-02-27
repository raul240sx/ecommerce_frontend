import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_navbar.png'
import './Navbar.css';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import MobileMenuMultilevel from './MobileMenuMultilevel';
import { CartIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';


function Navbar() {
  const { user, isAuthenticated, loading } = useAuth(); 

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);

  if (loading) return null;
  


  return (
    <>
    <nav className='navbar'>
        <div className='navbar-content'>
          <div className='nav-left-part'>
            <Link to='/'><img className='logo-img' src={logo} /><p className='logo-first-part'>GUITAR</p><p className='logo-second-part'>ZONE</p></Link>
          </div>
          <div className='nav-right-part'>
            {isMobile? (<MobileMenu toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />) : 
              (<DesktopMenu/>)
              }
            
            
            <div className='cart-container'>
              <CartIcon/>
            </div>
            
          </div>
        </div>        
      </nav>
      <div className='sidebar-menu'>
        <MobileMenuMultilevel isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)}/>
      </div>
    </>    
  )

}

export default Navbar;