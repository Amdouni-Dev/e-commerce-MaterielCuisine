import React, {useEffect, useState} from 'react';
import './shoppingcartstyle.css';
import CartProduct from './cartproduct/cartproductview';
import {useDispatch, useSelector} from "react-redux";
import {changeQuantityPlus, changeQuantityMoins, removeProduct} from "../order/redux/cartSlice";
import {useNavigate} from "react-router-dom";

function ShoppingCart(props) {

const dispatch =useDispatch()
	const changeQuantityMore=(product)=>{
		console.log("changeQuantityMore called with product")
		dispatch(changeQuantityPlus(product))
	}
	const changeQuantityMoins1=(product)=>{
		console.log("changeQuantityMore called with product")
		dispatch(changeQuantityMoins(product))
	}

const removeProduct2=(product)=>{
	dispatch(removeProduct(product))
}




	const getCartStyle = () => {
		return props.isShowShoppingCart ? { right: '0px' } : {};
	};
	const stateCart= JSON.stringify( useSelector(  (state)=>  state.cart.cartItems))
const stateAmount=useSelector((state)=> state.cart.cartAmount)
	const [cart3,setCart3]=useState([])
const [amount,setAmount]=useState(0)
	// const [loc,setLoc]=useState([])
	useEffect (  ()=>{
		console.log("cv mouch barcha !!")
		console.log(stateCart)
		setCart3( JSON.parse( stateCart))
		setAmount(stateAmount)

		// localStorage.setItem("newCart", JSON.stringify(...cart3));
	} ,[stateCart])
	// useEffect(() => {
	// 	if (cart3 !== null) {
	// 		localStorage.setItem("newCart", JSON.stringify(cart3)); // Assurez-vous de convertir cart3 en chaîne JSON
	// 		console.log("message local storage de new Cart");
	// 		console.log(localStorage.getItem("newCart"));
	// 		setLoc()
	//
	// 	}
	// }, [cart3]);
	const renderEmptyCart = () => {
		return (
			<div id='emptyCart'>
				<i id='shoppingBagIcon' className='fa fa-shopping-basket'></i>
				<p id='emptyCartText'>Empty Cart</p>
			</div>
		);
	};

	const generateCart = () => {
		console.log("Hi Mouna cv ?");
if(cart3.length > 0){
		return cart3.map((cartItem, index) => (
			<div key={index}>
				<CartProduct
					product={cartItem}
					 // quantity={cartItem[index].quantity}
					removeProduct2={removeProduct2}

					setProductQuantityToCartMoins={changeQuantityMoins1}

					setProductQuantityToCartPlus={changeQuantityMore}
				/>
			</div>
		));
}
else {
	return renderEmptyCart()
}
	};







		const getTotalOrderPrice = () => {
		let price = 0;
		const cart = props.cart;

		Object.keys(cart).forEach((index) => {
			price += cart[index].product.price * cart[index].quantity;
		});

		return price;
	};



const navigate=useNavigate()

	const handleShippingClick = (categoryId) => {
		// Incorporer l'ID de la catégorie dans le chemin de l'URL
		// Cela déclenchera également le changement d'affichage du composant CategoryDetail
		navigate(`/Shipping`);
		// Par exemple, si vous utilisez '/c/:categoryId' comme chemin, vous pouvez le faire comme suit :
	}

	return (
		<div id='cartContainer' style={getCartStyle()}>
			<div id='cart'>{generateCart()}</div>
			<div id='orderButtonContainer'>
				<div id='orderButton'>
					<div id='placeOrder'  onClick={handleShippingClick} >Checkout</div>
					<div id='orderPrice'>{amount} DT </div>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;





































// import React, { Component } from 'react';
// import './shoppingcartstyle.css';
// import CartProduct from './cartproduct/cartproductview';
// import {useSelector} from "react-redux";
//
// export default class ShoppingCart extends Component {
// 	state = {
// 		cartItems: [], // Utilisez l'état local pour stocker le panier
// 	};
//
// 	// componentDidMount() {
// 	// 	// Chargez le panier depuis le stockage local lors du montage initial
// 	// 	const cartData = localStorage.getItem('carta2');
// 	// 	if (cartData !== null && cartData !== undefined) {
// 	// 		const cart = JSON.parse(cartData);
// 	// 		this.setState({ cartItems: Object.values(cart) });
// 	// 	}
// 	// }
//
// 	// componentDidUpdate(prevProps) {
// 	// 	// Mettez à jour le panier lorsque les propriétés changent (par exemple, lors de l'ajout d'un produit)
// 	// 	if (prevProps.cartData !== this.props.cartData) {
// 	// 		this.updateCart();
// 	// 	}
// 	// }
//
// 	updateCart = () => {
// 		const cartData = localStorage.getItem('carta2');
// 		if (cartData !== null && cartData !== undefined) {
// 			const cart = JSON.parse(cartData);
// 			this.setState({ cartItems: Object.values(cart) });
// 		}
// 	};
//
// 	getCartStyle = () => {
// 		return this.props.isShowShoppingCart ? { right: '0px' } : {};
// 	};
//
// 	renderEmptyCart = () => {
// 		return (
// 			<div id='emptyCart'>
// 				<i id='shoppingBagIcon' className='fa fa-shopping-basket'></i>
// 				<h1>HHHHHHH</h1>
// 				<p id='emptyCartText'>Empty Cart</p>
// 			</div>
// 		);
// 	};
//
// 	renderCartItems = () => {
//
// 		const carte=useSelector( (state)=>state.cartItems )
//
// 		return this.state.cartItems.map((cartItem, index) => (
// 			<div key={index}>
// 				<CartProduct
// 					product={cartItem}
// 					quantity={cartItem.quantity}
// 					// productRemoveHandler={this.props.productRemoveHandler}
// 					// setProductQuantityToCart={this.props.setProductQuantityToCart}
// 				/>
// 			</div>
// 		));
// 	};
//
// 	render() {
// 		return (
// 			<div id='cartContainer' style={this.getCartStyle()}>
// 				<div id='cart'>{this.state.cartItems.length > 0 ? this.renderCartItems() : this.renderEmptyCart()}</div>
// 				<div id='orderButtonContainer'>
// 					<div id='orderButton'>
// 						<div id='placeOrder'>Place Order</div>
// 						{/*<div id='orderPrice'>${this.getTotalOrderPrice()}</div>*/}
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

//
// import React, {Component} from 'react';
// import './shoppingcartstyle.css';
// import CartProduct from './cartproduct/cartproductview';
//
// export default class ShoppingCart extends Component {
// 	getCartStyle = () => {
// 		return this.props.isShowShoppingCart ? {right: '0px'} : {};
// 	}
//
// 	renderEmptyCart = () => {
// 		return(
// 			<div id='emptyCart'>
// 				<i
// 					id='shoppingBagIcon'
// 					className='fa fa-shopping-basket'
// 				></i>
// 				<p id='emptyCartText'>Empty Cart</p>
// 			</div>
// 		);
// 	}
//
// 	generateCart = () => {
// 		let cart = this.props.cart;
// 		let cartItems = [];
// 		for (let index in cart) {
// 			cartItems.push(
// 				<div key={index}>
// 					<CartProduct
// 						product={cart[index].product}
// 						quantity={cart[index].quantity}
// 						productRemoveHandler={this.props.productRemoveHandler}
// 						setProductQuantityToCart={this.props.setProductQuantityToCart}
// 					/>
// 				</div>
// 			);
// 		}
// 		if (cartItems.length > 0) {
// 			return cartItems;
// 		}
// 		return this.renderEmptyCart();
// 	}
//
// 	getTotalOrderPrice = () => {
// 		let price = 0;
// 		let cart = this.props.cart;
// 		for (let index in cart) {
// 			price += cart[index].product.price * cart[index].quantity;
// 		}
// 		return price;
// 	}
//
// 	render() {
// 		return (
// 			<div id='cartContainer' style={this.getCartStyle()}>
// 				<div id='cart'>
// 					{this.generateCart()}
// 				</div>
// 				<div id='orderButtonContainer'>
// 					<div id='orderButton'>
// 						<div id='placeOrder'>Place Order</div>
// 						<div id='orderPrice'>${this.getTotalOrderPrice()}</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
