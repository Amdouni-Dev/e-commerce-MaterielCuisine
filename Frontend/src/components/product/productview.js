import React, {Component} from 'react';
import './productstyle.css';

export default class Product extends Component {



	handleClick = () => {

		console.log("Mounaaaaaaaaaaaaaaaaaaaaaa")


		this.props.toggleDisplayDetailsProduct(this.props.product);
};
	dispalyNameTest=(product)=>{
		console.log("TestFunction")
console.log(product.name)
		console.log("TestFunction")

	}

	testclick=()=>{
		this.props.toggleTest(this.props.product)
	}

	render() {
		return (
			<div id='productContainer'>




				<div id='productImageContainer'>


					<img id='productImage'
						 // onClick={this.handleClick}
						 onClick={this.handleClick}
						 src={`http://localhost:5000/product/imageProductByID/${this.props.product._id}`} alt='Product'/>
				</div>
				{/*<button onClick={ ()=>{this.dispalyNameTest(this.props.product)} } >Test</button>*/}
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



					{/*<button onClick={() => this.props.addToCartHandler(this.props.product)}>Add to Cart Vrai </button>*/}

					{/*<button*/}

					{/*onClick={this.handleClick}*/}
					{/*>Details</button>*/}

					{/*<button  onClick={this.testclick} >test</button>*/}

				</div>
			</div>
		);
	}
}
