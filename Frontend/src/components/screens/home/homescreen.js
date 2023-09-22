import React, { Component } from 'react';
import './homescreenstyle.css';
import Header from '../../header/Header';
import SideBar from '../../sidebar/sidebarview';
import Body from '../../body/bodyview';
import ShoppingCart from '../../shoppingcart/shoppingcartview';
import AddProduct from '../../product/addProduct';
import Addproduct from '../../../pages/Addproduct';
import ProductDetails from '../../product/ProductDetails';
import Test from '../../product/Test';
import { useSelector } from 'react-redux';
import CategoryDetail from '../../category/CategoryDetail';
import ProductSkeleton from '../../skeleton/product/productskeletonview';
import CatTest from '../../category/CatTest';
import { useLocation } from 'react-router-dom';
import Shipping from "../../order/Shipping";
import shipping from "../../order/Shipping";
import Checkout from "../../order/Checkout";
import CheckoutGuard from "../../order/CheckoutGuard";
import PlaceOrder from "../../order/PlaceOrder";
import OrderDetails from "../../order/orderDetails";
import MyOrders from "../../order/MyOrders"; // Importez useLocation

export default function HomeScreen() {
	const location = useLocation(); // Utilisez useLocation pour accéder à l'URL
	const { pathname } = location;
	const match = pathname.match(/\/Header\/c\/(\d+)/); // Utilisez une expression régulière pour extraire l'ID de l'URL
	const match2 = pathname.match(/\/Order\/(\d+)/);
	const match3 = pathname.match(/\/Orders\/(\d+)/);
	const ShowShippingComponent=pathname.includes('/Shipping')
	const ShowCheckoutComponent=pathname.includes('/Checkout')
	const ShowPlaceOrderComponent=pathname.includes('/PlaceOrder')
	console.log("******************Location ******************")
	console.log(location)


	/* affichage console location
	* {pathname: '/Header/c/64e867f6a03631654c9459f9', search: '', hash: '', state: null, key: '1454e4lo'}
	* */




	console.log("******************Location ******************")

	// match contiendra l'ID extrait s'il existe dans l'URL
	const categoryId = match ? match[1] : null;
	const orderId=match2 ? match2[1]:null;
	const userId=match3 ? match3[1]:null;

	// Reste de votre logique de composant
	const [selectedProduct, setSelectedProduct] = React.useState(null);
	const [isShowSidebar, setIsShowSidebar] = React.useState(true);
	const [isShowShoppingCart, setIsShowShoppingCart] = React.useState(false);
	const [isShowAddProduct, setIsShowAddProduct] = React.useState(false);
	const [isShowAddProduct2, setIsShowAddProduct2] = React.useState(false);
	const [isShowDetailsProduct, setIsShowDetailsProduct] = React.useState(false);
	const [isShowCatgoryDetails, setIsShowCatgoryDetails] = React.useState(false);
	const [isShowTest, setIsShowTest] = React.useState(false);

	const products = [
		{
			id: 1,
			name: 'Produit 1',
			price: 10.99,
		},
		{
			id: 2,
			name: 'Produit 2',
			price: 19.99,
		},
		// Ajoutez d'autres produits ici
	];

	const cart = {};
	const totalCartItem = Object.values(cart).length;

	const toggleSidebar = () => {
		setIsShowSidebar(!isShowSidebar);
	};

	const toggleShoppingCart = () => {
		setIsShowShoppingCart(!isShowShoppingCart);
	};

	const toggleShowCategoryDetails = () => {
		setIsShowCatgoryDetails(!isShowCatgoryDetails);
	};

	const toggleAddProduct = () => {
		setIsShowAddProduct(!isShowAddProduct);
	};

	const toggleAddProduct2 = () => {
		setIsShowAddProduct2(!isShowAddProduct2);
	};

	const toggleDisplayDetailsProduct = (product) => {
		setSelectedProduct(product);
		setIsShowDetailsProduct(!isShowDetailsProduct);
	};

	const toggleTest = () => {
		setIsShowTest(!isShowTest);
	};

	const productSuccessHandler = (products) => {
		// Mettez à jour l'état des produits ici
	};

	const errorHandler = (error) => {
		console.error(error);
	};

	const getCategoryId = () => {
		return categoryId;
	};

	const getProductEndpoint = (searchKeyword) => {
		let endPoint = ''; // Remplacez par votre endpoint
		if (searchKeyword) {
			return endPoint + '?' + searchKeyword;
		}
		if (categoryId) {
			return endPoint + '?' + categoryId;
		}
		return endPoint;
	};

	const fetchProducts = (searchKeyword = null) => {
		// Appelez votre API ici pour récupérer les produits
		// Utilisez productSuccessHandler pour mettre à jour l'état des produits
	};

	React.useEffect(() => {
		fetchProducts();
	}, [categoryId]);

	const productSearchHandler = (searchKeyword) => {
		fetchProducts(searchKeyword);
	};

	const getTotalCartItem = () => {
		return totalCartItem;
	};

	const setProductQuantityToCart = (productId, quantity) => {
		// Mettez à jour la quantité du produit dans le panier
	};

	const productRemoveHandler = (productId) => {
		// Supprimez le produit du panier
	};

	const getBodyStyle = () => {
		return { marginLeft: '230px' };
	};

	const getBodyStyleClass = () => {
		return 'bodyContainer bodyContainerWithCart';
	};

	console.log('gooooooooooooooooooooood mouna');
	console.log(localStorage.getItem('jwtToken'));
const 	addToCartHandler = (product) => {
		let cart = this.state.cart;
		cart[product.id] = {product: product, quantity: 1};
		// this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});

	}
	return (
		<React.Fragment>
			<Header
				toggleSidebar={toggleSidebar}
				toggleShoppingCart={toggleShoppingCart}
				totalCartItem={totalCartItem}
				productSearchHandler={productSearchHandler}
				toggleAddProduct={toggleAddProduct}
				toggleAddProduct2={toggleAddProduct2}
				toggleShowCategoryDetails={toggleShowCategoryDetails}
			/>
			<div id="bodyContainer">
				<SideBar
					isShowSidebar={isShowSidebar}
					productSearchHandler={productSearchHandler}
					toggleShowCategoryDetails={toggleShowCategoryDetails}
				/>
				<body>
				<div className={getBodyStyleClass()} style={getBodyStyle()}>


					<div id="body">

						{userId?(

							<MyOrders/>

						) :(
							<>


						{orderId ?(
							<OrderDetails/>

						):(<>



						{ShowPlaceOrderComponent ?(
							<PlaceOrder/>
						):(
						<>

						{ShowCheckoutComponent ?(
							<>

							<CheckoutGuard/>
							</>
							):


							(
								<>

						{ShowShippingComponent   ?
							(
								<>
							<Shipping/>
								</>):





							(<>
						{categoryId ? (



							// Render CatTest component when id is present in the URL
							<CategoryDetail

								isShowDetailsProduct={isShowDetailsProduct}
								// isShowCatgoryDetails={this.state.isShowCatgoryDetails}
								// isShowCategoryDetails={isShowCategoryDetails}
								toggleDisplayDetailsProduct={toggleDisplayDetailsProduct}
							/>

						) : (
							// Render CategoryDetail component when id is not present in the URL


							<Body
							products={products}
							// addToCartHandler={addToCartHandler}
							isShowSidebar={isShowSidebar}
							isShowShoppingCart={isShowShoppingCart}
							// isShowAddProduct={this.state.isShowAddProduct}
							// isShowAddProduct2={this.state.isShowAddProduct2}
							isShowDetailsProduct={isShowDetailsProduct}
							// isShowCatgoryDetails={this.state.isShowCatgoryDetails}
							// isShowCategoryDetails={isShowCategoryDetails}
							toggleDisplayDetailsProduct={toggleDisplayDetailsProduct}
							isShowTest={isShowTest}
							toggleTest={toggleTest}

							/>
						)}

						</>)}</>)
						}</>)}</>) }</>

						) }
					</div>
				</div>
				</body>
				<ShoppingCart
					isShowShoppingCart={isShowShoppingCart}
					cart={cart}
					products={products}
					setProductQuantityToCart={setProductQuantityToCart}
					productRemoveHandler={productRemoveHandler}
				/>
				<AddProduct isShowAddProduct={isShowAddProduct} />
				<Addproduct isShowAddProduct2={isShowAddProduct2} />
				<ProductDetails
					isShowDetailsProduct={isShowDetailsProduct}
					selectedProduct={selectedProduct}
				/>
				{/*<CategoryDetail isShowCatgoryDetails={isShowCatgoryDetails} />*/}
				{/*<Test isShowTest={isShowTest} />*/}
			</div>
		</React.Fragment>
	);
}



