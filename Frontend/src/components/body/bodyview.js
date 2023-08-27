import React, { useEffect, useState } from 'react';
import './bodystyle.css';
import Product from '../product/productview';
import ProductSkeleton from '../skeleton/product/productskeletonview';
import {Button} from "reactstrap";
import axios from "axios";
import {useProductsContext} from "../product/contextProduct/ProductsProvider";
const Body = () => {
	const { products } = useProductsContext();






	const getBodyStyle = () => {
		return { marginLeft: '230px' };
	};

	const getBodyStyleClass = () => {
		return 'bodyContainer bodyContainerWithCart';
	};

	return (
		<div className={getBodyStyleClass()} style={getBodyStyle()}>
			<Button>Add Product </Button>
			<div id='body'>

				{  products.length > 0 ?
					products.map((product) => (
						<Product
							key={product.id}
							product={product}
							// addToCartHandler={addToCartHandler}
						/>


					))
					:
					<ProductSkeleton />
				}
			</div>


		</div>
	);
}

export default Body;
