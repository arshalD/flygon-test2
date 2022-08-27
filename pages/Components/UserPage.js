import { Steps, Collapse, Skeleton, Button, Popover,Empty  } from 'antd';
import { useEffect, useState, useReducer } from 'react';
import { CopyOutlined } from '@ant-design/icons'
import myorders from '../Assets/Img/drone.svg'
import { useRouter } from 'next/router';
const { Panel } = Collapse;
const { Step } = Steps;

const UserPage = (props) =>{
  var db
      const [orderData, setOrderData] = useState([]); 
      const [userData, setUserData] = useState([])
      const [, forceUpdate] = useReducer(x => x + 1, 0)
      const [data, setData] = useState(true)
      const [document, setDocument] = useState(false);
      const router = useRouter();

      const datafetch = async(docid)=>{
        const Res = await fetch(`http://localhost:3000/api/getOrders?id=${docid}`)
        const Data = await Res.json();
            if (Object.keys(Data).length === 0) {
              setData(false);
              forceUpdate()
            } 
            else{
              setUserData(Data);
              setOrderData(Object.keys(Data));
              setDocument(true)
              forceUpdate()
            }
      }

  useEffect(() => {
    const {user} = router.query
    console.log(user)
    datafetch(user)
  },[router])

  return (
    <div className='userpage-container' style={{backgroundImage:'url('+myorders.src+')'}}>
  {    data ? document ? 
  <>
  <Collapse className='contact' defaultActiveKey={(orderData.length)-1} style={{ margin: 'auto', marginTop: '40px'}}  ghost>
    {
    orderData.map((item,index)=>{
      // console.log(userData[item].trackingId)
      if(userData[item].trackingId !== undefined)
      return(
    <Panel header={userData[item].item} key={index}>
    <Steps style={{margin: '0px', padding:'5px'}} progressDot current={userData[item].status} direction="vertical">
      <Step title="Order Placed" description="Your order has been placed" />
      <Step title="Order Processed" description="Your order has been processed" />
      <Step title="Item Shipped" description="Your order has been shipped" />
      <Step title="Tracking Id" 
      description={<div>{userData[item].trackingId}  <Popover content={'Tracking Id Copied'} placement="right" trigger="click">
        <Button type="text" 
      onClick={() =>{navigator.clipboard.writeText(userData[item].trackingId)}}
      size={'small'} offset={8} icon={<CopyOutlined />}></Button></Popover><br/>
      <a href="https://fastlineindia.com" target="_blank" rel="noopener noreferrer">Track order </a></div>} />
    </Steps>
    </Panel>
      )
      else { return (
        <Panel header={userData[item].item} key={index}>
        <Steps style={{margin: '0px', padding:'5px'}} progressDot current={userData[item].status} direction="vertical">
          <Step title="Order Placed" description="Your order has been placed" />
          <Step title="Order Processed" description="Your order has been processed" />
          <Step title="Item Shipped" description="Your order has been shipped" />
        </Steps>
        </Panel>
      )}
    })}
  </Collapse>, 
  </>
  :<Skeleton  active />
  :<>
    <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
     description="No Order has been placed "
     style={{marginTop:'50px'}}
      />
   </>}
   </div>
)
}
export default UserPage

// <a href='https://www.freepik.com/vectors/business'>Business vector created by stories - www.freepik.com</a>