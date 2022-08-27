import { useContext, useReducer } from 'react'
import { FeaturedContext } from '../../Context/FeaturedProvider'
import { SearchContext } from '../../Context/SearchProvider'
import { ItemsContext } from '../../Context/ItemsProvider'
import { useRouter } from "next/router";
import { Carousel } from 'antd'
const styles = {
    width: '100%',
    height: '10%',
    cursor: 'pointer'
}
const FeatureProduct = (props) => {
    var reRender
    let history = useRouter();

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [featuredItems, ]= useContext(FeaturedContext);
    const [, setResults] = useContext(SearchContext);
    const [items, ]= useContext(ItemsContext);

    const onSearch = value => {
        let searchResult = []
        if(value === ''){
            
        }
        else{
            items.forEach(item =>{
                if(item.tags.includes(value)){
                    searchResult.push(item)
                }
            })
            // console.log(searchResult)
            setResults(searchResult)
            history.push('/search')
        }
    };

    if (featuredItems === null || featuredItems === undefined) {
        reRender = setTimeout(() =>{
         forceUpdate();
        },200)
        return(''
        )
    }
    else{
        clearTimeout(reRender)
        return(
            <Carousel autoplay style={{cursor : 'pointer'}}>
            {featuredItems.map((item,index)=>{
                return(
                    <img alt='' onClick={() => {onSearch(item.tags)}} style={styles } key={index} src={item.imgUrl} />
                )
                           
            }) }
            </Carousel>
            )
    }
}

export default FeatureProduct