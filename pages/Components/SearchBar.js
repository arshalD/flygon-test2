import {Input} from 'antd'
import {useContext, useState} from 'react';
import { ItemsContext } from '../../Context/ItemsProvider'
import { useRouter } from "next/router";
import { SearchContext } from '../../Context/SearchProvider'

const { Search } = Input;
const sticky = {
    position: 'fixed',
    top: '80px',
    left: '50px',
    zIndex: '10',
  }


const SearchBar = (props) =>{
    let history = useRouter();
    const [items, ]= useContext(ItemsContext);
    const [, setResults] = useContext(SearchContext);
    const [loading, setLoading] = useState(false)

    const onSearch = value => {
        let searchResult = []
        if(value === ''){
            
        }
        else{
            setLoading(true)
            items.forEach(item =>{
                if(item.tags.includes(value.toLowerCase())){
                    searchResult.push(item)
                }
            })
            // console.log(searchResult)
            setTimeout(() => {
                setLoading(false)
                setResults(searchResult)
            }, 2000);
            history.push('/search')
        }
    };
    
    return (
        <Search className="search-container"  style={sticky} placeholder="Search here..." onSearch={onSearch} enterButton loading={loading} />
    )
}

export default SearchBar;