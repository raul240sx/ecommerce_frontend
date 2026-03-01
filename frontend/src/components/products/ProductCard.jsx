import not_found from '../../assets/product_not_found.jpg'
import './ProductCard.css'

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

function ProductCard({ product }) {

  const priceFormatted = formatter.format(product.price);

  const displayImage = product.image || not_found;

  return(
    <div  className='product-card-container'>
      <div className='card-content'>
        <div className='card-top'>
          <img className='product-image' src={displayImage} alt={product.name} onError={(e) => {
            if (e.target.src !== not_found) {
              e.target.src = not_found;
            }
          }} />
        </div>
        <div className='card-bottom'>
          <h3 className='product-title'>{product.name}</h3>          
          <div>
            <h4>{priceFormatted}</h4>
            <p className='measure-unit'>{product.measure_unit.name}</p>
          </div>
          <div className='product-description'>
            <p>{product.description}</p>
          </div>
        </div>

      </div>
    </div>
  )

};

export default ProductCard;