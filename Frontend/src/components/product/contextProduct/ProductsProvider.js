import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

const ProductsContext = createContext();

export const useProductsContext = () => {
    return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
     const fetchData = async() =>{
         const prdct = await axios.get('http://localhost:5000/product/allProducts')
         setProducts(prdct.data)


     }
     fetchData()
    }
    )

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
