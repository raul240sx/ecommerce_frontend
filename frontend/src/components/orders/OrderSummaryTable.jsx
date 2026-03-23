import { useEffect, useState } from 'react';
import OrderSummaryTableDesktop from './OrderSummaryTableDesktop';
import OrderSummaryTableMobile from './OrderSummaryTableMobile';
import './OrderSummaryTable.css'



function OrderSummaryTable({order}) {
	const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768);


	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		}
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
		}, [])




	return (
		<div className='summarize-table'>
			{!isMobile &&
				<div className='sum-table-titles'>
					<div className='sum-item-number'>N°</div>
					<div className='sum-img-column'></div>
					<div className='sum-name-column'><p>Producto</p></div>
					<div className='sum-quantity-column'><p>Cantidad</p></div>
					<div className='sum-unit-price-column'><p>Precio Unitario</p></div>
					<div className='sum-subtotal-price-column'><p>Sub total</p></div>
					<hr />
				</div>
				}
			<div className='sum-table'>
				{order.order_items.map((item, index) => (
					isMobile? <OrderSummaryTableMobile key={item.product_id} item={item} index={index} itemsLength={order.order_items.length}/> :
					<OrderSummaryTableDesktop key={item.product_id} item={item} index={index} itemsLength={order.order_items.length}/>
				))}
			</div>
		</div>
	);

};


export default OrderSummaryTable;




