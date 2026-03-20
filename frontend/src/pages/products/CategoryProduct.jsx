import { useParams, useSearchParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/products/ProductCard';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { handleScrollToTop } from '../../utils/ScrollUtils'
import './CategoryProduct.css';



const formatter = new Intl.NumberFormat( 'es-CL', {
		style: 'currency',
		currency: 'CLP'
	});


function CategoryProducts() {
	const { categoryId } = useParams();
	const [ categoryName, setCategoryName ] = useState(null);
	const [ searchParams, setSearchParams ] = useSearchParams();
	const currentPage = parseInt(searchParams.get('page')) || 1;
	const pageOffset = (currentPage - 1) * 9;
	const { products, loading, error, totalProducts } = useProducts({ category: categoryId, limit: 9, offset: pageOffset });
	
	


	useEffect(() => {
		const getCategoryName = async() => {
			try {
				const response = await api.get(`products-api/categories/${categoryId}/`)
				console.log('la categoria es:', response.data.name)
				setCategoryName(response.data.name)
			} catch (error) {
				console.error(error.response)
			}
		};
		getCategoryName()

	}, [categoryId])


	useEffect(() => {
		handleScrollToTop();
	}, [currentPage])

	const handlePaginationBtn = (pageNum) => {
		setSearchParams({ page: pageNum + 1 });
	};

	const handleBackForwPagination = (num) => {
		const maxPage = Math.ceil(totalProducts / 9);
		const newPage = Math.max(1, Math.min(maxPage, currentPage + num))
		setSearchParams({ page: newPage })
	}


  if (error) return <div>Hubo un error al cargar los productos.</div>;

	return (
		<div className='category-products-container'>
			<h1 className='category-title'>Categorías - {categoryName}</h1>
			<div className='category-products-content'>
				{loading?
				<div className='loading-section'>
					<p>Cargando productos...</p>
				</div> :
					<div className='product-list'>
						{products.map(product => (
						<ProductCard key={product.id} product={product}/>
						))}
					</div>
				}
			</div>
			<div className='pagination-section'>
				<button className='back-btn pagination-btn' onClick={() => handleBackForwPagination(-1)} disabled={currentPage === 1} >
					&lt;
				</button>
				{ Array.from({ length: (Math.ceil(totalProducts / 9))}).map((_, i) => (
					<button className={`pagination-btn ${currentPage === i + 1? 'current-page': ''}`} onClick={() => handlePaginationBtn(i)} key={i}>
						{i + 1}
					</button>
				))
				}
				<button className='forward-btn pagination-btn' onClick={() => handleBackForwPagination(1)} disabled={currentPage === Math.ceil(totalProducts / 9)} >
					&gt;
				</button>
			</div>
		</div>
	);

};

export default CategoryProducts;