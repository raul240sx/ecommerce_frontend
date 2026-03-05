import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import notFoundImg from '../../assets/product_not_found.jpg'
import { useCart } from '../../context/CartContext';
import { PlusSquareIcon, MinusSquareIcon } from '../../components/common/Icons';
import './ProductDetailPage.css'



const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function ProductDetailPage () {
  const { cart, addToCart, clearCart } = useCart();
  const { id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ product, setProduct ] = useState(null);
  const [ image, setImage ] = useState(notFoundImg);
  const [ price, setPrice ] = useState(0);
  const [ quantity, setQuantity ] = useState(1);
  const [ stockError, setStockError ] = useState(false)
  const [ outOfStock, setOutOfStock ] = useState(false)
  const [ itemQuantityCart, setItemQuantityCart ] = useState(0)

  useEffect(() => {
    const itemInCart = cart.find(item => item.product_id === product?.id)
    setItemQuantityCart(itemInCart?.quantity)
  }, [cart, product])



  useEffect(() => {
    
    const getItem = async () => {
      try {
        const response = await api.get(`products-api/products/${id}`);
        setProduct(response.data);
        setImage(response.data.image);
        setLoading(false);
        setPrice(formatter.format(response.data.price));
        console.log(response.data);

      } catch (error) {
        if (error.response) {
          console.log('Error del backend: ', error.response);
          console.log('Codigo del error: ', error.response.status);
        }
        else {
          console.log('Error de conexion con el backend', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getItem();

  }, [id])

  const addQuantity = () => {

    setQuantity(prev => {
      const newQuantity = prev < product.stock ? prev + 1 : product.stock
      return newQuantity
    })
  }

  const substractQuantity = () => {
    setQuantity(prev => {
      const newQuantity = prev > 1 ? prev - 1 : 1
      return newQuantity
    })
  }
  

  const handleItemToCart = () =>{
    const itemToCart = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: image,
      stock: product.stock,
      quantity: quantity
    };

    addToCart(itemToCart);
    setQuantity(1)

  }
  
  useEffect(() => {    
    if (((itemQuantityCart + quantity) > product?.stock)) {
      setStockError(true)
    }
    else if (product?.stock <= 0) {
      setOutOfStock(true)
    }
    else {
      setStockError(false)
    }

  },[product, quantity])



  
  return(
    loading? (
      <div>
        <p>cargando producto</p>
      </div>
    ) : (
      <div className='product-detail-container'>
        <div className='detail-content'>
          <div className='detail-left-part'>
            <img className='detail-image' src={image} alt={product.name} />
          </div>

          <div className='detail-right-part'>
            <div className='product-info' >
              <h2>{product.name}</h2>
              <div className='product-description'>
                <h3>Descripción del producto</h3>
                  <p>{product.description}</p>
              </div>
              <div className='price-stock'>
                <h2>{price}</h2>
                <p className='stock-info'>Stock: {product.stock}</p>
              </div>
            </div>
            <div className='buy-buttons'>
              <button className='detail-button' onClick={handleItemToCart} disabled={stockError || outOfStock} >Agregar al carro</button>
              <div className='quantity-section'>
                <p>Cantidad</p>
                <button className='quantity-button' onClick={substractQuantity}><MinusSquareIcon className='quantity-icon'/></button>
                <p>{quantity}</p>
                <button className='quantity-button' onClick={addQuantity}><PlusSquareIcon className='quantity-icon'/></button>
              </div>
            </div>
            <div className='detail-errors'>
              { stockError && <p>No es posible agregar una cantidad mayor al stock disponible, en tu carro ya tienes una cantidad de {itemQuantityCart}.</p> }
              { outOfStock && <p>Producto sin stock</p> }
            </div>
          </div>
        </div>
      </div>
    )

  )

};

export default ProductDetailPage;