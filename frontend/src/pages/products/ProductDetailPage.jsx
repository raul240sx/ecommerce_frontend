import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import notFoundImg from '../../assets/product_not_found.jpg'
import './ProductDetailPage.css'



const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function ProductDetailPage () {
  const { id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ product, setProduct ] = useState(null);
  const [ image, setImage ] = useState(notFoundImg);
  const [ price, setPrice ] = useState(0)

  useEffect(() => {
    
    const getItem = async () => {
      try {
        const response = await api.get(`products-api/products/${id}`);
        setProduct(response.data);
        setImage(response.data.image);
        setLoading(false);
        setPrice(formatter.format(response.data.price));
        console.log(response.data);

      } catch (error) {
        if (error.response) {
          console.log('Error del backend: ', error.response);
          console.log('Codigo del error: ', error.response.status);
        }
        else {
          console.log('Error de conexion con el backend', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getItem();

  }, [])

  
  return(
    loading? (
      <div>
        <p>cargando producto</p>
      </div>
    ) : (
      <div className='product-detail-container'>
        <div className='detail-content'>
          <div className='detail-left-part'>
            <img className='detail-image' src={image} alt={product.name} />
          </div>

          <div className='detail-right-part'>
            <div className='product-info' >
              <h2>{product.name}</h2>
              <div className='product-description'>
                <h3>Descripción del producto</h3>
                  <p>{product.description}</p>
              </div>
              <div className='price-stock'>
                <h2>{price}</h2>
                <p className='stock-info'>Stock: {product.stock}</p>
              </div>
            </div>
            <div className='buy-buttons'>
              <button className='detail-button'>Comprar Ahora</button>
              <button className='detail-button'>Agregar al carro</button>
            </div>
          </div>
        </div>
      </div>
    )

  )

};

export default ProductDetailPage;