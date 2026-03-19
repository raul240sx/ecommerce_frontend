import { useState } from 'react';


const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });


function CheckoutPageDesktop({ item, index, itemsLength }) {
	const isLastItem = (itemsLength === (index + 1))

	return (
		<div className='sum-table-content'>
			<div className='sum-item-number'>
				<p>{index + 1}</p>
			</div>
			<div className='sum-img-item'>
				<img src={item.image_url} alt={item.product_title} />
			</div>
			<div className='sum-name-column'>
				<p>{item.product_title}</p>
			</div>
			<div className='sum-quantity-column'>
				<p>{item.quantity}</p>
			</div>
			<div className='sum-unit-price-column'>
				<p>{formatter.format(item.unit_price)}</p>
			</div>
			<div className='sum-subtotal-price-column'>
				<p>{formatter.format(item.unit_price * item.quantity)}</p>
			</div>
			{!isLastItem && <hr /> }

		</div>
	)
};

export default CheckoutPageDesktop;
