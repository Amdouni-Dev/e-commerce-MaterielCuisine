import React from 'react';
import Product from '../product/productview';
import ProductSkeleton from '../skeleton/product/productskeletonview';
import { useProductsContext } from "./contextProduct/ProductsProvider";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../order/redux/cartSlice";

const ProductList = ({ isShowDetailsProduct, toggleDisplayDetailsProduct, isShowTest, toggleTest }) => {
    const { products } = useProductsContext();
    const dispatch = useDispatch();
    const updatedCart = useSelector((state) => state.cart.cartItems);

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return (
        <>
            {products.length > 0 ? (
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
            ) : (
                <ProductSkeleton />
            )}
        </>
    );
};

export default ProductList;
