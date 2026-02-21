import { useState } from 'react';
import api from '../../api/axios.js';
import './RegisterPage.css'


function RegisterPage() {
  const [errors, setErrors] =useState({})

  const [registerForm, setRegisterForm] = useState({
    email:'',
    password:'',
    confirm_password:''
  });


  const [showPass, setShowPass] = useState(false);

  const [disableButton, setDisableButton] = useState(false)
  

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
    setShowPass(!showPass)
  }

  /* MANEJADOR DE SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('datos a enviar:', registerForm);

    const localErrors = {};

    if (!registerForm.email) {
      localErrors.email == ['El campo "Email" no puede ir vacío'];
    }

    if (!registerForm.password) {
      localErrors.password == ['El campo "Contraseña" no puede ir vacío'];
    }

    if (registerForm.confirm_password !== registerForm.password) {
      localErrors.confirm_password == ['Las contraseñas no coinciden'];
    }

    if (Objects.keys(localErrors). lenght > 0) {
      setErrors(localErrors);
      return;
    }


    setDisableButton(true);
    setErrors({});

    try {
      const response = await api.post('users-api/register/', registerForm);
      console.log('Respuesta del backend', response.data)
    }

    catch (error) {
      if (error.response) {
        setErrors(error.response.data)
      
        
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

  const blankError = errors.password?.find(msg=msg.includes('vacío') || msg.includes('obligatorio'));
  const passwordRequirements = errors.password?.filter(msg => msg !== blankError) || []
  const bottomErrors = [...(errors.confirm_password || []), ...passwordRequirements]



  return(
    <div className='register-container'>
      <h1>Crea tu cuenta en GuitarZone.cl</h1>
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

          <div className='password-group'>
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

                <span className='error-message' aria-live='polite'>
                  {errors.password && errors.password[0]}
                </span>

                <button
                type='button'
                className='toggle-password-btn'
                onClick={ handleShowPass }>
                  { showPass? 'Ocultar Contraseña' : 'Mostrar Contraseña' }
                </button>
              </div>
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
                {errors.password && (
                  <ul>
                    {bottomErrors.map( (error, index) => (
                      <li key={index}> {error}</li>
                    
                    ))}
                  </ul>
                )}
              </span>
            </div>
            
          </div>

          <button 
            type='submit'
            disabled={disableButton}>
            Crear cuenta
          </button>

        </form>
      </div>
      
    </div>
  )
}



export default RegisterPage
