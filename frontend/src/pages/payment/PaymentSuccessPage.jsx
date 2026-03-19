import { useState } from 'react';

function PaymentSuccessPage() {
	return (
		<div className='payment-container'>
			<h1>Pago Exitoso</h1>
			<p>Gracias por tu compra</p>
			<p>En tu perfil puedes ver el estado de tus compras</p>

			<div className='payment-button-section'>
				<button>
				Regresar al inicio
				</button>
				<button>
						Ir a mis compras
				</button>

			</div>
				
		</div>
	)
};

export default PaymentSuccessPage;