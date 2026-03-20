import useProducts from '../../hooks/useProducts';
import ProductHighlight from '../../components/products/ProductHighlight';
import hero from '../../assets/hero.jpg';
import heroMobile from '../../assets/hero-mobile.jpg';
import './HomePage.css';


function HomePage() {
  const guitarsCategory = 1;
  const amplifiersCategory = 2;
  const accessoriesCategories = 3;
  const { products: guitars, loading: loadingGuitars, error: errorGuitars } = useProducts({ category: guitarsCategory, limit: 4 });
  const { products : amps, loading: loadingAmps, error: errorAmps } = useProducts({ category: amplifiersCategory, limit: 4})
  const { products: accessories, loading: loadingAccessories, error: errorAccessories } = useProducts({ category: accessoriesCategories, limit:4 })

  const loading = loadingGuitars || loadingAmps || loadingAccessories;
  const error = errorGuitars || errorAmps || errorAccessories;

  if (loading) return <div>Cargando instrumentos...</div>;
  if (error) return <div>Hubo un error al cargar los productos.</div>;


  return (
    <div className='home-container'>
      <div className='home-hero'>
        <img src={hero} alt='hero' className='hero-img' />
        <img src={heroMobile} alt='hero-mobile' className='hero-img-mobile'/>
      </div>
      <div className='home-content'>
        <h1 className='home-title'>Bienvenido a la mejor tienda <span>para guitarristas</span></h1>      
        <h2 className='highlight-title'>Productos Destacados</h2>
        <div className='product-highlight'>
          <ProductHighlight 
            title='Guitarras'
            products={guitars}
            categoryId={guitarsCategory}
          />
        </div>          

        <div className='product-highlight'>
          <ProductHighlight 
            title='Amplificadores'
            products={amps}
            categoryId={amplifiersCategory}
          />
        </div>

        <div className='product-highlight'>
          <ProductHighlight 
            title='Accesorios'
            products={accessories}
            categoryId={accessoriesCategories}
          />
        </div>          

      </div>
    </div>
  );
}

export default HomePage;
