import { useState, useEffect} from 'react';
import getProducts from '../api/productService';


function useProducts(params = {}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);

            try {
                const data = await getProducts(params);
                setProducts(data.results || data);
                setError(null);

            } catch (error) {
                setError(error);
            }
            finally{
                setLoading(false);
            }
        };
        
        fetchProducts();
    

    }, []);

    return { products, loading, error };
    
};

export default useProducts;