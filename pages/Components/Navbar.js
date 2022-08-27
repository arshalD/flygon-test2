import {  useContext, useState, } from 'react';
import { Menu, } from 'antd';
import { HomeOutlined, AppstoreOutlined, CustomerServiceOutlined, } from '@ant-design/icons';
import Link  from 'next/link';
import CartDrawer from './CartDrawer';
import User from './User';
import { CategoryContext } from '../../Context/CategoryProvider'


const { SubMenu } = Menu;
const styles = {
 position: 'sticky',
 top: '0px',
 zIndex: '5'
}

const Navbar = (props)=> {
  const [currentMenu, setCurrentMenu] = useState('mail');
  const [category, setCategory] = useContext(CategoryContext)

  const handleClick = e => {
    // console.log('click ', e);
    setCurrentMenu({ current: e.key });
  };
   
    const { current } = currentMenu;
    let categoryArray = Object.keys(category)

    return (
      <>
      <Menu style={styles} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href='/'>
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
        <Link href='/contact'>Contact Us</Link>
        </Menu.Item>
        <Menu.Item>
          <CartDrawer/>
        </Menu.Item>
        <Menu.Item className="sign-in-icon" key="user" >
           <User />
        </Menu.Item>
      </Menu>
      </>
    );
  
}

export default Navbar;