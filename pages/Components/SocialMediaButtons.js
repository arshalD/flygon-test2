import { Button, message, Popover, Space } from "antd";
import React, { useEffect, useState } from "react";
import {FacebookMessengerShareButton, FacebookShareButton, TelegramShareButton, WhatsappShareButton} from "react-share";
import {AiOutlineLink, AiOutlineWhatsApp,} from 'react-icons/ai'
import { FaFacebookF, FaFacebookMessenger, FaTelegram } from "react-icons/fa"
import { ShareAltOutlined } from "@ant-design/icons";

 function SocialMediaButtons(props) {
         const [url, setUrl] = useState('')
         useEffect(() =>{
            setUrl(window.location.href)
         },[])
       const content = (
              <Space>
              <FacebookShareButton 
                 url={url}
                 quote={props.info}
                 hashtag="#camperstribe"
                 >
                  <Button style={{backgroundColor:'#1890ff'}} icon={<FaFacebookF style={{fontSize:'20px', color: '#ffffff', paddingTop: '5px'}}/>} shape="circle"/>
               </FacebookShareButton>
 
               <WhatsappShareButton
                 url={url}
                 quote={props.info}
                 >
                  <Button style={{backgroundColor:'#25D366'}} icon={<AiOutlineWhatsApp style={{color:'white'}} />} shape="circle"/>
               </WhatsappShareButton>
               
               <FacebookMessengerShareButton 
                 url={url}
                 quote={props.info}
                 >
                  <Button style={{backgroundColor:'#00B2FF'}} icon={<FaFacebookMessenger style={{color:'white'}} />} shape="circle"/>
               </FacebookMessengerShareButton>
 
               <TelegramShareButton 
                 url={url}
                 quote={props.info}>
                  <Button style={{backgroundColor:'#0088CC'}} icon={<FaTelegram style={{color:'white'}} />} shape="circle"/>
               </TelegramShareButton>
 
              <Button  type="primary" icon={<AiOutlineLink />} onClick={() => {
                     navigator.clipboard.writeText(url); message.info('link copied !')
              }} shape='circle'/>
 
               </Space>
       );
       return (
             <>
              <Popover content={content} trigger="hover" placement='bottom'>
                 <Button  type="primary" icon={<ShareAltOutlined />} shape="circle"/>
              </Popover>
              </>
       );
}

export default SocialMediaButtons