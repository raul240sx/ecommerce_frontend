import { useState, useEffect } from 'react';
import api from '../../api/axios.js';
import AddressForm from '../../components/addresses/AddressForm.jsx';
import './UserAddressesPage.css'
import { CircleXIcon, EditIcon, PlusSquareIcon } from '../../components/common/Icons.jsx';

function UserAddresses() {
  const [ addresses, setAddresses ] = useState([]);
  const [ loadingAddresses, setLoadingAddresses ] = useState(true);
  const [ showForm, setShowForm ] = useState(false);
  const showlist = !showForm 
  const [ addressToEdit, setAddresToEdit ] = useState(null);


  useEffect(() => {
    const fetchAddresses = async() => {
      try {
        setLoadingAddresses(true);
        const response = await api.get('users-api/addresses/');
        setAddresses(response.data.results);
      } catch (error) {
        console.log(error.response);
        
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();

  }, []);

  console.log(addresses)

  const handleNewEditAddress = (newAddress) => {
    const updatedAddresses = addresses.map((address) => {
      if (address.id === newAddress.id) {
        return newAddress
      }
      else {
        return address
      }
      }
    )
    setAddresses(updatedAddresses);
    setShowForm(false);

  };


  const handleDeleteAddress = async(addressId) => {
    try {
        await api.delete(`users-api/addresses/${addressId}/`);
        setAddresses(addresses.filter(address => address.id !== addressId))
      } catch (error) {
        console.log(error.response);
    }
  };




  if (loadingAddresses) {
    return(<div>Cargando direcciones</div>)
  };

  return(
    <div className='addresses-container'>
      <div className='addressess-content'>
        {(addresses.length <= 0 && !showForm)  && 
          <div className='no-addresses'>
            <p>Aun no has añadido ninguna dirección</p>
          </div>
        }
        <div className='address-form-container'>
          {!showForm? <button onClick={() => setShowForm(true)} id='add-new-address-btn'><PlusSquareIcon className='plus-button-address'/>Agregar nueva dirección</button> :
            <AddressForm addressToEdit={addressToEdit} onSuccess={handleNewEditAddress} onCancel={() => {setShowForm(false); setAddresToEdit(null) }}/>
          }
                   
        </div>
        {showlist && 
        <div className='address-list-container'>
          <ul className='address-list'>
            {(addresses.length > 0) && addresses.map((address, index) => (
              <li key={address.id}>
                <h3>Dirección {index + 1}</h3>                
                <p><strong>Calle: </strong>{address.street}</p>
                <p><strong>Número: </strong>{address.number}</p>
                <p><strong>Departamento: </strong>{address.apartment}</p>
                <p><strong>Región: </strong>{address.region_name}</p>
                <p><strong>Comuna: </strong>{address.commune_name}</p>
                <button id='delete-address-btn' onClick={()=> handleDeleteAddress(address.id)} ><CircleXIcon/>Eliminar</button>
                <button id='edit-address-btn' onClick={() => {setAddresToEdit(address); setShowForm(true)}} ><EditIcon className='edit-icon'/>Editar</button>
              </li>
            ))}
          </ul>
        </div>
        }
      </div>
    </div>
  )




}

export default UserAddresses;