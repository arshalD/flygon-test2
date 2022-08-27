import { Card, Tag, message } from 'antd';
import { ShoppingCartOutlined, CheckCircleOutlined} from '@ant-design/icons'
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartProvider'
import { useRouter } from 'next/router';


const { Meta } = Card;
const styles = {
    width: 240,
    marginTop: '45px',
}
const ProductCard = (props) =>{
        const product = props.item;
        var description = '';
        var offer = '';
        let router = useRouter();
        let isAddedtoCart = false;
        const [cartStatus , ] = useState(false);
        if(product.offer>0){
          description = <p><s>₹{product.price}</s> ₹ {product.sellingPrice}</p>;
          offer = `${product.offer}% off`
        }else{
          description = `₹${product.sellingPrice}`;
        }
         
        const itemInfo = {
          name: product.name,
          imgUrl: product.imgUrl,
          price: product.sellingPrice,
          chargesKerala: product.chargesKerala,
          chargesOther: product.chargesOther,
          tax:product.tax,
          docId: product.docId,
          quantity: 1
        }
        const [userItems, setUserItems] = useContext(CartContext);
        userItems.forEach(item => {
          if (item.docId === product.docId) {
            // console.log('item is inside the cart')
            isAddedtoCart = true;
          }
        })
        // if (isAddedtoCart){
        //   setCartStatus(<CheckCircleOutlined/>)
        // }
        const toProductPage = ()=>{
          // console.log('description',product.description)
          // console.log('product',product);
          router.push({
            pathname: '/product',
            query: { product: product.docId },
          })
        }

        const handleClick = ()=>{
          // console.log('props',props)
          // console.log('itemInfo',itemInfo)
          if(!cartStatus){
            // console.log('userItems',userItems)
            setUserItems(prevData => [...prevData, itemInfo]);
            message.success({
              content: 'Added to Cart',
            });
          }
        }

        return(
            <Card
               className="new-arrival-card"
               hoverable
               style={styles}
               actions={[
                isAddedtoCart?<p style={{margin:'0px'}}><CheckCircleOutlined/> Added to Cart</p>:<ShoppingCartOutlined key="addtocart" onClick={()=>{handleClick()}} />,
              ]}
               cover={<img onClick={()=>{toProductPage()}} alt="example" src={product.imgUrl} />}
            >
               <Meta title={product.name} description={description} />
               {offer=== ''?'':<Tag color="#FB4961">{offer}</Tag>}
             
             </Card>
             )
}

export default ProductCard;
