import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx'

import RegisterPage from './pages/register/RegisterPage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import VerifyEmailPage from './pages/register/VerifyEmailPage.jsx';
import PasswordRecoveryPage from './pages/login/PasswordRecoveryPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import LegalPage from './pages/about/LegalPage.jsx';
import ProductDetailPage from './pages/products/ProductDetailPage.jsx';
import CartPage from './pages/cart/CartPage.jsx';
import CheckoutPage from './pages/cart/CheckoutPage.jsx';
import PaymentSuccessPage from './pages/payment/PaymentSuccessPage.jsx';
import PaymentFailurePage from './pages/payment/PaymentFailurePage.jsx';
import PaymentPendingPage from './pages/payment/PaymentPendingPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import CategoryProducts from './pages/products/CategoryProduct.jsx';
import UserPageLayout from './components/layouts/UserPageLayout.jsx';
import UserAddressesPage from './pages/user/UserAddressesPage.jsx';
import UserMyAccountPage from './pages/user/UserMyAccountPage.jsx';
import UserOrdersPage from './pages/user/UserOrdersPage.jsx';
import UserUpdateInfoPage from './pages/user/UserUpdateInfoPage.jsx';
import OrderDetailPage from './pages/orders/OrderDetailPage.jsx';


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
          <Route path='/product/:id' element={<ProductDetailPage/>} />
          <Route path='/products/categories/:categoryId' element={<CategoryProducts/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/success' element={<PaymentSuccessPage/>} />
          <Route path='/failure' element={<PaymentFailurePage/>} />
          <Route path='/pending' element={<PaymentPendingPage/>} />
          
          
          <Route element={<ProtectedRoute/>}>
            <Route path='/checkout/:orderId' element={<CheckoutPage/>} />
            <Route path='/order-detail/:orderId' element={<OrderDetailPage/>} />

            <Route element={<UserPageLayout/>}>
              <Route path='/my-account' element={<UserMyAccountPage/>} />
              <Route path='/my-account/my-orders' element={<UserOrdersPage/>} />
              <Route path='/my-account/my-addresses' element={<UserAddressesPage/>} />
              <Route path='/my-account/update-info' element={<UserUpdateInfoPage/>} />
            </Route>
          </Route>

          

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