import { Row, Col, Divider, Skeleton, Button, Descriptions, message, Space } from 'antd';
import { useContext, useState, useEffect, useReducer} from 'react'
import ProductImage from './ProductImage'
import SearchBar from './SearchBar'
import { ItemsContext } from '../../Context/ItemsProvider'
import { CartContext } from '../../Context/CartProvider'
import { ShoppingCartOutlined, } from '@ant-design/icons'
import SocialMediaButtons from './SocialMediaButtons';
import { useRouter } from 'next/router';
import Head from 'next/head';

var reRender
const ProductView = (props) => {
        let isAddedtoCart = false;
        let productInfo
        let priceDescription ;
        const router = useRouter()
        const {product} = router.query
        const docIdParam = product;
        console.log(docIdParam,'param')
        const [cartStatus , ] = useState(false);
        const [, forceUpdate] = useReducer(x => x + 1, 0)
        const [items, ]= useContext(ItemsContext);
        const [userItems, setUserItems] = useContext(CartContext);

        useEffect(() =>{
          window.scrollTo(0, 0)
        },[])
        console.log('items',items)
        if (items === null || items.length === 0) {
          console.log('no items')
          reRender = setTimeout(() =>{
            console.log('called timeout')
           forceUpdate();
          },20000)
           return (
               <>
                <Row justify="space-around" style={{marginBottom:'25vw'}}>
                    <Col style={{height:'fit-content', marginBottom:'50px'}} xs={23} sm={23} md={11} lg={11} xl={11}>
                    <Skeleton.Image style={{height:'40vw', width:'40vw',}} />
                    </Col>     
                    <Col xs={23} sm={23} md={11} lg={12} xl={12}>
                      <Skeleton active />
                    </Col>
                </Row>
              </>
           )
         }
         else{
          console.log('clear timeout')
          clearTimeout(reRender,() =>{
            console.log('cleared timeout')
          })
         }

        items.forEach(item => {
          if (item.docId === docIdParam){
            productInfo = item;
          }
        })

        console.log(userItems)
        userItems.forEach(item => {
        console.log('heere')
          if (item.docId === docIdParam) {
            console.log('item is inside the cart')
            isAddedtoCart = true;
          }
        })
        
    const handleClick = ()=>{
        console.log('to caart',productInfo)
        let productInfoCart ={
          chargesKerala: productInfo.chargesKerala,
          chargesOther: productInfo.chargesOther,
          tax:productInfo.tax,
          quantity: 1,
          name: productInfo.name,
          price: productInfo.sellingPrice,
          imgUrl: productInfo.imgUrl,
          docId: productInfo.docId,
        }
        if(!cartStatus){
          setUserItems(prevData => [...prevData, productInfoCart]);
          message.success({
            content: 'Added to Cart',
          });
        }
      }
    console.log('card', productInfo)
   const getPrice = () => {
      if (productInfo.offer > 0) {
        priceDescription = <p style={{margin:'0px'}}><s style={{color:'grey'}}>₹{productInfo.price}</s> ₹ {productInfo.sellingPrice}</p>
      }else{
        priceDescription = `₹${productInfo.sellingPrice}`;
      }
      return priceDescription;
    }
    clearTimeout(reRender,() => {
      console.log('timeout cleared')
    })
    return (
        <>
        <Head>
        <title>{productInfo.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <SearchBar />
        <Divider style={{marginTop:'85px'}} orientation="left" plain>{productInfo.name}</Divider>
        <Row justify="space-around">
            <Col style={{height:'fit-content', marginBottom:'50px'}} xs={23} sm={23} md={11} lg={11} xl={11}>
                <ProductImage images={productInfo.images} videoId={productInfo.videoId} style={{margin:'10px', height:'20vw'}} />
                {/* <img style={imgStyle} src ={imag e} ></img> */}
            </Col>
            
            <Col xs={23} sm={23} md={11} lg={12} xl={12}>
              <Space size={12}>
            {isAddedtoCart ? <Button type="primary" shape='round' danger icon={<ShoppingCartOutlined/>}>
                Added to Cart
            </Button> : <Button type="primary" shape='round' onClick={()=>handleClick()} danger icon={<ShoppingCartOutlined/>}>
                Add to Cart
            </Button>}
            <SocialMediaButtons info = {productInfo.name}/>
            </Space>
            <Descriptions bordered={true} style={{marginTop:'15px', marginBottom:'5vh'}} column={1} title="Specifications">
                <Descriptions labelStyle={{fontWeight:'bolder'}} label='Name of Item'>{productInfo.name}</Descriptions>
                <Descriptions labelStyle={{fontWeight:'bolder'}} label='Price'>{getPrice(productInfo.price)}</Descriptions>
                {
                    productInfo.description.map((item) => {
                        return <Descriptions key={item} labelStyle={{fontWeight:'bolder'}} label={item.specName}>{item.specInfo}</Descriptions>
                    })
                }
            </Descriptions>
            </Col>
        </Row>
        </>
    )
}

export default ProductView;

