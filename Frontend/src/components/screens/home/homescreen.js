import React, {Component} from 'react';
import './homescreenstyle.css';
import Header from '../../header/Header'
import SideBar from '../../sidebar/sidebarview';
import Body from '../../body/bodyview';
import ShoppingCart from '../../shoppingcart/shoppingcartview';
import AddProduct from "../../product/addProduct";
import Addproduct from "../../../pages/Addproduct";
import ProductDetails from "../../product/ProductDetails";
import Test from "../../product/Test";
// import ApiConnector from '../../api/apiconnector';
// import ApiEndpoints from '../../api/apiendpoints';
// import QueryParam from '../../api/apiqueryparams';

export default class HomeScreen extends Component {



	constructor(props) {
		super(props);
		this.state = {
			selectedProduct:null,
			isShowSidebar: true,
			isShowShoppingCart: false,
			isShowAddProduct:false,
			isShowAddProduct2:false,
			isShowDetailsProduct:false,
			isShowTest:false,
			products: [
				// Définir vos données statiques ici
				{
					id: 1,
					name: 'Produit 1',
					price: 10.99,
					// Autres détails du produit
				},
				{
					id: 2,
					name: 'Produit 2',
					price: 19.99,
					// Autres détails du produit
				},
				// Ajoutez d'autres produits ici
			],
			cart: {},
			totalCartItem: 0,
		};
	}

	toggleSidebar = () => {
		this.setState({isShowSidebar: !this.state.isShowSidebar});
	}

	toggleShoppingCart = () => {
		this.setState({isShowShoppingCart: !this.state.isShowShoppingCart});
	}


	toggleAddProduct = () => {
		console.log("good 1")
		this.setState({isShowAddProduct: !this.state.isShowAddProduct});
	}
	toggleAddProduct2 = () => {
		console.log("good 1000000");
		this.setState(prevState => ({
			isShowAddProduct2: !prevState.isShowAddProduct2
		}));
	}
	toggleDisplayDetailsProduct= (product) => {
console.log("toggleDisplayDetailsProduct")
console.log(product.name)
		console.log("toggleDisplayDetailsProduct")

		this.setState(prevState => ({
			isShowDetailsProduct: !prevState.isShowDetailsProduct,
			selectedProduct :product
		}));
	}
toggleTest=()=>{
		console.log("Toggle test")
	console.log(this.state.isShowTest)
	console.log("Toggle test")

		//toggle test nesta3mlha bech juste nbaddel l'etat mte3 is showtest
		this.setState(prevState => ({
			isShowTest: !prevState.isShowTest
		}))
}
	productSuccessHandler = (products) => {
		this.setState({products: products});
	}

	erorHandler = (error) => {console.error(error)} //TODO:show error right below of header

	getCategoryId = (props) => {
		return props.match ? props.match.params.categoryId : null;
	}

	getProductEndpoint = (searchKeyword) => {
		let categoryId = this.getCategoryId(this.props);
		// let endPoint = ApiEndpoints.PRODUCT_URL;
		// if (searchKeyword) {
		// 	return endPoint + '?'+ QueryParam.SEARCH + '=' + searchKeyword;
		// }
		// if (categoryId) {
		// 	return endPoint + '?'+ QueryParam.CATEGORY_ID + '=' + categoryId;
		// }
		// return endPoint;
	}

	fetchProducts = (searchKeyword=null) => {
		// ApiConnector.sendRequest(
		// 	this.getProductEndpoint(searchKeyword),
		// 	this.productSuccessHandler,
		// 	this.erorHandler
		// );
	}

	componentDidUpdate(prevProps) {
		let catId = this.getCategoryId(this.props);
		let prevCatId = this.getCategoryId(prevProps);
		if (catId !== prevCatId) {
			this.fetchProducts();
		}
	}

	componentDidMount() {
		this.fetchProducts();
	}

	productSearchHandler = (searchKeyword) => {
		this.fetchProducts(searchKeyword);
	}

	getTotalCartItem = () => {
		return Object.values(this.state.cart).length;
	}

	addToCartHandler = (product) => {
		let cart = this.state.cart;
		cart[product.id] = {product: product, quantity: 1};
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
	}





	setProductQuantityToCart = (productId, quantity) => {
		let cart = this.state.cart;
		cart[productId].quantity = quantity;
		this.setState({cart: cart});
	}

	productRemoveHandler = (productId) => {
		let cart = this.state.cart;
		delete cart[productId];
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
	}

	render() {
		console.log("gooooooooooooooooooooood mouna")
		console.log(localStorage.getItem('jwtToken'))
		return (
			<React.Fragment>
				<Header
					toggleSidebar={this.toggleSidebar}
					toggleShoppingCart={this.toggleShoppingCart}
					totalCartItem={this.state.totalCartItem}
					productSearchHandler={this.productSearchHandler}
					toggleAddProduct={this.toggleAddProduct}
					toggleAddProduct2={this.toggleAddProduct2}
					// toggleDisplayDetailsProduct={this.toggleDisplayDetailsProduct}
				/>
				<div id='bodyContainer'>
					<SideBar
						isShowSidebar={this.state.isShowSidebar}
						productSearchHandler={this.productSearchHandler}
					/>
					<Body
						products={this.state.products}
						addToCartHandler={this.state.addToCartHandler}
						isShowSidebar={this.state.isShowSidebar}
						isShowShoppingCart={this.state.isShowShoppingCart}
						// isShowAddProduct={this.state.isShowAddProduct}
						// isShowAddProduct2={this.state.isShowAddProduct2}
						 isShowDetailsProduct={this.state.isShowDetailsProduct}
						toggleDisplayDetailsProduct={this.toggleDisplayDetailsProduct}
						isShowTest={this.state.isShowTest}
						toggleTest={this.toggleTest}

					/>
					<ShoppingCart
						isShowShoppingCart={this.state.isShowShoppingCart}
						cart={this.state.cart}
						products={this.state.products}
						setProductQuantityToCart={this.setProductQuantityToCart}
						productRemoveHandler={this.productRemoveHandler}
					/>
					<AddProduct
						isShowAddProduct={this.state.isShowAddProduct}

					/>
<Addproduct  isShowAddProduct2={this.state.isShowAddProduct2} />
					<ProductDetails isShowDetailsProduct={this.state.isShowDetailsProduct} selectedProduct={this.state.selectedProduct}  />



{/*<Test  isShowTest={this.state.isShowTest} />*/}
				</div>
			</React.Fragment>
		);
	}
}
