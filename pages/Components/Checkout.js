import { Steps, Button, message, Form, Input, InputNumber, Descriptions, Divider, Modal, Select, Spin } from 'antd';
import { IdcardOutlined, CreditCardOutlined } from '@ant-design/icons'
import { useState, useReducer, useEffect, useContext } from 'react';
import { CartContext } from '../../Context/CartProvider'
import { app } from "../../fireBase"
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup}from "firebase/auth";
const layout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };
const { Step } = Steps;
var filledAddress = false
var globaladdress;
const auth = getAuth(app)

// eslint-disable-next-line
var user, db
const Checkout = (props) => {
  const [isOrderModalVisible, setisOrderModalVisible] = useState(false)
  const [userItems, setUserItems] = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [address, setAddress] = useState({
    name: '',
    number: '',
    email: '',
    address1: '',
    address2: '',
  });
  const info = props.info;
  console.log('cartItems',userItems)

  const onFinish = (values) => {
    console.log(values);
    globaladdress = values
    filledAddress = true;
    console.log(globaladdress)
    if(!filledAddress) {message.warning('Please enter your address :)')}
    else{
      if(auth.currentUser == null){
        setVisible(true);
      }
      else{
        user = auth.currentUser;
        next()
      }
    }
  };
  const gSignIn = () => {
    if(auth.currentUser== null){
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              user = result.user;
              next()

              // ...
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage)
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        })
    }
  }


  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setVisible(false);
  };

  const openPayModal = () => {
    {var orderDetails = {
      name:address.name,
      email:address.email,
      number:address.number,
      address:address.address1 + ' ' + address.address2+ ' ' + address.state,
      status:'unprocessed',
      timestamp:Math.floor(new Date()/1000),
    }
    if(auth.currentUser !== null) orderDetails.user = auth.currentUser.uid
    else orderDetails.user = null
    let products = {};
    userItems.forEach(product =>{
      products[product.name] = product.quantity;
    })
    let prices = {};
    let taxes = {};
    var itemDetails = ' ';

    userItems.forEach(product =>{
      prices[product.name] = product.price;
      taxes[product.name] = product.tax;
      itemDetails += product.name + ", " 
    })

    orderDetails.orders = products;
    orderDetails.taxes = taxes;
    orderDetails.prices = prices;}
    let orderDetailsUser = {
      item: itemDetails,
      status:0
    }
    console.log('orderDetails',orderDetails)
    setCurrent(0); 
    props.close();
    console.log('total',address.grandTotal*100)
    var options = {
      "key": "rzp_test_wluz3IgoT87S5m", // Enter the Key ID generated from the Dashboard key secret: scMP0GL4MBSpoXsyHFjfc6pN
      "amount": address.grandTotal*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Flygon",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "handler": function (response){
          setisOrderModalVisible(true);
          console.log(response.razorpay_payment_id);
          orderDetails.paymentId = response.razorpay_payment_id;
          console.log('orderDetails',orderDetails)
          fetch('http://localhost:3000/api/placeOrder', {
          method: 'POST',
          body: JSON.stringify({
            orderDetails: orderDetails,
            userOrder: orderDetailsUser
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
          })
          .then((response)=>{ 
            console.log(response)
            if(response.status === 200){
              setisOrderModalVisible(false);
              setUserItems([])
              success()
            }
            else{
              console.log(response)
              setisOrderModalVisible(false);
              message.error("Sorry there was a problem in placing order. Please contact our support team")
            }
          })
          .catch((error) => {
            console.log(error)
            setisOrderModalVisible(false);
            message.error("Sorry there was a problem in placing order. Please contact our support team")
          });             
      },
      "prefill": {
          "name": address.name,
          "email": address.email,
          "contact": address.number
      },
      "notes": {
          "address": "Flygon Industrial Services, Ernakulam, Kerala, India 683572"
      },
      "theme": {
          "color": "#FB4961"
      }
    };
    console.log('openPayModal')
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
      // db = firebase.firestore();
      // console.log('cartItems',userItems)
  },[]);

  const steps = [
    {
      title: 'Add Address',
      icon: <IdcardOutlined />,
      content: <Form layout="vertical" name="nest-messages" requiredMark={false} style={{padding:'1px', margin:'6px 0 0'}}  onFinish={onFinish} >
                  <Form.Item
                  name='name'
                  label="Name"
                   style={{margin:'0 0 15px'}}  
                  rules={[
                      {
                      required: true,
                      message: 'Please enter your name'
                      },
                  ]}
                  >
                  <Input value={address.name} />
                  </Form.Item>
                  <Form.Item
                  name='email'
                  label="Email"
                   style={{margin:'0 0 15px'}}  
                  rules={[
                      {
                      required: true,
                      type: 'email',
                      message: 'Please enter your email'
                      },
                  ]}
                  >
                  <Input value={address.email}/>
                  </Form.Item>
                  <Form.Item
                  name='number'
                  label="Phone Number"
                   style={{margin:'0 0 15px'}}  
                  rules={[
                      {
                      required: true,
                      type: 'number',
                      message: 'Please enter your number',
                      min: 0,
                      max: 9999999999,
                      },
                  ]}
                  >
                  <InputNumber style={{width: '40%'}} value={address.number}/>
                  </Form.Item>
                  <Form.Item name='address1' 
                   style={{margin:'0 0 15px'}}               
                  rules={[
                      {
                        required: true,
                      message: 'Please enter your address'
                      },
                  ]} label="Address Line 1">
                  <Input value={address.address1}/>
                  </Form.Item>
                  <Form.Item name='address2'  
                   style={{margin:'0 0 15px'}}                
                  rules={[
                      {
                        required: true,
                      message: 'Please enter your address'
                      },
                  ]}label="Address Line 2 & pincode">
                  <Input value={address.address2} />
                  </Form.Item>
                  <Form.Item name='state'
                   style={{margin:'0 0 15px'}}                  
                  rules={[
                      {
                        required: true,
                        message: 'Please select your state'
                      },
                  ]}label="State">
                    <Select className="state-select">
                      <Select.Option value="Andhra Pradesh">Andhra Pradesh</Select.Option>
                      <Select.Option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</Select.Option>
                      <Select.Option value="Arunachal Pradesh">Arunachal Pradesh</Select.Option>
                      <Select.Option value="Assam">Assam</Select.Option>
                      <Select.Option value="Bihar">Bihar</Select.Option>
                      <Select.Option value="Chandigarh">Chandigarh</Select.Option>
                      <Select.Option value="Chhattisgarh">Chhattisgarh</Select.Option>
                      <Select.Option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</Select.Option>
                      <Select.Option value="Daman and Diu">Daman and Diu</Select.Option>
                      <Select.Option value="Delhi">Delhi</Select.Option>
                      <Select.Option value="Lakshadweep">Lakshadweep</Select.Option>
                      <Select.Option value="Puducherry">Puducherry</Select.Option>
                      <Select.Option value="Goa">Goa</Select.Option>
                      <Select.Option value="Gujarat">Gujarat</Select.Option>
                      <Select.Option value="Haryana">Haryana</Select.Option>
                      <Select.Option value="Himachal Pradesh">Himachal Pradesh</Select.Option>
                      <Select.Option value="Jammu and Kashmir">Jammu and Kashmir</Select.Option>
                      <Select.Option value="Jharkhand">Jharkhand</Select.Option>
                      <Select.Option value="Karnataka">Karnataka</Select.Option>
                      <Select.Option value="Kerala">Kerala</Select.Option>
                      <Select.Option value="Madhya Pradesh">Madhya Pradesh</Select.Option>
                      <Select.Option value="Maharashtra">Maharashtra</Select.Option>
                      <Select.Option value="Manipur">Manipur</Select.Option>
                      <Select.Option value="Meghalaya">Meghalaya</Select.Option>
                      <Select.Option value="Mizoram">Mizoram</Select.Option>
                      <Select.Option value="Nagaland">Nagaland</Select.Option>
                      <Select.Option value="Odisha">Odisha</Select.Option>
                      <Select.Option value="Punjab">Punjab</Select.Option>
                      <Select.Option value="Rajasthan">Rajasthan</Select.Option>
                      <Select.Option value="Sikkim">Sikkim</Select.Option>
                      <Select.Option value="Tamil Nadu">Tamil Nadu</Select.Option>
                      <Select.Option value="Telangana">Telangana</Select.Option>
                      <Select.Option value="Tripura">Tripura</Select.Option>
                      <Select.Option value="Uttar Pradesh">Uttar Pradesh</Select.Option>
                      <Select.Option value="Uttarakhand">Uttarakhand</Select.Option>
                      <Select.Option value="West Bengal">West Bengal</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button style={{marginRight:'15px'}} onClick={() =>props.close()}>
                      Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                      Next
                  </Button>
                  </Form.Item>
              </Form>,
    },
    {
      title: 'Pay',
      icon:<CreditCardOutlined />,
      content: <Descriptions column={1} title="User Info">
      <Descriptions.Item label="Name">{address.name}</Descriptions.Item>
      <Descriptions.Item label="Phone Number">{address.number}</Descriptions.Item>
      <Descriptions.Item label="Email">{address.email}</Descriptions.Item>
      <Descriptions.Item label="Address">
         {address.address1} {address.address2}
       </Descriptions.Item>
      <Descriptions.Item label="State">{address.state}</Descriptions.Item>
       <Divider />
      <Descriptions.Item label="Orders Sumup">
         {info}
      </Descriptions.Item>
      <Descriptions.Item label="Delivery Charge">
        ₹ {address.delivery}
      </Descriptions.Item>
      <Descriptions.Item label="Total Payable">
        ₹ {address.grandTotal}
      </Descriptions.Item>
     </Descriptions>
    },
  ];
  const next = () => {
    console.log('next called')
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    
    let total = 0;
    if(globaladdress.state === 'Kerala'){
      userItems.forEach(userItem =>{
        total += userItem.chargesKerala * userItem.quantity;
      })
    }
    else{
      userItems.forEach(userItem =>{
        total += userItem.chargesOther * userItem.quantity;
      })
    }
    console.log('total',total)     
    console.log('charges',userItems)     
    globaladdress.delivery=total;
    globaladdress.grandTotal=total+props.total;
    console.log('globaladdress',globaladdress)
    setAddress(globaladdress)
              forceUpdate()
              console.log('address',address)
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  function success() {
    Modal.success({
      content: 'Your Order has been successfully Placed',
      centered: true,
    });
  }

  return (
    <>
      <Modal className="order-placing-modal"
      title="Placing Order" visible={isOrderModalVisible} centered={true} footer={null} closable={false} maskClosable={false}>
        <p>Please wait while your order is being placed</p>
        <Spin spinning={isOrderModalVisible} style={{textAlign: 'center'}} />
      </Modal>
      <Modal
        centered={true}
        title="Flygon"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="key1" type="primary" shape="round" danger onClick={() => gSignIn()}>
          Sign In
          </Button>,
          <Button key='key2' shape="round" danger onClick={() =>{setVisible(false); next()}}>
            Continue as Guest
          </Button>
        ]}
      >
        <p style={{fontWeight:'bolder',fontSize:'12 px'}} >Sign In for keeping a track of your Orders</p>

      </Modal>

      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {/* {current < steps.length - 1 && (
          <Button type="primary" onClick={() => {
            
              }}>
            Next
          </Button>
        )} */}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {message.info('Please dont close the page until payment is completed!')
          openPayModal()}}>
            Pay
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default Checkout