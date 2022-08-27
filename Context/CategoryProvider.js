import {useState, createContext, useEffect} from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) =>{
        const [category, setCategory] = useState([])
        let data = props.dbData
        console.log(props,'props')
        // setItems(data)
        useEffect(() =>{
            setCategory(data)
        },[data])

    return (
        <CategoryContext.Provider value={[category, setCategory]}>
            {props.children}
        </CategoryContext.Provider>
    )
}
