import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';
import './RegisterPage.css'


function RegisterPage() {
  /* Declaracion de estados */
  const [errors, setErrors] =useState({});

  const [registerForm, setRegisterForm] = useState({
    email:'',
    password:'',
    confirm_password:''
  });

  const [showPass, setShowPass] = useState(false);

  const [disableButton, setDisableButton] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);
  

  /* ACTUALIZAR LO ESCRITO EN LOS INPUTS */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  }

  /* MOSTRAR/OCULTAR CONTRASEÑA */
  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  /* MANEJADOR DE SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('datos a enviar:', registerForm);

    const localErrors = {};

    if (!registerForm.email) {
      localErrors.email = ['El campo "Email" no puede ir vacío'];
    }

    if (!registerForm.password) {
      localErrors.password = ['El campo "Contraseña" no puede ir vacío'];
    }

    if (registerForm.confirm_password !== registerForm.password) {
      localErrors.confirm_password = ['Las contraseñas no coinciden'];
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }


    setDisableButton(true);
    setErrors({});

    try {
      const response = await api.post('users-api/register/', registerForm);
      console.log('Respuesta del backend', response.data);
      setIsRegistered(true);
    }

    catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      
        
      // El servidor respondió con un código fuera del rango 2xx
        console.log("Datos de error de Django:", error.response.data);
        console.log("Código de estado:", error.status);
      } 
      
      else {
        // Algo pasó al preparar la petición
        console.log("Error de conexión:", error.message);
      }
    }
    
    finally {
        setDisableButton(false);
    }

  }

  const blankError = errors.password?.find(msg => msg.includes('vacío') || msg.includes('obligatorio'));
  const passwordRequirements = errors.password?.filter(msg => msg !== blankError) || [];




  return(
    <div className='register-container'>
      {isRegistered? (
        <div className='success-container auth-card'>
          <h1>Gracias Por Registrarte En GuitarZone.cl</h1>
          <div className='success-card'>
            <ul>
              <li>Hemos enviado un link de verificación a tu correo.</li>
              <li>Recuerda que debes estar verificado para realizar compras en nuestro sitio.</li>
              <li>Si no encuentras el correo recuerda revisar en la casilla de spam.</li>
            </ul>
          </div>
          <div className='auth-links'>
            <p>Ingresa a tu cuenta <Link to='/login'>Iniciar Sesion</Link></p>
            <p>Olvidaste tu contraseña? <Link to='/password-recovery'>Recuperar contraseña</Link></p>
            <hr />
            <p><Link to='/'>Volver al inicio</Link></p>
          
          </div>
        </div>
      ) : (
        <div className='fill-form auth-card'>
          <h1>Crea Tu Cuenta En GuitarZone.cl</h1>
          <div className='register-card'>
            <form onSubmit={handleSubmit}>

              <div className='form-group'>
                <label htmlFor='email-input'>Correo Electrónico</label>
                <input
                id='email-input'
                type='email'
                name='email'
                placeholder='usuario@correo.cl'
                autoComplete='username'
                value={registerForm.email} 
                onChange={ handleChange } />
                
                <span className='error-message' aria-live='polite'>
                  {errors.email && errors.email[0]}
                </span>
              </div>

            
              <div className='form-group'>
                <label htmlFor='password-input'>Contraseña</label>
                <div className='password-field-wrapper'>
                  <input
                  id='password-input'
                  type={ showPass? 'text' : 'password' }
                  name='password' 
                  placeholder='Contraseña'
                  autoComplete='new-password'
                  value={registerForm.password} 
                  onChange={ handleChange }/>

                  <button
                  type='button'
                  className='toggle-password-btn'
                  onClick={ handleShowPass }>
                    { showPass? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                      </svg>) : 
                      (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>) }
                  </button>
                </div>
                <span className='error-message' aria-live='polite'>
                  {blankError}
                </span>
              </div>

              <div className='form-group'>
                <label htmlFor='password-confirm-input'>Repite la Contraseña</label>
                <input
                id='password-confirm-input' 
                type={ showPass? 'text' : 'password' }
                name='confirm_password'
                autoComplete='new-password'
                placeholder='Repite la contraseña'
                value={registerForm.confirm_password} 
                onChange={ handleChange }/>
                <span className='error-message' aria-live='polite'>
                  {passwordRequirements.length > 0 && (
                    <>
                      <p>La contraseña debe cumplir los siguientes requisitos:</p>
                      <ul>
                        {passwordRequirements.map( (error, index) => (
                          <li key={index}> {error}</li>
                        
                        ))}
                      </ul>
                    </>
                  ) || 
                    errors.confirm_password && errors.confirm_password[0]
                  }
                </span>
              </div>
              
              <button
                className='submit-btn' 
                type='submit'
                disabled={disableButton}>
                Crear cuenta
              </button>

            </form>
          
            <div className='auth-links'>
              <p>Ya tienes una cuenta? <Link to='/login'>Iniciar Sesion</Link></p>
              <p>Olvidaste tu contraseña? <Link to='/password-recovery'>Recuperar contraseña</Link></p>
              <hr />
              <p><Link to='/'>Volver al inicio</Link></p>

            </div>
          </div>

        </div>
      )}
    </div>
  )
}



export default RegisterPage
