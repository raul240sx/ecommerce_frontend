import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/products/ProductCard';
import { useAuth } from '../../context/AuthContext';
import ProductHighlight from '../../components/products/ProductHighlight';
import './HomePage.css'


function HomePage() {
  const {user} = useAuth();

  const { products: guitars, loading: loadingGuitars, error: errorGuitars } = useProducts({ category: 1, limit: 4 });
  const { products : amps, loading: loadingAmps, error: errorAmps } = useProducts({ category: 2, limit: 4})
  const { products: accessories, loading: loadingAccessories, error: errorAccessories } = useProducts({ category: 3, limit:4 })

  const loading = loadingGuitars || loadingAmps || loadingAccessories;
  const error = errorGuitars || errorAmps || errorAccessories;

  if (loading) return <div>Cargando instrumentos...</div>;
  if (error) return <div>Hubo un error al cargar los productos.</div>;


  return (
    <div className='home-container'>
      <div className='home-content'>      
        <h1>Productos Destacados</h1>
        <div className='product-highlight'>
          <ProductHighlight 
            title="Guitarras"
            products={guitars}
            loading={loadingGuitars}
            error={errorGuitars}
          />
        </div>          

        <div className='product-highlight'>
          <ProductHighlight 
            title="Amplificadores"
            products={amps}
            loading={loadingAmps}
            error={errorAmps}
          />
        </div>

        <div className='product-highlight'>
          <ProductHighlight 
            title="Accesorios"
            products={accessories}
            loading={loadingAccessories}
            error={errorAccessories}
          />
        </div>          

      </div>
    </div>
  );
}

export default HomePage;
