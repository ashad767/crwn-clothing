import { createContext, useState, useEffect } from "react";

import PRODUCTS from '../shop-data.json'
// import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// value you want to access
export const ProductsContext = createContext({
    products: [],
    // setProducts: () => null
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS)
    const value = { products }

    useEffect(() => {
        
    }, [])

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
} 