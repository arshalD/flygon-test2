import { List, Empty, Divider } from 'antd';
import { useContext,useEffect } from 'react';
import { SearchContext } from '../../Context/SearchProvider'
import ProductCard from './ProductCard'


const SearchViewer = (props) => {
     const [results, ] = useContext(SearchContext);
      // console.log('search results:', results);
      useEffect(() =>{
        window.scrollTo(0, 0)
      })
     if (results.length === 0){
      return (
          <>
          <Empty
            style={{margin:'auto',padding:'auto',marginTop:'80px',marginBottom:'80px'}}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 120,
            }}
            description={
              <span>
                Oops! Not found... try some other keyword to search...
              </span>
            }
          >
          </Empty>
         </>
      )
    }

    return(
        <>
        <Divider style={{marginTop:'85px'}} orientation="left" plain>Search Result</Divider>
        <List
          grid={{
            gutter: 1,
            xs: 2,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5,
          }}
          
          dataSource={results}
          renderItem={item => (
            <List.Item>
                   <ProductCard  item={item}/>   
            </List.Item>
          )}
        />
        </>
    )
}

export default SearchViewer;