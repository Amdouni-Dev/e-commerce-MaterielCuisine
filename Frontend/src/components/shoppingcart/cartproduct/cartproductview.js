import React, {Component} from 'react';
import './cartproductstyle.css';

export default class CartProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,

		};
	}

	quantityChangeHandler = (event) => {
		let quantity = parseInt(event.target.value);
		if (quantity > 0) {
			this.setState({quantity: quantity});
			this.props.setProductQuantityToCart(this.props.product._id, quantity);
		}
	}

	render() {


		return(


			<>
				<br/>
				<br/>
			<div id='cartProductContainer'>
				<br/>

				<div id='cartImgContainer'>
					<img id='cartImg' src={`http://localhost:5000/product/imageProductByID/${this.props.product._id}`} alt='cart product'/>
				</div>
				<div id='cartProductTitleAndPrice'>
					<p id='cartProductTitle'>{this.props.product.title}</p>
					<p id='cartProductPrice'>${this.props.product.price}</p>
				</div>
				<div id="quantityContainer">
					<input
						id='cartProductQuantity'
						type='number'
						value={this.props.product.quantity}
						onChange={this.quantityChangeHandler}
					/>
				</div>


				<div id="removeCartProduct">
					<span
						id='removeCartProductIcon'
						onClick={
							() => this.props.removeProduct2(this.props.product)
						}
					>
						<i className="fa fa-times"></i>
					</span>
				</div>
				<div id="removeCartProduct">
					<span
						id='removeCartProductIcon'
						onClick={
							() => this.props.setProductQuantityToCartPlus(this.props.product)
						}
					>
						<i className="fa fa-plus"></i>
					</span>
				</div>
				<div id="removeCartProduct">
					<span
						id='removeCartProductIcon'
						onClick={
							() => this.props.setProductQuantityToCartMoins(this.props.product)
						}
					>
						<i className="fa fa-minus"></i>
					</span>
				</div>
			</div></>
		);
	}
}
