import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './AddressForm.css'

function AddressForm({ addressToEdit, onSuccess, onCancel }) {
  const [ regions, setRegions ] = useState([]);
  const [ communes, setCommunes ] = useState([]);
  const [ selectedZone, setSelectedZone ] = useState ('');
  const [ selectedRegion, setSelectedRegion ] = useState('')
  const [ selectedCommune, setSelectedCommune ] = useState('');
  const [ loadingRegions, setLoadingRegions ] = useState(false);
  const [ loadingCommunes, setLoadingCommunes ] = useState(false);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ formErrors, setFormErrors ] = useState('');
  const [ addressForm, setAddressForm ] = useState(
    addressToEdit? 
    {
      street: addressToEdit.street,
      number: addressToEdit.number,
      apartment: addressToEdit.apartment || '',
    } : {
    street: '',
    number: '',
    apartment: '',
  });


  useEffect(() => {
    if (addressToEdit) {
      const fetchEditRegion = async() => {
        setLoadingRegions(true);
        try {
          const response = await api.get(`users-api/locations/communes/${addressToEdit.commune}/`)
          setSelectedZone(response.data.region.zone);
          setSelectedRegion(response.data.region.id);
          setSelectedCommune(response.data.id);
          console.log('las regiones de la zona son', regions)
          
        } catch (error) {
          console.log(error.response);

        } finally {
          setLoadingRegions(false);
        }

      }
      fetchEditRegion();
    }
    else {
    }


  }, [addressToEdit]);



  
  const handleChangeForm = (e) => {
    const { name, value } = e.target

    setAddressForm({
      ...addressForm,
      [name]: value
    });

  };


/* Selector de region */
  useEffect(() => {

    

    const fetchRegions = async() => {
      setLoadingRegions(true);
      try {
        const response = await api.get(`users-api/locations/regions/?zone=${selectedZone}&ordering=name`)
        setRegions(response.data.results);
        console.log('las regiones de la zona son', regions)
        
      } catch (error) {
        console.log(error.response);

      } finally {
        setLoadingRegions(false);
      }
    };

    
    if (selectedZone) {
      fetchRegions();
      
    }  

  }, [selectedZone])

/* Selector de comuna */
  useEffect(() => {

 

    const fetchCommunes = async() => {
      setLoadingCommunes(true);
      try {
        const response = await api.get(`users-api/locations/communes/?region=${selectedRegion}&ordering=name`)
        setCommunes(response.data.results);
        console.log('las comunas son', response.data.results)
        
      } catch (error) {
        console.log(error.response);

      } finally {
        setLoadingCommunes(false);
      }
    };

    
    if (selectedRegion) {
      fetchCommunes();
      
    }  

  }, [selectedRegion])


  /* Envío del formulario */

  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = {
      ...addressForm,
      commune: selectedCommune,
    }

    if (addressToEdit) {
      try {
        setIsSubmitting(true)
        const response = await api.patch(`users-api/addresses/${addressToEdit.id}/`, payload);
        if (onSuccess) {
          onSuccess(response.data);
        }
        setAddressForm({
          street: '',
          number: '',
          apartment: '',
        });
        setSelectedZone('');

      } catch (error) {
        if (error.response && error.response.status === 400){
          console.log(error.response);
          setFormErrors(error.response.data);
        }
      
      } finally {
        setIsSubmitting(false)
      }

    }

    else{
      try {
        setIsSubmitting(true)
        const response = await api.post('users-api/addresses/', payload);
        if (onSuccess) {
          onSuccess(response.data);
        }
        setAddressForm({
          street: '',
          number: '',
          apartment: '',
        });
        setSelectedZone('');

      } catch (error) {
        if (error.response && error.response.status === 400){
          console.log(error.response);
          setFormErrors(error.response.data);
        }
      
      } finally {
        setIsSubmitting(false)
      }
    }

  }

  /* || (addressForm.street === '') || (addressForm.number === '') || !selectedCommune */

  const handleDisableSubmitBtn = () => {
    if (isSubmitting ) {
      return true
    } else {
      return false
    }

  };


  return(
    <form className='address-form' onSubmit={handleSubmit}>
      <h3>Ingresa los datos de la dirección</h3>
      <div className='address-form-group'>
        <label htmlFor='address-street'>Calle</label>
        <div className='input-error-group'>
          <input 
          id='address-street'
          name='street'
          type='text'
          value={addressForm.street}
          onChange={handleChangeForm} />
          {formErrors.street && <span>{formErrors.street[0]}</span> }
        </div>
      </div>
            
      <div className='address-form-row'>
        <div className='address-form-group'>
          <label htmlFor='address-number'>Número</label>
          <div className='input-error-group'>
            <input 
            id='address-number'
            name='number'
            type='text'
            value={addressForm.number}
            onChange={handleChangeForm} />
            {formErrors.number && <span>{formErrors.number[0]}</span> }
          </div>
        </div>

        <div className='address-form-group'>
          <label htmlFor='address-apartment'>Departamento (Opcional)</label>
          <input 
          id='address-apartment'
          name='apartment'
          type='text'
          value={addressForm.apartment}
          onChange={handleChangeForm} />
        </div>
      </div>

      <div className='address-select-span-group'>   
        <div className='address-select-row'>
          <div className='address-form-group'>
            <label htmlFor='address-zone'>Zona</label>
            <select
            name='zone'
            id='address-zone'
            onChange={(e) => {setSelectedZone(e.target.value); setSelectedRegion(''); setSelectedCommune('');}}
            value={selectedZone}>
              <option value=''>Selecciona zona</option>
              <option value='NORTH'>Norte</option>
              <option value='CENTER'>Centro</option>
              <option value='SOUTH'>Sur</option>
            </select>
          </div>

          <div className='address-form-group region-select'>
            <label htmlFor='address-region'>Región</label>
            <select
            name='region'
            id='address-region'
            onChange={(e) => {setSelectedRegion(e.target.value); setSelectedCommune('');}}
            value={selectedRegion}
            disabled={!selectedZone} >
              <option value=''>Selecciona Región</option>
              {!loadingRegions && regions.map((region, index) => (
                <option key={index} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <div className='address-form-group'>
            <label htmlFor='address-commune'>Comuna</label>
            <select
            name='commune'
            id='address-commune'
            onChange={(e) => setSelectedCommune(e.target.value)}
            value={selectedCommune}
            disabled={!selectedRegion} >
              <option value=''>Selecciona Comuna</option>
              {!loadingCommunes && communes.map((commune, index) => (
                <option key={index} value={commune.id}>{commune.name}</option>
              ))}
            </select>
          </div>
        </div>
        {formErrors.commune && <span>{formErrors.commune[0]}</span> }
      </div>
      
      <div className='form-btn'>
        <button id='cancel-address-button' type='button' onClick={onCancel}>Cancelar</button>
        <button id='submit-address-button' type='submit' disabled={handleDisableSubmitBtn()}> {addressToEdit? 'Guardar cambios' : 'Crear dirección'}</button>
      </div>
    </form>


  )


};


export default AddressForm