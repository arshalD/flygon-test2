// import NewArrivalCard from "./NewArrivalCard";
import { List, Skeleton } from "antd";
import { useContext, useReducer} from 'react';
import { ItemsContext } from '../../Context/ItemsProvider'
import ProductCard from './ProductCard'

var reRender
const listData = [];
for (let i = 0; i < 4; i++) {
  listData.push({
    name: 'https://ant.design',
    price: 22222,
    imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    offer:
      5,
  });
}

const NewArrivals = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const [items, ]= useContext(ItemsContext);
    var data = [];
    if (items != null) {
      items.forEach(item => {
        if (item.category === 'New Arrivals') {
          data.push(item);
        }
      });
    }
    if (items === null || data.length === 0) {
       reRender = setTimeout(() =>{
        forceUpdate();
       },20)
        return (
            <>
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
            
            dataSource={listData}
            renderItem={item => (
              <List.Item>
                  <Skeleton loading={true} active  >
                    <ProductCard  item={item}  />
                  </Skeleton> 
              </List.Item>
            )}
          />
        </>
        )
      }
      clearTimeout(reRender)
      return(
          <>
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
            
            dataSource={data}
            renderItem={item => (
              <List.Item >
                    <ProductCard item={item}  />
              </List.Item>
            )}
          />
          </>
      )
}

export default NewArrivals;