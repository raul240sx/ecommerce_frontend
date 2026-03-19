import './CheckoutPage.css'


const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });


function CheckoutPageMobile({ item, index, itemsLength }) {
	const isLastItem = (itemsLength === (index + 1))


	return(
		<div className='sum-items-content-mobile'>
			<div className='sum-top-info'>
				<div className='sum-index-item-mobile'>
					<p>{index + 1}.-</p>
				</div>
				<div className='sum-item-title-mobile'>
					<p>{item.product_title}</p>
				</div>
			</div>
			<div className='sum-bottom-info'>
				<div className='sum-left-info'>
					<img src={item.image_url} alt={item.product_title} className='sum-img-mobile'/>
				</div>
				<div className='sum-right-info'>
					<p><strong>Cantidad:</strong> {item.quantity}</p>
					<p><strong>Precio unitario:</strong> {formatter.format(item.unit_price)}</p>
					<p><strong>Subtotal:</strong> {formatter.format(item.unit_price * item.quantity)}</p>
				</div>
			</div>			
			{!isLastItem && <hr /> }
		</div>
)
};

export default CheckoutPageMobile;
