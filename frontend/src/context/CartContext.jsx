import { createContext, useContext, useState, useEffect} from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [ cart, setCart ] = useState( () => {
    try {
      const savedCart = localStorage.getItem('cart');
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart)? parsedCart : []
    } catch (error) {
      return []
    }
  })

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      let findItem = false;

      const updatedCart = prevCart.map((item) => {
        if (item.product_id === newItem.product_id) {

          findItem = true;
          return {
            ...item,
            quantity: newItem.quantity > 0? Math.min(item.quantity + newItem.quantity, item.stock) : item.quantity
          }
        }
        else {
          return item;
        }
      });

      if (findItem) {
        return updatedCart;
      }
      return [...prevCart, newItem];

    });
  };

  const removeFromCart = (idToRemove) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.product_id !== idToRemove)
      return updatedCart
    });
  };


  const updateQuantity = (idToUpdate, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.product_id === idToUpdate) {
          const validatedQuantity = Math.min(Math.max(1, newQuantity), item.stock)
          
          return {...item, quantity: validatedQuantity};
        }
        return item;
      })
      return updatedCart;
    });
  };


  const clearCart = () => {
    setCart([]);
  }
    


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  )

};

export const useCart = () => useContext(CartContext)