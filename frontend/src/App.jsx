import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx'

import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import VerifyEmailPage from './pages/Register/VerifyEmailPage';
import PasswordRecoveryPage from './pages/Login/PasswordRecoveryPage';
import AboutPage from './pages/about/AboutPage.jsx';
import LegalPage from './pages/about/LegalPage.jsx';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Paginas con Navbar y Footer */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/legal' element={<LegalPage />} />
          {/* ... otras rutas que quieras que tengan Navbar y Footer */}
        </Route>

        {/* Páginas sin Navbar ni Footer */}
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/password-recovery' element={<PasswordRecoveryPage />} />
        <Route path='/email-verification' element={<VerifyEmailPage />} />

        
        <Route path='*' element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}


export default App;