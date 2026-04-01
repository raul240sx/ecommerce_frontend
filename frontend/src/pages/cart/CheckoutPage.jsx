import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useEffect, useState } from 'react';
import OrderSummaryTable from '../../components/orders/OrderSummaryTable';
import { XIcon } from '../../components/common/Icons.jsx';
import './CheckoutPage.css'



const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function CartCheckoutPage() {
	const { orderId } = useParams();
	const [ order, setOrder ] = useState(null);
	const [ showModalInfo, setShowModalInfo ] = useState(false);
	const [ loadingOrder, setLoadingOrder ] = useState(true);
	const [ loadingPayment, setLoadingPayment ] = useState(false);



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


	if (order?.status === 'CANCELLED') {
		return(
			<div className='order-no-available'>
				<h3>La orden N° {order.id} ha exedido el tiempo de pago y ha sido cancelada.</h3>
				<Link to={'/'} className='return-btn'>Volver al inicio</Link>
			</div>
		)
	}

	if (order?.status === 'PAID') {
		return(
			<div className='order-no-available'>
				<h3>La orden N° {order.id} ya ha sido pagada.</h3>
				<Link to={'/'} className='return-btn'>Volver al inicio</Link>
			</div>
		)
	}
	

	return(
		<div className='checkout-container'>
			{showModalInfo && 
			<div className='info-modal-container'>
				<div className='info-modal-content'>
					<button className='close-modal-btn' onClick={() => setShowModalInfo(false)}><XIcon className='x-btn-alert'/></button>
					<h3>Aviso Importante</h3>
					<p>Las compras realizadas en este sitio web son ficticias y son solo con fines educativos, para mas información haz click <Link to={'/legal'}>aquí</Link>.</p>
				
					<div className='sandbox-data'>
						<h4>La api de MercadoPago se encuentra en modo sandbox, si quieres probar probar el sistema de compra puedes seleccionar la opcion "Sin cuenta de Mercado Pago" y agregar una tarjeta con los siguientes datos: </h4>
						<ul>
							<li>Número de Tarjeta: 4168 8188 4444 7115</li>
							<li>Fecha de expiración: Cualquier fecha futura (ej: 12/28).</li>
							<li>CVV: 123</li>
							<li>Nombre del titular: Tu nombre o "Prueba"</li>
							<li>RUT: 11.111.111-1 (o cualquier RUT válido).</li>
						</ul>
					</div>
					<button className='checkout-payment-btn' id='confirm-modal-btn' onClick={handlePayment} > Entendido, ir a pagar</button>
				</div>
			</div>
			}
			
			{loadingOrder? <div>Cargando Orden</div> :
			<div className='checkout-content'>
				<h1>Checkout</h1>
				<h2>Id de orden N° {order.id}</h2>
				<OrderSummaryTable order={order}/>
				
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

					<button 
						className='checkout-payment-btn'
						disabled={order?.status === 'CANCELLED' || order?.status === 'PAID'}
						onClick={() => setShowModalInfo(true)}>
						Pagar con MercadoPago
					</button>

				</div>
				

			</div>

			
			}
			
		</div>
	)
};

export default CartCheckoutPage;