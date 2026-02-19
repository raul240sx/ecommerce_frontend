import { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api/axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    confirm_password:''
  })

  const [showPass, setShowPass] = useState(false)

  const [errors, setErrors] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')

    try{
      const response = await api.post('register/', formData);

      console.log('Respuesta correcta del servidor', response.data);
      alert('Usuario creado con éxito. Revisa tu correo');
    }
    catch (error) {
      if (error.response) {
        setErrors(error.response.data)
        console.error('Error en el registro', error.response.data || error.message);
      }
      else {
        setErrors({'non_field_errors':'Error de conexión con el servidor'})
      }
        
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  };

  

  const handleButton = (e) => {
    const showButton = e.currentTarget.name

    if (showButton === 'password'){
      setShowPass(!showPass);
    
    }}
  


  return(
    <div className='register-container'>

      {(errors.detail || errors.non_field_errors) &&
        <div className='errors-container'> {errors.detail || errors.non_field_errors?.[0]} </div>
      }
      

      <h1>Crea tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type='email'
        name='email'
        placeholder='Correo Electrónico'
        onChange={handleChange}
        value={formData.email}
        />
        {errors.email && <span className='error-msg'>{errors.email[0]}</span>}

        <input 
        type={showPass? 'text' : 'password'}
        name='password'
        placeholder='Contraseña'
        onChange={handleChange}
        value={formData.password}
        />
        {errors.password && <span className='error-msg' style={{ whiteSpace: 'pre-wrap' }}>{errors.password[0]}</span>}

        <button 
        type='button'
        name='password'
        onClick={handleButton}
        >ver contraseña</button>
        <input 
        type={showPass? 'text' : 'password'}
        name='confirm_password'
        placeholder='Repite la contraseña'
        onChange={handleChange}
        value={formData.confirm_password}
        />
        <button type='submit'>Crea tu cuenta</button>
      </form>

      <div>
        <Link to='/login'>Iniciar sesion</Link>
      </div>

    </div>
  )

}

export default RegisterPage

 