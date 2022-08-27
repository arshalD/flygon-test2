
import { Descriptions, Divider, Tooltip, Button} from 'antd';
import ReactWhatsapp from 'react-whatsapp';
import { WhatsAppOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import bg from './Assets/Img/contact.svg'
import MobileNavbar from './Components/MobileNavbar';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';

const {Footer} = Layout;

const styles = {
    padding: '20px',
    margin: '20px'
}
const background ={
    backgroundImage:'url('+bg.src+')'
}

const Contact = (props) => {
    const [width, setWidth] = useState(1000)
    useEffect(() =>{
        setWidth(window.innerWidth)
    },[])
    return (
        <>
        {width < 736 ?  <div className='mobnavbar-container, drop-shadow' ><MobileNavbar /></div> :<Navbar /> }
        <SearchBar />
        <div className='contacts-container' style={background}>
        <Divider  orientation="left" plain>Contact Us</Divider>
            <div className="contact">
         <Descriptions column={1} style={styles} title="About Us">
            <Descriptions.Item >Flygon Industrial Services</Descriptions.Item>
            <Descriptions.Item >99472 28846</Descriptions.Item>
            <Descriptions.Item >Industrial area, Angamaly</Descriptions.Item>
            <Descriptions.Item >
            Industrial area, Angamaly, South Angamaly P O ,Ernakulam, Kerala, India 683572 </Descriptions.Item>
            <Descriptions.Item >
               <Tooltip title="Call us">
                <a style={{color: 'black',padding:'5px'}} href="tel:99472 28846">
                <Button shape="circle" icon={<PhoneOutlined />}>     
                </Button></a></Tooltip>

                <Tooltip title="Mail us">
                <a style={{color: 'black',padding:'5px'}} href="mailto:info@flygon.in">
                <Button shape="circle" icon={<MailOutlined />}>   
                </Button></a></Tooltip>

                <Tooltip title="Whatsapp us">
                <ReactWhatsapp 
                style={{ backgroundColor: 'transparent', border:'none'}}
                number="91-9947228846" 
                message={`Hello Flygon :) \n`}>
                    <Button shape="circle" icon={<WhatsAppOutlined />}></Button>
                </ReactWhatsapp> </Tooltip> </Descriptions.Item>

        </Descriptions>    
        </div>
        </div>
        <Footer style={{ textAlign: 'center' }}>Flygon All Rights Reserved © 2021 Created with ❤ by Arshal Freelancing</Footer>
        </>
    )
}

export default Contact;