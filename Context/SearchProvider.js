import {useState, createContext} from "react";

export const SearchContext = createContext()

export const SearchProvider = (props) =>{
        const data = []
        const [results, setResults] = useState(data);
    return (
        <SearchContext.Provider value={[results, setResults]}>
            {props.children}
        </SearchContext.Provider>
    )
}