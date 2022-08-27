import {useState, createContext, useEffect} from "react";

export const ItemsContext = createContext()

export const ItemsProvider = (props) =>{
        const [items, setItems] = useState([])
        let data = props.dbData
        console.log(props,'props')
        console.log(props,'props')
        // setItems(data)
        useEffect(() =>{

            setItems(data)
        },[data])
        console.log(items)
    return (
        <ItemsContext.Provider value={[items, setItems]}>
            {props.children}
        </ItemsContext.Provider>
    )
}
