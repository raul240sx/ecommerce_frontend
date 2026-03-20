import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons';
import './ProductHighlight.css'

function ProductHighlight({ title, products, categoryId }) {
  const [ currentIndex, setCurrentIndex ] = useState(0);
	const [ isMobile, setIsMobile ] = useState(window.innerWidth <= 768);



	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);

	},[products.length])


	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prev => 
			(prev === products.length -1)? 0 : (prev + 1)
			);
			}, 4000)

		return () => {
			clearInterval(interval)
		}
	},[products.length])

	const handleNextCard = () => {
		setCurrentIndex(prev => 
			(prev === products.length - 1)? 0 : (prev + 1)
		);
	}

	const handlePrevCard = () => {
		setCurrentIndex(prev =>
			(prev === 0)? (products.length - 1) : (prev - 1)
		)
	}

	if (!products || products.length === 0) {
  return null;
	}

	return(
		<div className='highlight-container'>
			<div>

			</div>
			<div className='highlight-title-category'>
				<h2>{title}</h2>
				<Link to={`/products/categories/${categoryId}`} className='view-categorie-btn' >Ver más</Link>
			</div>
			
			{
				isMobile?(
					<div className='mobile-carrousel'>
						<div className='carrousel-card'>
							<ProductCard product={products[currentIndex]} />
						
							<button className='carr-btn prev' onClick={handlePrevCard}><ArrowLeftIcon/></button>
							<button className='carr-btn next' onClick={handleNextCard}><ArrowRightIcon/></button>
						</div>
					</div>
				) : (
					<div className='desktop-products'>
						{products.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)
			}

		</div>
		
	)

};

export default ProductHighlight;