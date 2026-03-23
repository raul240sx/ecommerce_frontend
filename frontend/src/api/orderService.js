import api from './axios.js'

export const getOrders = async (params) => {
    try {
        const response = await api.get('orders-api/order-list/', { params });
        return response.data;
    } catch (error) {
        throw(error);
    }
}