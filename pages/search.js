import { Layout } from 'antd';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import CategorySlider from './Components/CategorySlider'
import FeatureProduct from './Components/FeatureProduct'
import MobileNavbar from './Components/MobileNavbar';
import Navbar from './Components/Navbar';
import SearchBar from './Components/SearchBar'
import SearchViewer from './Components/SearchViewer'

const {Footer} = Layout;

const SearchResult = (props) => {

    const [width, setWidth] = useState(1000)
    useEffect(() =>{
        window.scrollTo(0, 0);
        setWidth(window.innerWidth)
    },[])

    return (
        <>
        {width < 736 ?  <div className='mobnavbar-container, drop-shadow' ><MobileNavbar /></div> :<Navbar /> }
        <SearchBar />
        <SearchViewer />  
        <Divider style={{marginTop:'70px'}} orientation="left" plain></Divider>
        <CategorySlider />
        <Divider orientation="left" plain></Divider>
        <FeatureProduct />    
        <Footer style={{ textAlign: 'center' }}>Flygon All Rights Reserved © 2021 Created with ❤ by Arshal Freelancing</Footer>
        </>
    )
}

export default SearchResult;