import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/products/ProductCard';
import { useAuth } from '../../context/AuthContext';


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
    <div className="home-container">
      <h1>Nuestros Productos</h1>
      <div className='guitars'>
        {loadingGuitars? 
        ( <p>Cargando guitarras...</p>) : errorGuitars? ( <p>Error al cargar las guitarras</p> ) : (
            guitars.map((guitar) => (
              <ProductCard key={guitar.id} product={guitar} />
            ))
          )
          
        }
        {console.log('el usuario es', user)}
      </div>

      <div className='amps'>
        {loadingAmps? 
        ( <p>Cargando amplificadores...</p>) : errorAmps? ( <p>Error al cargar los amplificadores</p> ) : (
          <ul>
            {amps.map((amp) => (
              <li key={amp.id}>{amp.name}</li>

            ))}
          </ul>
          ) 
        }
      </div>

      <div className='accessories'>
        {loadingAccessories? 
        ( <p>Cargando accesorios...</p>) : errorAccessories? ( <p>Error al cargar los accesorios</p> ) : (
          <ul>
            {accessories.map((accessorie) => (
              <li key={accessorie.id}>{accessorie.name}</li>

            ))}
          </ul>
          ) 
        }
      </div>

    </div>
  );
}

export default HomePage;
