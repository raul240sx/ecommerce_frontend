import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';


function ProtectedRoute() {
	const { loading, isAuthenticated } = useAuth();
	const location = useLocation();

	if (loading) {
		return( <div>Cargando...</div> );
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{  from: location.pathname }} replace/>
	}

	return <Outlet/>; 

};

export default ProtectedRoute;