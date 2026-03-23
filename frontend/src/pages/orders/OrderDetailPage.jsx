import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderSummaryTable from '../../components/orders/OrderSummaryTable';
import api from '../../api/axios';
import './OrderDetailPage.css'
import { formatDate } from '../../components/common/FormatDate';
import { formatStatus } from '../../components/common/FormatStatusOrder';
import { formatter } from '../../components/common/FormatMoney';




function OrderDetailPage() {
	const { orderId } = useParams();
	const [ order, setOrder ] = useState(null)
	const [ loadingOrder, setLoadingOrder ] = useState(true);

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

	if (loadingOrder) {
		return (
			<div>Cargando Orden</div>
		)
	}

	return (
		<div className='order-detail-container'>
			<div className='order-detail-content'>
				<h1 className='order-detail-title'>Detalle de orden N° {order.id}</h1>
				<div className='table-container'>
					<OrderSummaryTable order={order} className='detail-table-sum'/>
				</div>
				<div className='order-info'>
					<p><strong>Total de la orden: </strong>{formatter.format(order.total_amount)}</p>
					<p><strong>Estado: </strong>{formatStatus(order.status)}</p>
					<p><strong>Fecha de creación: </strong>{formatDate(order.created_date)}</p>
				</div>
				<div className={`${order.status === 'PENDING'? 'active-checkout' : 'disable-checkout'} `}>
					<button>Proceder al Checkout</button>

				</div>
			</div>
		</div>
	);


};

export default OrderDetailPage;