// import NewArrivalCard from "./NewArrivalCard";
import { Button, Card, List, Skeleton } from "antd";
import { useContext, useReducer} from 'react';
import { ItemsContext } from '../../Context/ItemsProvider'
import ProductCard from './ProductCard'
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";

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

const Deals = () => {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const [items, ]= useContext(ItemsContext);
    var data = [];
    if (items != null) {
      items.forEach(item => {
        if (item.category === 'Deals') {
          data.push(item); 
        }
      });

      if(items.length > 4){
          data.splice(4, data.length)
      }
    }
    if (items === null || data.length === 0) {
       reRender = setTimeout(() =>{
        forceUpdate();
       },2000)
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
            footer={
              (<List.Item>
                <Card className='see-all' style={{width: 43,border: 'none', padding:'0px'}}>
                  <p>See All</p>
                  <Link href={{pathname:'/category', query: {category:'Deals'} }}>
                  <Button name="seeAll" icon={<ArrowRightOutlined />} shape='circle' size='large' />
                  </Link>
                </Card>
              </List.Item>)
            }
            dataSource={data}
            renderItem={item =>
              (<List.Item >
                    <ProductCard item={item}  />
               </List.Item>)
          }
          >
          </List>
          </>
      )
}

export default Deals;