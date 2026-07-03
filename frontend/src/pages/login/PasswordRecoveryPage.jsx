import { Link } from "react-router-dom"
import { useState } from "react";
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import './PasswordRecoveryPage.css'

function PasswordRecovery() {
	const { isAuthenticated, loading } = useAuth();
	const [errors, setErrors] = useState({});
	const [disableButton, setDisableButton] = useState(false);
	const [isRequested, setIsRequested] = useState(false);
	const [resetForm, setResetForm] = useState({
			'email':'',
	});

	const handleSubmit = async(e) =>{
		e.preventDefault();
		setErrors({});
		setDisableButton(true);

		try{
			await api.post('users-api/password-reset/', resetForm);
			setIsRequested(true);
		}
		catch (error){
			console.error(error.response)

			if (error.response) {
				setDisableButton(false);
				setErrors(error.response.data)
			}
			else {
				setDisableButton(false);
				setErrors({ non_field_errors: ["Error de conexión al servidor"]})
			}
		}
	};

	const handleChange = (e) =>{
			setResetForm({
					...resetForm,
					[e.target.name]:e.target.value
			})
	};

	return(
		<div className="recovery-container">
			{isRequested ? (
				<div className="recovery-form auth-card">
					<h1>Solicitud enviada</h1>
					<div className="success-card">
						<p>Hemos enviado un enlace a tu correo electrónico para restablecer tu contraseña.</p>
						<p>Por favor, revisa tu bandeja de entrada o la carpeta de spam.</p>
					</div>
					<div className='auth-links'>
						<Link to='/login'>Volver a Iniciar Sesión</Link>
						<hr />
						<Link to='/'>Volver al inicio</Link>
					</div>
				</div>
			) : (
				<div className="recovery-form auth-card">
					<h1>Recupera tu Contraseña</h1>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email-input">Correo Electrónico</label>
							<input
							id="email-input"
							type="text"
							name="email"
							placeholder="Correo Electrónico"
							autoComplete="username"
							onChange={handleChange}
							value={resetForm.email} />
							<span className='error-message' aria-live='polite'>
								{(errors.email && (errors.email[0] === 'This field may not be blank.')) && 'Ingresa el correo'}
							</span>
						</div>
									
						<button
							className='login-btn' 
							type='submit'
							disabled={disableButton}>
							Recuperar contraseña
						</button>  
					</form>

					<div className='auth-links'>
						<p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link> </p>
						<p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
						<hr />
						<p><Link to='/'>Volver al inicio</Link></p>
					</div>
				</div>
			)}
		</div>
	)
};

export default PasswordRecovery;