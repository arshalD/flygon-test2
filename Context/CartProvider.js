import {useState, createContext} from "react";


export const CartContext = createContext()

export const CartProvider = (props) =>{
    const dbuserItems = props.data || []
    console.log(dbuserItems)
    const [userItems, setUserItems] = useState(dbuserItems);


    return (
        <CartContext.Provider value={[userItems, setUserItems]}>
            {props.children}
        </CartContext.Provider>
    )
}