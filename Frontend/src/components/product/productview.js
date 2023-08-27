import React, {Component} from 'react';
import './productstyle.css';

export default class Product extends Component {
	render() {
		return (
			<div id='productContainer'>
				<div id='productImageContainer'>
					<img id='productImage' src={`http://localhost:5000/product/imageProductByID/${this.props.product._id}`} alt='Product'/>
				</div>
				<div id='productTitle'>
					<p>{this.props.product.name}</p>
				</div>
				<div id='productPrice'>
					<p>${this.props.product.price}</p>
				</div>
				<div id='productDescription'>
					<div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
				</div>
				<div>
					<button
						id='addToCartButton'
						onClick={() => this.props.addToCartHandler(this.props.product)}
					>
						Add To Cart
					</button>
				</div>
			</div>
		);
	}
}
