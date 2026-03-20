import { useState, useEffect} from 'react';
import getProducts from '../api/productService';


function useProducts(params = {}) {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ totalProducts, setTotalProducts ] = useState(null);

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);

            try {
                const data = await getProducts(params);
                setProducts(data.results || data);
                setError(null);
                setTotalProducts(data.count)

            } catch (error) {
                setError(error);
            }
            finally{
                setLoading(false);
            }
        };
        
        fetchProducts();
    

    }, [params.category, params.limit, params.offset]);

    return { products, loading, error, totalProducts };
    
};

export default useProducts;