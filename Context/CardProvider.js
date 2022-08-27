import {useState, createContext} from "react";


export const CardContext = createContext()

export const CardProvider = (props) =>{
    const [card, setCard] = useState({});


    return (
        <CardContext.Provider value={[card, setCard]}>
            {props.children}
        </CardContext.Provider>
    )
}