import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer';

function MainLayout() {
  return (
    <div className='app-container'>
      <Navbar />
      <main className='main-content'>
        {/* Contenido de React Router */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;