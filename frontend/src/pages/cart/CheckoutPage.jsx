import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useEffect, useState } from 'react';
import CheckoutPageDesktop from './CheckoutPageDesktop';
import CheckoutPageMobile from './CheckoutPageMobile';



const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartCheckoutPage() {
	const { orderId } = useParams();
	const [ order, setOrder ] = useState(null);
	const [ loadingOrder, setLoadingOrder ] = useState(true);
	const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768);
	const [ loadingPayment, setLoadingPayment ] = useState(false);


	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
		}, [])
	

	useEffect(() => {
		const checkOrder = async() => {
			try {
				setLoadingOrder(true);
				const response = await api.get(`orders-api/order-retrieve/${orderId}/`);
				setOrder(response.data);
				console.log('La orden es:', response.data);

			} catch (error) {
				if (error.response) {
					console.log('error en el backend al obtener la orden', error.response.data);
					console.log('el codigo de error al intentar obtener la orden es: ', error.response.status);
				}
				else {
					console.log('error al intentar comunicarse con el backend');
				}
			}
			finally{
				setLoadingOrder(false);
			}
		}

		checkOrder();

	}, [orderId])


	const handlePayment = async() => {
		try {
			setLoadingPayment(true);
			const resp = await api.post(`orders-api/order-payment/${order.id}/`);
			window.location.href = resp.data.payment_link;
			console.log('La orden es:', resp.data);

		} catch (error) {
			if (error.response) {
				console.log('error en el backend al obtener la orden', error.response.data);
				console.log('el codigo de error al intentar obtener la orden es: ', error.response.status);
			}
			else {
				console.log('error al intentar comunicarse con el backend');
			}
		}
		finally{
			setLoadingPayment(false);
		}

	}
	
	

	return(
		<div className='checkout-container'>
			
			{loadingOrder? <div>Cargando Orden</div> :
			<div className='checkout-content'>
				<h1>Checkout</h1>
				<h2>Id de orden N° {order.id}</h2>
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
							isMobile? <CheckoutPageMobile key={item.product_id} item={item} index={index} itemsLength={order.order_items.length}/> :
							<CheckoutPageDesktop key={item.product_id} item={item} index={index} itemsLength={order.order_items.length}/>
						))}
					</div>
				</div>
				
				<div className='direction-container'>
					<p>Dirección para el envío</p>
					<div className='direction-form-container'>
						<form>
							<div className='direction checkout-form'>
								<label htmlFor='checkout-dir-input'>Direccion</label>
								<input type="text" id='checkout-dir-input' />
							</div>
							<div className='commune checkout-form'>
								<label htmlFor='checkout-commune-input'>Comuna</label>
								<input type="text" id='checkout-commune-input' />
							</div>
							<div className='region checkout-form'>
								<label htmlFor='checkout-region-input'>Region</label>
								<input type="text" id='checkout-region-input' />
							</div>
						</form>
					</div>

				</div>

				<div className='payment-container'>
					<p>TOTAL A PAGAR: {formatter.format(order.total_amount)}</p>

					<button onClick={handlePayment}>
						Pagar con MercadoPago
					</button>

				</div>
				

			</div>

			
			}
			
		</div>
	)
};

export default CartCheckoutPage;