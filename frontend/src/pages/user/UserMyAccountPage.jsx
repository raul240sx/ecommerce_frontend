import { useAuth } from '../../context/AuthContext.jsx';
import { CheckCircleIcon, CircleXIconBg } from '../../components/common/Icons.jsx';
import useCooldown from '../../hooks/useCooldown.js';
import api from '../../api/axios.js';
import './UserMyAccountPage.css'
import { useEffect, useState } from 'react';

function UserMainInfo() {
  const { user, checkAuth } = useAuth();
	const [ errors, setErrors ] = useState('');
	const { timeLeft, isActive, start } = useCooldown(150);

	useEffect(() => {
		checkAuth();

	},[]);

	const handleVerifyBtn = async() => {
		try {
			const response = await api.post('users-api/resend-email-verification/', {});
			start();
		} catch (error) {
			console.log('error al intentar re enviar el correo de verificación', error.response.data);
			setErrors(error.response.data);
		}
		
	};



	return(
		<div className='user-info-container'>
			<h1>Información de la cuenta</h1>
			<div className='user-info'>
				{!user.is_profile_complete && <h3> Aún no has completado tu perfil, puedes completarlo en la sección "Actualizar Información"</h3> }
				<p><strong>Email: </strong>{user.email}</p>
				<p><strong>Nombre: </strong>{user.first_name? user.first_name : 'No indicado'}</p>
				<p><strong>Apellido: </strong>{user.last_name? user.last_name : 'No indicado'}</p>
				<p><strong>Teléfono: </strong>{user.phone? user.phone : 'No indicado'}</p>
				<p><strong>Email verificado:</strong> {user.is_verified? <CheckCircleIcon className='verified-check'/> : <CircleXIconBg className='non-verified-check' /> } </p>

				{!user.is_verified &&
				<div className='verify-email-section'>
					<button className='info-verify-btn' onClick={handleVerifyBtn} disabled={isActive}>Reenviar correo de verificación</button>
					{isActive &&
					<div className='verify-messages'>
						<p>Revisa tu bandeja de correo (Recuerda revisar la carpeta de spam) </p>
						<p>Puedes volver a intentar dentro de {Math.floor(timeLeft/60)} minutos y {timeLeft - ((Math.floor(timeLeft/60))* 60)} segundos</p>
						{errors && <span>{errors}</span> }
					</div> }
				</div>
				}
				
			
			</div>

		</div>

	)

}

export default UserMainInfo;