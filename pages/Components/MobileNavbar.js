import { Drawer, Button, Space, } from 'antd';
import { MenuOutlined } from '@ant-design/icons'
import {  useContext, useState,} from 'react';
import { Menu, } from 'antd';
import { HomeOutlined, AppstoreOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import logo from '../Assets/Img/logo.png'
import CartDrawer from './CartDrawer';
import User from './User';
import Link from 'next/link'
import { CategoryContext } from '../../Context/CategoryProvider'

const { SubMenu } = Menu;


const MobileNavbar = (props)=> {
    const [current, setCurrentMenu] = useState('mail')
    const [category, setCategory] = useContext(CategoryContext)
    const [visible, setVisible] = useState(false)
    const [placement, ] = useState('left')

    const handleClick = e => {
      // console.log('click ', e);
      setCurrentMenu(e.key);
    };
  
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };

    let categoryArray = Object.keys(category)

      return (
        <>
        <Space  size={1} style={{backgroundColor:'#FFFFFF', padding:'5px',}}>
            <Button type='text' style={{margin:'4px', marginBottom:'0px'}} onClick={showDrawer} icon={<MenuOutlined />}></Button>
            <Link href='/'>
                <img alt ='' style={{marginLeft:'6px', marginTop:'3px'}} width='35' height='35' src={logo.src}/>
            </Link>
            <CartDrawer/>
        </Space>

    <Drawer
      title={<User />}
      placement={'left'}
      closable={false}
      onClose={onClose}
      visible={visible}
      key={placement}
    >
      <Menu onClick={handleClick} selectedKeys={current} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link href='/' onClick={onClose}>
                Home
                </Link>
            </Menu.Item>
            <SubMenu key="categories" icon={<AppstoreOutlined />} title="Categories">
                <Menu.ItemGroup title="Popular">
                {
                categoryArray.map((cat,index)=>{
                  return (
                    <Menu.Item key={index}><Link href={{pathname:'/category', query: {category:category[cat].name} }}>{category[cat].name}</Link></Menu.Item>
                  )
                })
              }
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="contact" icon={<CustomerServiceOutlined />}>
            <Link onClick={onClose} href='/contact'>Contact Us</Link>
            </Menu.Item>
        </Menu>
    </Drawer>
        </>
      );
    
  }
  
export default MobileNavbar