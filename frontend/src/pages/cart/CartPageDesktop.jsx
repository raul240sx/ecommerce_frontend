import { PlusSquareIcon, MinusSquareIcon, CircleXIcon } from '../../components/common/Icons';

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartPageDesktop({ item, updateQuantity, removeFromCart, lastItemId, itemIndex, handleDisableButton }) {
	const finalItem = itemIndex === lastItemId;
	const disableAdd = item.quantity >= item.stock;
	const disableRemove = item.quantity <= 1;

    
	return(
		<div className='cart-item-row-desktop'>
			<img src={item.image} alt={item.name} className='cart-img-desktop'/>
			<div className='name-column'><p>{item.name}</p></div>
			<div className='controls-column'>
				<button disabled={disableRemove} onClick={() => updateQuantity(item.product_id, -1)}><MinusSquareIcon className='quantity-cart-button'/></button>
				<p>{item.quantity}</p>
				<button disabled={disableAdd} onClick={() => updateQuantity(item.product_id, 1)}><PlusSquareIcon className='quantity-cart-button'/></button>
			</div>
			<div className='unit-price-column'><p>{formatter.format(item.price)}</p></div>
			<div className='subtotal-price-column'><p>{formatter.format(item.price * item.quantity)}</p></div>
			<div className='delete-item-column'>
				<button onClick={() => removeFromCart(item.product_id)} ><CircleXIcon className='cross-button-desktop'/></button>
			</div>
			{!finalItem && <hr /> }
		</div>
	)

};

export default CartPageDesktop;