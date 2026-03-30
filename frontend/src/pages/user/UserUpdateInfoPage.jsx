import { useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext.jsx'
import './UserUpdateInfoPage.css'

function UserUpdateInfo() {
  const { setUser } = useAuth(); 
  const [ isSubmmiting, setIsSubmitting ] = useState(false);
  const [ updateInfoForm, setUpdateInfoForm ] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  });


  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setUpdateInfoForm({
      ...updateInfoForm,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = Object.fromEntries(
        Object.entries(updateInfoForm).filter(([_,value]) => (
          typeof value === 'string' ? value.trim() !== '' : value != null
        ))
      );


      const response = await api.patch('users-api/me/', payload);
      console.log('datos actuializados', response.data);

      setUser(response.data);

    } catch (error) {
      console.log('error al actualizar info', error.response);
    }

    finally {
      setIsSubmitting(false);
      setUpdateInfoForm({
        first_name: '',
        last_name: '',
        phone: ''
      })
    }
  };


  
  return(
    <div className='update-info-container' onSubmit={handleSubmit}>
      <h2>Actualiza tus datos</h2>
      <form className='update-info-form'>
        <div className='info-form-group'>
          <label htmlFor='info-first-name'>Nombre</label>
          <input 
          type='text'
          id='info-first-name'
          name='first_name'
          value={updateInfoForm.first_name}
          onChange={handleChangeForm} />
        </div>

        <div className='info-form-group'>
          <label htmlFor='info-last-name'>Apellido</label>
          <input 
          type='text'
          id='info-last-name'
          name='last_name'
          value={updateInfoForm.last_name}
          onChange={handleChangeForm} />
        </div>

        <div className='info-form-group'>
          <label htmlFor='info-phone'>Número de contacto</label>
          <input 
          type='text'
          id='info-phone'
          name='phone'
          placeholder='912345678'
          value={updateInfoForm.phone}
          onChange={handleChangeForm} />
        </div>

        <button type='submit' disabled={isSubmmiting}>Guardar cambios</button>

      </form>


    </div>
  )

}

export default UserUpdateInfo;