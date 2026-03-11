import { PlusSquareIcon, MinusSquareIcon, CircleXIcon } from '../../components/common/Icons';

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartPageDesktop({ item, updateQuantity, removeFromCart }) {
    
	return(
		<div className='cart-item-row-desktop'>
			<img src={item.image} alt={item.name} className='cart-img-desktop'/>
			<div className='name-column'><p>{item.name}</p></div>
			<div className='controls-column'>
				<button onClick={() => updateQuantity(item.product_id, -1)}><MinusSquareIcon className='quantity-cart-button'/></button>
				<p>{item.quantity}</p>
				<button onClick={() => updateQuantity(item.product_id, 1)}><PlusSquareIcon className='quantity-cart-button'/></button>
			</div>
			<div className='unit-price-column'><p>{formatter.format(item.price)}</p></div>
			<div className='subtotal-price-column'><p>{formatter.format(item.price * item.quantity)}</p></div>
			<div className='delete-item-column'>
				<button onClick={() => removeFromCart(item.product_id)} ><CircleXIcon className='cross-button-desktop'/></button>
			</div>
		</div>
	)

};

export default CartPageDesktop;