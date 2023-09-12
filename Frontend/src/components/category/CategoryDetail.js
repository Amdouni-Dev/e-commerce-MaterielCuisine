import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import {Button} from "reactstrap";
import axios from "axios";
import Product from "../product/productview";
import ProductSkeleton from "../skeleton/product/productskeletonview";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../order/redux/cartSlice";

const CategoryDetail = ({isShowCatgoryDetails,isShowDetailsProduct,toggleDisplayDetailsProduct}) => {
const dispatch=useDispatch()
    const getAddProductStyle = () => {
        return isShowCatgoryDetails ? {right: '0px'} : {};
    };
    const {categoryId} = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const getBodyStyle = () => {
        return {marginLeft: '230px'};
    };

    const getBodyStyleClass = () => {
        return 'bodyContainer bodyContainerWithCart';
    };

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

    const fetchProductsBycategoryId = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/product/getProductsBycategory/${categoryId}`)
            setCategoryData(response.data)
        } catch (e) {
            toast.error(e.message)
        }
    }
    useEffect(() => {
        fetchProductsBycategoryId()


    }, [categoryId]);

    if (!categoryData) {
        return (
            <div>

                <h1>Chargement en cours ...</h1>
                <p>peut etre pas de produits encore avec ce type de categorie ! </p>


            </div>
        );
    }
    if (categoryData) {
        // Une fois que les données de la catégorie sont disponibles, vous pouvez les afficher
        return (
            <div className={getBodyStyleClass()}>

                <div id='body'>

                {/*<h1>Détails de la catégorie {categoryId}</h1>*/}
                {/* Affichez les détails de la catégorie à l'aide de categoryData */}


                {  categoryData.length > 0 ?
                    categoryData.map((product) => (
                        <Product
                            key={product._id}
                            product={product}
                            addToCartHandler={addToCartHandler}
                            isShowDetailsProduct={isShowDetailsProduct}
                            toggleDisplayDetailsProduct={toggleDisplayDetailsProduct}
                            // isShowTest={isShowTest}
                            // toggleTest={toggleTest}
                        />



                    ))
                    :
                    <ProductSkeleton />
                }
            </div>
            </div>
        );
    }

}
export default CategoryDetail;
