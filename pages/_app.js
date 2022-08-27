import '../styles/globals.css'
import 'antd/dist/antd.css'
import './App.css'
import { ItemsProvider } from '../Context/ItemsProvider';
import { FeaturedProvider } from '../Context/FeaturedProvider';
import { CartProvider } from '../Context/CartProvider';
import { CardProvider } from '../Context/CardProvider';
import { SearchProvider } from '../Context/SearchProvider';
import { useState } from 'react';
import { CategoryProvider } from '../Context/CategoryProvider';

function MyApp({ Component, pageProps,Data}) {
  const [home, setHome] = useState([])

  return(
    <ItemsProvider dbData={Data.product}>
    <CategoryProvider dbData={Data.category}>
    <FeaturedProvider dbData={Data.featured}>
    <SearchProvider dbData={home}>
    <CartProvider>
    <CardProvider>
       <Component {...pageProps} />
    </CardProvider>
    </CartProvider>
    </SearchProvider>
    </FeaturedProvider>
    </CategoryProvider>
    </ItemsProvider>
  )
}
export default MyApp
MyApp.getInitialProps = async ({ Component, ctx }) => {
  const Res = await fetch(`http://localhost:3000/api/getProduct`)
  const Data = await Res.json(); 
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, Data };
};
