import React, { useEffect, useState } from 'react';
import './bodystyle.css';
import Product from '../product/productview';
import ProductSkeleton from '../skeleton/product/productskeletonview';
import {Button} from "reactstrap";
import axios from "axios";
import {useProductsContext} from "../product/contextProduct/ProductsProvider";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, changeQuantityPlus} from "../order/redux/cartSlice";
import CategoryDetail from "../category/CategoryDetail";
import {useParams} from "react-router-dom";
const Body = ({isShowDetailsProduct,toggleDisplayDetailsProduct,toggleTest,isShowTest}) => {





	const { products } = useProductsContext();
const dispatch=useDispatch()




	// const cart = useSelector((state) => state.cart);
	// const { cartItems } = cart;
	const getBodyStyle = () => {
		return { marginLeft: '230px' };
	};

	const getBodyStyleClass = () => {
		return 'bodyContainer bodyContainerWithCart';
	};
	// const cartTotalQuantity=useSelector( (state)=> state.cart.cartTotalQuantity)



	const updatedCart = useSelector( (state)=> state.cart.cartItems )

	const addToCartHandler = (product) => {
console.log("product Test Add to Cart")
		dispatch(addToCart(product));

		localStorage.setItem('cartItems', JSON.stringify(updatedCart));

// 		localStorage.setItem('cart', JSON.stringify(state.cart.cartItems));
// localStorage.setItem('cartTotalQuantity', JSON.stringify(state.cart.cartTotalQuantity));
// 		console.log('Cart added to cart', JSON.stringify(localStorage.getItem('cart')))
// 		console.log('Cart total quantity'+localStorage.getItem('cartTotalQuantity'))




	};



	const { categoryId } = useParams();

	// Your component logic here...

	return (

		<div className={getBodyStyleClass()}>

			<div id='body'>

				{  products.length > 0 ?
					products.map((product) => (
						<Product
							key={product._id}
							product={product}
							addToCartHandler={addToCartHandler}
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
export default Body
