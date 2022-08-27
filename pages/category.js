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

const {Footer} = Layout;


const Category = (props) => {
    const [width, setWidth] = useState(1000)
    const router = useRouter()
    const {category} = router.query;
    useEffect(() =>{
        setWidth(window.innerWidth)
    },[])
    return (
        <>
        {width < 736 ?  <div className='mobnavbar-container, drop-shadow' ><MobileNavbar /></div> :<Navbar /> }
        <SearchBar />
        <CategoryViewer  category={category}/>  
        <Divider orientation="left" plain>New Arrivals</Divider>
        <NewArrivals />
        <Divider style={{marginTop:'70px'}} orientation="left" plain></Divider>
        <CategorySlider />
        <Divider orientation="left" plain></Divider>
        <FeatureProduct />    
        <Footer style={{ textAlign: 'center' }}>Flygon All Rights Reserved © 2021 Created with ❤ by Arshal Freelancing</Footer>
        </>
    )
}

export default Category;