// import React, {Component} from 'react';
// import './homescreenstyle.css';
// import Header from '../../header/Header'
// import SideBar from '../../sidebar/sidebarview';
// import Body from '../../body/bodyview';
// import ShoppingCart from '../../shoppingcart/shoppingcartview';
// import AddProduct from "../../product/addProduct";
// import Addproduct from "../../../pages/Addproduct";
// import ProductDetails from "../../product/ProductDetails";
// import Test from "../../product/Test";
// import {useSelector} from "react-redux";
// import CategoryDetail from "../../category/CategoryDetail";
// import ProductSkeleton from "../../skeleton/product/productskeletonview";
// import CatTest from "../../category/CatTest";
// // import ApiConnector from '../../api/apiconnector';
// // import ApiEndpoints from '../../api/apiendpoints';
// // import QueryParam from '../../api/apiqueryparams';
//
// export default class HomeScreen extends Component {
//
//
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selectedProduct:null,
// 			isShowSidebar: true,
// 			isShowShoppingCart: false,
// 			isShowAddProduct:false,
// 			isShowAddProduct2:false,
// 			isShowDetailsProduct:false,
// 			isShowCatgoryDetails:false,
// 			isShowTest:false,
// 			products: [
// 				// Définir vos données statiques ici
// 				{
// 					id: 1,
// 					name: 'Produit 1',
// 					price: 10.99,
// 					// Autres détails du produit
// 				},
// 				{
// 					id: 2,
// 					name: 'Produit 2',
// 					price: 19.99,
// 					// Autres détails du produit
// 				},
// 				// Ajoutez d'autres produits ici
// 			],
// 			cart: {},
// 			totalCartItem: 0,
// 		};
// 	}
//
// 	toggleSidebar = () => {
// 		this.setState({isShowSidebar: !this.state.isShowSidebar});
// 	}
//
// 	toggleShoppingCart = () => {
// 		this.setState({isShowShoppingCart: !this.state.isShowShoppingCart});
// 	}
// 	toggleShowCategoryDetails=()=>{
// 		console.log("ntasty fi categories Details ")
// 		// this.setState({isShowCategoryDetails: !this.state.isShowCategoryDetails	})
// 		console.log(this.state.isShowCatgoryDetails)
// 		this.setState({isShowCatgoryDetails: !this.state.isShowCatgoryDetails});
//
// 		console.log(this.state.isShowCatgoryDetails)
//
// 	}
//
//
// 	toggleAddProduct = () => {
// 		console.log("good 1")
// 		this.setState({isShowAddProduct: !this.state.isShowAddProduct});
// 	}
// 	toggleAddProduct2 = () => {
// 		console.log("good 1000000");
// 		this.setState(prevState => ({
// 			isShowAddProduct2: !prevState.isShowAddProduct2
// 		}));
// 	}
// 	toggleDisplayDetailsProduct= (product) => {
// console.log("toggleDisplayDetailsProduct")
// console.log(product.name)
// 		console.log("toggleDisplayDetailsProduct")
//
// 		this.setState(prevState => ({
// 			isShowDetailsProduct: !prevState.isShowDetailsProduct,
// 			selectedProduct :product
// 		}));
// 	}
// toggleTest=()=>{
// 		console.log("Toggle test")
// 	console.log(this.state.isShowTest)
// 	console.log("Toggle test")
//
// 		//toggle test nesta3mlha bech juste nbaddel l'etat mte3 is showtest
// 		this.setState(prevState => ({
// 			isShowTest: !prevState.isShowTest
// 		}))
// }
// 	productSuccessHandler = (products) => {
// 		this.setState({products: products});
// 	}
//
// 	erorHandler = (error) => {console.error(error)} //TODO:show error right below of header
//
// 	getCategoryId = (props) => {
// 		return props.match ? props.match.params.categoryId : null;
// 	}
//
// 	getProductEndpoint = (searchKeyword) => {
// 		let categoryId = this.getCategoryId(this.props);
// 		// let endPoint = ApiEndpoints.PRODUCT_URL;
// 		// if (searchKeyword) {
// 		// 	return endPoint + '?'+ QueryParam.SEARCH + '=' + searchKeyword;
// 		// }
// 		// if (categoryId) {
// 		// 	return endPoint + '?'+ QueryParam.CATEGORY_ID + '=' + categoryId;
// 		// }
// 		// return endPoint;
// 	}
//
// 	fetchProducts = (searchKeyword=null) => {
// 		// ApiConnector.sendRequest(
// 		// 	this.getProductEndpoint(searchKeyword),
// 		// 	this.productSuccessHandler,
// 		// 	this.erorHandler
// 		// );
// 	}
//
// 	componentDidUpdate(prevProps) {
// 		let catId = this.getCategoryId(this.props);
// 		let prevCatId = this.getCategoryId(prevProps);
// 		if (catId !== prevCatId) {
// 			this.fetchProducts();
// 		}
// 	}
//
// 	componentDidMount() {
// 		this.fetchProducts();
// 	}
//
// 	productSearchHandler = (searchKeyword) => {
// 		this.fetchProducts(searchKeyword);
// 	}
//
// 	getTotalCartItem = () => {
// 		return Object.values(this.state.cart).length;
// 	}
//
// 	// addToCartHandler = (product) => {
// 	// 	let cart = this.state.cart;
// 	// 	cart[product.id] = {product: product, quantity: 1};
// 	// 	this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
// 	//
// 	// }
//
//
//
//
// 	setProductQuantityToCart = (productId, quantity) => {
//
// 		console.log("taw fel cart quantity change !!!!")
// 		let cart = this.state.cart;
// 		cart[productId].quantity = quantity;
// 		this.setState({cart: cart});
// 	}
//
// 	productRemoveHandler = (productId) => {
// 		let cart = this.state.cart;
// 		delete cart[productId];
// 		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
// 	}
// 	 getBodyStyle = () => {
// 		return { marginLeft: '230px' };
// 	};
//
// 	 getBodyStyleClass = () => {
// 		return 'bodyContainer bodyContainerWithCart';
// 	};
// 	render() {
// 		console.log("gooooooooooooooooooooood mouna")
// 		console.log(localStorage.getItem('jwtToken'))
// 		return (
// 			<React.Fragment>
// 				<Header
// 					toggleSidebar={this.toggleSidebar}
// 					toggleShoppingCart={this.toggleShoppingCart}
// 					totalCartItem={this.state.totalCartItem}
// 					productSearchHandler={this.productSearchHandler}
// 					toggleAddProduct={this.toggleAddProduct}
// 					toggleAddProduct2={this.toggleAddProduct2}
// 					toggleShowCategoryDetails={this.toggleShowCategoryDetails}
//
// 					// toggleDisplayDetailsProduct={this.toggleDisplayDetailsProduct}
// 				/>
// 				<div id='bodyContainer'>
// 					<SideBar
// 						isShowSidebar={this.state.isShowSidebar}
// 						productSearchHandler={this.productSearchHandler}
// 						toggleShowCategoryDetails={this.toggleShowCategoryDetails}
// 					/>
// <body>
// <div className={this.getBodyStyleClass()} style={this.getBodyStyle()}>
// 	<div id='body'>
// 		{match.params.id ? (
// 			// Render CatTest component when id is present in the URL
// 			<CatTest />
// 		) : (
// 			// Render CategoryDetail component when id is not present in the URL
// 			<CategoryDetail />
// 		)}
// 	</div>
// </div>
//
// </body>
// 					{/*<Body*/}
// 					{/*	products={this.state.products}*/}
// 					{/*	addToCartHandler={this.state.addToCartHandler}*/}
// 					{/*	isShowSidebar={this.state.isShowSidebar}*/}
// 					{/*	isShowShoppingCart={this.state.isShowShoppingCart}*/}
// 					{/*	// isShowAddProduct={this.state.isShowAddProduct}*/}
// 					{/*	// isShowAddProduct2={this.state.isShowAddProduct2}*/}
// 					{/*	 isShowDetailsProduct={this.state.isShowDetailsProduct}*/}
// 					{/*	// isShowCatgoryDetails={this.state.isShowCatgoryDetails}*/}
// 					{/*	isShowCategoryDetails={this.state.isShowCategoryDetails}*/}
// 					{/*	toggleDisplayDetailsProduct={this.toggleDisplayDetailsProduct}*/}
// 					{/*	isShowTest={this.state.isShowTest}*/}
// 					{/*	toggleTest={this.toggleTest}*/}
//
// 					{/*/>*/}
//
// 					<ShoppingCart
// 						isShowShoppingCart={this.state.isShowShoppingCart}
// 						cart={this.state.cart}
// 						products={this.state.products}
// 						setProductQuantityToCart={this.setProductQuantityToCart}
// 						productRemoveHandler={this.productRemoveHandler}
// 					/>
// 					<AddProduct
// 						isShowAddProduct={this.state.isShowAddProduct}
//
// 					/>
// <Addproduct  isShowAddProduct2={this.state.isShowAddProduct2} />
//
//
//
//
// 					<ProductDetails isShowDetailsProduct={this.state.isShowDetailsProduct} selectedProduct={this.state.selectedProduct}  />
//
// <CategoryDetail isShowCatgoryDetails={this.state.isShowCatgoryDetails} />
//
//
// {/*<Test  isShowTest={this.state.isShowTest} />*/}
// 				</div>
// 			</React.Fragment>
// 		);
// 	}
// }
