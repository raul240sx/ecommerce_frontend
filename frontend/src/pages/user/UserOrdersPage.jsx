import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { SearchIcon } from '../../components/common/Icons.jsx';
import { formatter } from '../../components/common/FormatMoney.jsx';
import { formatDate } from '../../components/common/FormatDate.jsx';
import { formatStatus } from '../../components/common/FormatStatusOrder.jsx';
import './UserOrdersPage.css'


function UserOrders() {
  const { checkAuth } = useAuth();
  const { orders, loading, error , updateFilters, searchParams } = useOrders();
  const currentStatus = searchParams.get('status') || '';
  const currentOrdering = searchParams.get('ordering') || '';

  useEffect(() => {
    checkAuth()
  },[])

  if (error) {
    return( <div>Error al cargar las órdenes</div> )
  }

  if (loading) {
    return( <div>Cargando órdenes</div> )
  }


  return(
    <div className='orders-container'>
      <h1>Órdenes de compra</h1>
      <div className='orders-content'>
        {orders.length <= 0? 
          <div className='no-orders-container'>
            <p>Aún no tienes órdenes de compra</p>
          </div> :
          <>
          <div className='orders-table-section'>
            <table className='orders-table'>
              <thead className='orders-table-titles'>
                <tr>
                  <th>ID de orden</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Fecha Creación</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody className='orders-table-data'>
                {orders?.map((order, index) => (
                  <tr key={index} className={`order-row ${index % 2 === 0 ? '' : 'odd-row'}`}>
                    <td>{order.id}</td>
                    <td>{formatter.format(order.total_amount)}</td>
                    <td>{formatStatus(order.status) }</td>
                    <td>{formatDate(order.created_date)}</td>
                    <td> <Link to={`/order-detail/${order.id}`}><SearchIcon/></Link>  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='table-filters'>
            <div className='state-filter'>
              <label htmlFor='items'>Filtar por estado:</label>
              <select 
              value={currentStatus}
              onChange={(e) => updateFilters({ status: e.target.value})}>
                <option value=''>Todos</option>
                <option value='PAID'>PAGADOS</option>
                <option value='PENDING'>PENDIENTES</option>
                <option value='CANCELLED'>CANCELADOS</option>
              </select>
            </div>
            
            <div className='sorting-buttons'>
              <span>Ordenar por monto:</span>
              <div className='sorting-btn-container'>
                <button 
                  className={`filter-btn ${currentOrdering === 'total_amount' ? 'active' : ''}`} onClick={() => updateFilters({ ordering: 'total_amount' })}>
                  Menor a Mayor
                </button>
                <button 
                  className={`filter-btn ${currentOrdering === '-total_amount' ? 'active' : ''}`} onClick={() => updateFilters({ ordering: '-total_amount' })}>
                  Mayor a Menor
                </button>
              </div> 
            </div>

            <button className='filter-btn' onClick={() => updateFilters({ ordering: '', status: '', limit: '' })}>
              Limpiar todos los filtros
            </button>
          </div>
          </>
        }
        
      </div>
    </div>
  )

}

export default UserOrders;