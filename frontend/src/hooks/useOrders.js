import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOrders } from '../api/orderService'



export const useOrders = () => {
	const [ orders, setOrders ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);
	const [ searchParams, setSearchParams ] = useSearchParams();
	const params = Object.fromEntries([...searchParams]);
	
	const fetchOrders = useCallback(async () => {
		setLoading(true);
		try {
			const data = await getOrders(params);
			setOrders(data.results || data);
			setError(null);
		} catch (error) {
			setError('Error al cargar las órdenes', error);
		} finally {
			setLoading(false);
		}

	}, [searchParams]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);


	const updateFilters = (newFilters) => {
		const nextParams = new URLSearchParams(searchParams);

		Object.entries(newFilters).forEach(([key, value]) => {
			if (value) {
				nextParams.set(key, value);
			} else {
				nextParams.delete(key);
			}
		});

		setSearchParams(nextParams);
	}


	return { orders, loading, error, updateFilters, searchParams }
	
}