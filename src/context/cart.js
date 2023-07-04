import {useState,useContext,createContext} from 'react';

const CartContext = createContext();

const CartProvider=({children})=>{
    const [value,setValue]=useState([]);

    return (
        <CartContext.Provider value={[value,setValue]}>
            {children}
        </CartContext.Provider>
    )
}

// making a custom hook
const useCart=()=> useContext(CartContext)

export {useCart,CartProvider};


