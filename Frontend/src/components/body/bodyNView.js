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
const BodyNView = ({isShowDetailsProduct,toggleDisplayDetailsProduct,toggleTest,isShowTest}) => {
    const [connectedUser,setConnectedUser] = useState(null);
    const FToken=    async  ()=> {



        const token = localStorage.getItem('jwtToken');
        localStorage.setItem('jwtToken', token);
        if (!token) {
            alert("Vous devez être connecté pour créer un produit.");
            return;
        }

        setConnectedUser(localStorage.getItem('connectedUser'));
        // Extract the user ID from the payload


    }



    const [nearP,setNearP]=useState([])
    useEffect(() => {
        FToken()
        let id=localStorage.getItem('connectedUser');
        // Remplacez 'userId' par l'ID de l'utilisateur dont vous souhaitez récupérer les utilisateurs proches.
        // Exemple d'ID utilisateur
        axios.get(`http://127.0.0.1:1000/users/otherUsers/${id}`)
            .then((response) => {
                setNearP(response.data.nearby_users);
                console.log("neaaaaaaaaaaaaar")
                console.log(nearP)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données : ', error);
            });

    },[connectedUser])

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
            <h1>near users</h1>

            <div id='body'>
                {nearP.map((user) => (
                    <li key={user._id}>
                        {/*<h2>{user.name}</h2>*/}
                        <ul>
                            {user.products.map((product) => (
                                <Product
                                    key={product._id.$oid}
                                    product2={product}
                                    addToCartHandler={addToCartHandler}
                                    isShowDetailsProduct={isShowDetailsProduct}
                                    toggleDisplayDetailsProduct={toggleDisplayDetailsProduct}
                                    isShowTest={isShowTest}
                                    toggleTest={toggleTest}
                                    userName={user.name}

                                />
                            ))}
                        </ul>
                    </li>
                ))}
            </div>


        </div>
    );
}
export default BodyNView
