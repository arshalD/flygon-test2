import {useState, createContext, useEffect} from "react";

export const FeaturedContext = createContext()

export const FeaturedProvider = (props) =>{
        const [featuredItems, setFeaturedItems] = useState([])
        let data = props.dbData
        console.log(data)
        // setItems(data)
        useEffect(() =>{
            setFeaturedItems(data)
        },[data])
        console.log('featured items',featuredItems)
    return (
        <FeaturedContext.Provider value={[featuredItems, setFeaturedItems]}>
            {props.children}
        </FeaturedContext.Provider>
    )
}