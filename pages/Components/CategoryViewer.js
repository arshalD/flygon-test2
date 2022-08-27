import { List, Skeleton, Divider } from 'antd';
import { useContext, useReducer, useEffect} from 'react';
import { ItemsContext } from '../../Context/ItemsProvider'
import ProductCard from './ProductCard'


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

var reRender

const CategoryViewer = (props) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
     const [items, ] = useContext(ItemsContext);
    //  console.log(props.category)
    var data = [];
    if (items !== null) {
      items.forEach(item => {
        if (item.category === props.category) {
          data.push(item);
        }
      });
    }
    useEffect(() =>{
      window.scrollTo(0, 0)
    })

    // console.log('data from category viewer :',data)
    // console.log('items from category viewer :',items)
    if (items === null || data.length === 0){
      reRender = setTimeout(() =>{
        forceUpdate();
       },100)

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
        <Divider style={{marginTop:'85px'}} orientation="left" plain>{props.category}</Divider>
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
            <List.Item>
                  <ProductCard  item={item}  />
            </List.Item>
          )}
        />
        </>
    )
}

export default CategoryViewer;