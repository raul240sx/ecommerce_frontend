import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartPageMobile from './CartPageMobile';
import CartPageDesktop from './CartPageDesktop';
import './CartPage.css'

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const lastItemId = cart.length -1

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  const handleBuyButton = async() => {
    if (!user) {
      navigate('/login');
      return
    }

    const payload = {order_items : cart.map(item => {
      return ({
        product_id: item.product_id,
        quantity: item.quantity
      })
    })}
    
    try{
      const response = await api.post('/orders-api/order-create/', payload);
      clearCart();
      navigate('/checkout');
      console.log('respuesta exitosa',response.data);
    }
    catch(error){
      if (error.response) {
        console.log('error del backend: ', error.response.data);
        console.log('codigo de error: ', error.response.status);
      }
      else{
        console.log('error de conexion', error.message);
      }

    }
  }


  return(
    <div className='shop-cart-container'>
      {cart.length > 0? (
        <div className='shop-cart-content'>
          <div className='cart-table'>
            {!isMobile && 
            <div className='table-titles'>
              <div className='img-column'></div>
              <div className='name-column'><p>Producto</p></div>
              <div className='controls-column'><p>Cantidad</p></div>
              <div className='unit-price-column'><p>Precio Unitario</p></div>
              <div className='subtotal-price-column'><p>Sub total</p></div>
              <div className='delete-item-column'></div>
              <hr />
            </div> }

            <div className='table-content'>
              {cart.map(((item, index) => (
                isMobile? <CartPageMobile key={item.product_id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} lastItemId={lastItemId} itemIndex={index}/> :
                <CartPageDesktop key={item.product_id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} lastItemId={lastItemId} itemIndex={index}/>
              )))}
            </div>
            

          </div>

          <div className='cart-options'>
            <div className='delete-cart-section'>
              <button className='delete-cart-button' onClick={clearCart}>Vaciar carro</button>
            </div>
            <div className='checkout-section'>
              <div className='total-amount'>TOTAL: {formatter.format(totalAmount)}</div>
              <button className='buy-button' onClick={handleBuyButton} disabled={user && !user?.is_verified}>Completar la compra</button>
              {user && !user?.is_verified && <p>Debes verificar tu cuenta primero, si necesitas otro link de verificación puedes obtenerlo en la sección "Verificar cuenta" de tu perfil</p> }
            </div>
          </div>
                     
        </div>
      ) : (
        <div className='shop-cart-content'>
          <p>Tu carro de compras está vacío</p>
          <button onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
        

      )}

    </div>
    
  )

};

export default CartPage;

