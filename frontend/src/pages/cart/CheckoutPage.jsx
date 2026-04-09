import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useEffect, useState } from 'react';
import OrderSummaryTable from '../../components/orders/OrderSummaryTable';
import { XIcon } from '../../components/common/Icons.jsx';
import AddressForm from '../../components/addresses/AddressForm.jsx';
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
	const [ addresses, setAddresses ] = useState(null);
	const [ loadingAddresses, setLoadingAddresses ] = useState(true);
	const [ showForm, setShowForm ] = useState(false);
	const [ selectedAddress, setSelectedAddress ] = useState('');
	const [ updateAddresses, setUpdateAddress ] = useState(0);



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


	useEffect(() => {
		const fetchAddresses = async() => {
			try {
				setLoadingAddresses(true);
				const response = await api.get('users-api/addresses/');
				setAddresses(response.data.results);
				console.log('Las direcciones son:', response.data.results);

			} catch (error) {
				if (error.response) {
					console.log('error en el backend al obtener las direcciones', error.response.data);
					console.log('el codigo de error al intentar obtener las direcciones es: ', error.response.status);
				}
				else {
					console.log('error al intentar comunicarse con el backend');
				}
			}
			finally{
				setLoadingAddresses(false);
			}
		}

		fetchAddresses();

	}, [updateAddresses])

	const handleCloseForm = () => {
    setShowForm(false);
  };


	const handlePayment = async() => {
		
		try {
			const patchPayload = {
				orderId: order.id,
				addressId: selectedAddress
			};
			const resp1 = await api.patch('orders-api/order-address/', patchPayload);
			setLoadingPayment(true);
			const resp = await api.post(`orders-api/order-payment/${order.id}/`);
			window.location.href = resp.data.payment_link;
			console.log('La orden es:', resp1.data);

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


	const handleSuccess = (newAddress) => {
		setSelectedAddress(newAddress.id);
		setUpdateAddress(prev => prev + 1);
		setShowForm(false);
	};


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
						<h4>La api de MercadoPago por seguridad se encuentra en modo sandbox, si quieres probar probar el sistema de compra puedes seguir los siguientes pasos: </h4>
						<ul>
							<li>En la sección de "¿Cómo quieres pagar?" debes seleccionar la opción "Ingresar con mi cuenta".</li>
							<li>Ingresar con el email: TESTUSER971278915762313905</li>
							<li>Seleccionar "Contraseña" como método de verificación para continuar.</li>
							<li>Ingresar la contraseña: 3Vqlkkfrq9</li>
							<li>Finalmente seleccionar la tarjeta Mastercard de credito terminada en 2580, ingresar el código de seguridad "123" y pagar.</li>
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

				<div className='checkout-address-container'>
					<p>Dirección para el envío</p>

					{(!showForm && !loadingAddresses) &&
						<div className='address-listing'>
							<label htmlFor='checkout-addresses'>Selecciona una dirección</label>
							<select
							name='address'
							id='checkout-addresses'
							onChange={(e) => setSelectedAddress(e.target.value)}
							value={selectedAddress}
							>
								<option value=''>Selecciona dirección</option>
								{addresses.map((address, idx) => (
									<option key={idx} value={address.id}>{address.street} {address.number} | {address.commune_name}</option>
								))}
							</select>
						</div>
					}
					
					{showForm && <AddressForm onCancel={handleCloseForm} onSuccess={handleSuccess} /> }

					{!showForm && <button className='new-direction-btn' onClick={() => setShowForm(true)}>Usar una dirección nueva</button>}
				</div>

				<div className='payment-container'>
					<p>TOTAL A PAGAR: {formatter.format(order.total_amount)}</p>

					<button 
						className='checkout-payment-btn'
						disabled={order?.status === 'CANCELLED' || order?.status === 'PAID' || !selectedAddress}
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