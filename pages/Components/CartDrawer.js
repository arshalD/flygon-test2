import { useState, useContext,} from 'react';
import { Drawer, Button, List, ConfigProvider, Empty, PageHeader, Select, Badge, Modal,} from 'antd';
import { ShoppingCartOutlined , DeleteOutlined,ForwardOutlined } from '@ant-design/icons'
import { CartContext } from '../../Context/CartProvider'
import { ItemsContext } from '../../Context/ItemsProvider'
import Checkout from './Checkout'




const { Option } = Select;
var selectedItem;
const CartDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [userItems, setUserItems] = useContext(CartContext);
    const [, setItems] = useContext(ItemsContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
      setVisible(false)
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    // console.log('from cartcontext :',userItems)
    
    const cartItems = userItems;
    const customizeRenderEmpty = () => (
      <div style={{ textAlign: 'center' }}>
        {Empty.PRESENTED_IMAGE_SIMPLE}
        <p>Your Cart is Empty</p>
      </div>
    );

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
    const totalCalculator = () =>{
      let total = 0;
      userItems.forEach(userItem =>{
          total += userItem.price * userItem.quantity;
      })
      return total;
    }
    
    const total = totalCalculator();
    
    function handleChange(value) {
      // console.log(window.event.target.innerHTML);
      let indexOfItem;
      cartItems.forEach(cartItem =>{
        if(cartItem.name === selectedItem){
          console.log('item to be deleted:',cartItems.indexOf(cartItem))
          indexOfItem = cartItems.indexOf(cartItem);
        }
      })
      cartItems[indexOfItem].quantity = value;
      setItems((state) => [...state])
      setUserItems(cartItems)
    }
    const deleteItem = (item) => {
      let indexOfItem;
      cartItems.forEach(cartItem =>{
        if(cartItem.name === item){
          console.log('item to be deleted:',cartItems.indexOf(cartItem))
          indexOfItem = cartItems.indexOf(cartItem);
        }
      })
      cartItems.splice(indexOfItem, 1);
      setItems((state) => [...state])
      setUserItems(cartItems)
    }
    return (
  <>
  <Badge className="cart-icon-badge" count={userItems.length} offset={[5,8]}>
        <Button className="cart-icon" type="text" icon={<ShoppingCartOutlined />} onClick={showDrawer}>
          Cart
        </Button>
        </ Badge>

        <Modal height={600} title="Enter Delivery Address" centered={true}
        visible={isModalVisible} footer={null} closable={false} maskClosable={false} onCancel={handleCancel}>
         <Checkout total={total} info={`₹ ${total} (${userItems.length} items)`} close={handleCancel} />
        </Modal>

        <Drawer
          title={<PageHeader
            className="site-page-header"
            style={{padding:'0'}}
            icon = {<ShoppingCartOutlined />}
            title="Cart"
            subTitle={total === 0 ? `` : `₹ ${total} (${userItems.length} items)`}
          />}
          width={320}
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
        > 
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          {total === 0 ? '':<Button danger onClick={()=>showModal()} className="cart-icon" shape="round" icon={<ForwardOutlined />}>Checkout</Button>}
          <List
              itemLayout="vertical"
              size="large"
              dataSource={userItems}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      width={80}
                      height={80}
                      alt="logo"
                      src={item.imgUrl}
                    />
                  }
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`₹ ${item.price}    qty: ${item.quantity}`}
                  />
                  <Button style={{borderRadius:'50px 0 0 50px'}} onClick={() => deleteItem(item.name)}><DeleteOutlined /></Button>
                  <Select className="qty-select" onClick={() => selectedItem = item.name} name={item.name} defaultValue="1" style={{ width: 50,borderRadius:'0px 50px 50px 0px'}} onChange={handleChange}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                  </Select>
                </List.Item>
              )}
            />
            </ConfigProvider>
        </Drawer>
      </>
    );
  };

  export default CartDrawer