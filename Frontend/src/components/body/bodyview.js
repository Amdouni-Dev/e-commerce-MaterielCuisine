import React, { useEffect, useState } from 'react';
import './bodystyle.css';
import Product from '../product/productview';
import ProductSkeleton from '../skeleton/product/productskeletonview';
import {Button} from "reactstrap";
import axios from "axios";
import {useProductsContext} from "../product/contextProduct/ProductsProvider";
const Body = ({isShowDetailsProduct,toggleDisplayDetailsProduct,toggleTest,isShowTest}) => {
	const { products } = useProductsContext();






	const getBodyStyle = () => {
		return { marginLeft: '230px' };
	};

	const getBodyStyleClass = () => {
		return 'bodyContainer bodyContainerWithCart';
	};

	return (
		<div className={getBodyStyleClass()} style={getBodyStyle()}>

			<div id='body'>

				{  products.length > 0 ?
					products.map((product) => (
						<Product
							key={product._id}
							product={product}
							// addToCartHandler={addToCartHandler}
							isShowDetailsProduct={isShowDetailsProduct}
							toggleDisplayDetailsProduct={toggleDisplayDetailsProduct}
							isShowTest={isShowTest}
							toggleTest={toggleTest}
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
