import { PlusSquareIcon, MinusSquareIcon, CircleXIcon } from '../../components/common/Icons';

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartPageMobile({ item, updateQuantity, removeFromCart, lastItemId, itemIndex}) {
  const finalItem = itemIndex === lastItemId;



  return(
    <div className='cart-item-row-mobile'>
      <div className='name-column-mobile'><p>{item.name}</p></div>
      <div className='product-summarize'>
        <div className='img-delete-button'>
          <img src={item.image} alt={item.name} className='img-mobile'/>
          <button onClick={() => removeFromCart(item.product_id)} id='remove-item-mobile'>Eliminar</button>
        </div>
        <div className='price-controls-mobile'>
          <div className='price-info'>
            <div className='unit-price-column'><p> Precio Unitario: {formatter.format(item.price)}</p></div>
            <div className='subtotal-price-column'><p> Subtotal: {formatter.format(item.price * item.quantity)}</p></div>
          </div>
          <div className='cart-controls-mobile'>
            <button onClick={() => updateQuantity(item.product_id, -1)}><MinusSquareIcon className='control-button'/></button>
            <p>{item.quantity}</p>
            <button onClick={() => updateQuantity(item.product_id, 1)}><PlusSquareIcon className='control-button'/></button>
          </div>
        </div>
      </div>
      {!finalItem && <hr /> }
    </div>
  )
};

export default CartPageMobile;