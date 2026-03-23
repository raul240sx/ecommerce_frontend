import api from './axios.js';

const getProducts = async (params) => {

    try {
        const response = await api.get('products-api/products/', {params});
        console.log('Respuesta del backend:', response.data);
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Error en la petición:', error.response.data);
            console.error('Codigo de error', error.response.status);
        }
        else {
            console.error('Error al comunicarse con el backend de products-service')
        }
        throw error;
    }
    
};

export default getProducts;