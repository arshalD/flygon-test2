import { Divider } from 'antd';
import NewArrivals from './Components/NewArrivals'
import CategorySlider from './Components/CategorySlider'
import FeatureProduct from './Components/FeatureProduct'
import SearchBar from './Components/SearchBar'
import CategoryViewer from './Components/CategoryViewer'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MobileNavbar from './Components/MobileNavbar';
import Navbar from './Components/Navbar';
import { Layout } from 'antd';
import UserPage from './Components/UserPage';

const {Footer} = Layout;


const Myorders = (props) => {
    const [width, setWidth] = useState(1000)
    const router = useRouter()
    const {category} = router.query;
    useEffect(() =>{
        setWidth(window.innerWidth)
    },[])
    return (
        <>
        {width < 736 ?  <div className='mobnavbar-container, drop-shadow' ><MobileNavbar /></div> :<Navbar /> }
        <UserPage />
        <Footer style={{ textAlign: 'center' }}>Flygon All Rights Reserved © 2021 Created with ❤ by Arshal Freelancing</Footer>
        </>
    )
}

export default Myorders;