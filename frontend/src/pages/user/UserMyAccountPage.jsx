import { useAuth } from '../../context/AuthContext.jsx';
import { CheckCircleIcon, CircleXIconBg } from '../../components/common/Icons.jsx'
import './UserMyAccountPage.css'

function UserMainInfo() {
  const { user } = useAuth();


	return(
		<div className='user-info'>
			{!user.is_profile_complete && <h3> Aún no has completado tu perfil, puedes completarlo en la sección "Actualizar Información"</h3> }
			<p><strong>Email: </strong>{user.email}</p>
			<p><strong>Nombre: </strong>{user.first_name? user.first_name : 'No indicado'}</p>
			<p><strong>Apellido: </strong>{user.last_name? user.last_name : 'No indicado'}</p>
			<p><strong>Teléfono: </strong>{user.phone? user.phone : 'No indicado'}</p>
			<p><strong>Email verificado:</strong> {user.is_verified? <CheckCircleIcon className='verified-check'/> : <CircleXIconBg className='non-verified-check' /> } </p>
			
			
		</div>
	)

}

export default UserMainInfo;