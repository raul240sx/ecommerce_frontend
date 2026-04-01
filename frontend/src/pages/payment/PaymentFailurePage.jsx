import { Link } from 'react-router-dom';

function PaymentFailurePage() {
	return (
		<div className='post-payment-container'>
			<div className='post-payment-content'>
				<h1>Pago Fallido</h1>
				<p>En tu perfil puedes ver el estado de tus compras</p>

				<div className='payment-button-section'>
					<Link to={'/'} className='post-payment-btn' >Regresar al inicio</Link>
					<Link to={'/my-account/my-orders'} className='post-payment-btn' >Ir a mis compras</Link>

				</div>
			</div>
		</div>
	)
};

export default PaymentFailurePage;