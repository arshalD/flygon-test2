import Lander from './Components/Lander';
import { Divider, Layout } from 'antd';
import CategorySlider from './Components/CategorySlider'
import FeatureProduct from './Components/FeatureProduct'
import CustomerReview from './Components/CustomerReview'
import SearchBar from './Components/SearchBar'
import { useEffect, useState } from 'react';
import Popular from './Components/Popular';
import Deals from './Components/Deals';
import MobileNavbar from './Components/MobileNavbar';
import Navbar from './Components/Navbar';
import Head from 'next/head';

const {Footer} = Layout;

const Home = () => {
    const [width, setWidth] = useState(1000)
    useEffect(() =>{
        // console.log('is index loaded on every page')
        window.scrollTo(0, 0);
        setWidth(window.innerWidth)
    },[])
    return (
        <>
        <Head>
        <title>Flygon</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        {width < 736 ?  <div className='mobnavbar-container, drop-shadow' ><MobileNavbar /></div> :<Navbar /> }
        <SearchBar />
        <Lander />
        <Divider orientation="left" plain>Today&apos;s Deals</Divider>
        <Deals />
        <Divider style={{marginTop:'10px'}} orientation="left" plain></Divider>
        <CategorySlider />
        <Divider orientation="left" plain></Divider>
        <FeatureProduct />    
        <Divider orientation="left" plain>Popular</Divider>
        <Popular />
        <Divider style={{marginTop:'70px'}} orientation="left" plain>Customer Reviews</Divider>
        <CustomerReview />
        <Footer style={{ textAlign: 'center' }}>Flygon All Rights Reserved © 2021 Created with ❤ by Arshal Freelancing</Footer>
        </>
    )
}

export default Home;

