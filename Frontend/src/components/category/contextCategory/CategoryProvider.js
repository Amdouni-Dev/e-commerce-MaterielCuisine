import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

const CategoriesContext = createContext();

export const useCategoriesContext = () => {
    return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect( () => {
            const fetchData = async() =>{
                const cats = await axios.get('http://localhost:5000/category/allCategories')
                setCategories(cats.data)


            }
            fetchData()
        }
    )

    return (
        <CategoriesContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};
