import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserPageLayout.css'

function UserPage() {
	const { user, checkAuth } = useAuth();

	useEffect(() => {
		checkAuth();

	}, [])

	console.log(user)


	return(
		<div className='account-container'>
			<div className='page-title'>
				<h1>Mi perfil</h1>
			</div>
			<div className='account-content'>
				<div className='sidebar-left'>
					<Link to={'/my-account'} >Información</Link>
					<Link to={'/my-account/my-orders'} >Mis Ordenes</Link>
					<Link to={'/my-account/my-addresses'} >Mis Direcciones</Link>
					<Link to={'/my-account/update-info'} >Actualizar información</Link>
					<Link to={'/my-account/configurations'} >Configuraciones</Link>
				</div>
				<div className='division-line'>
					<hr />
				</div>
				<div className='right-section'>
					<Outlet/>
				</div>
			</div>
		</div>
 )

};

export default UserPage;