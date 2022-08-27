import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { CategoryContext } from '../../Context/CategoryProvider'
import productUrl from '../Assets/Img/product.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Skeleton } from "antd";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const divStyle = {
    marginLeft:'25px'
}

const CategorySlider = () => {
  const router = useRouter();
  const [category, setCategory] = useContext(CategoryContext)
  const redirect = (path)=> {
      router.push({
        pathname: '/category',
        query: { category: path },
      })
  } 
    if(category === null ){
      return(
        <>
        <Carousel responsive={responsive}>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true}  size={15} shape={'round'} />
          </div>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true} size={15} shape={'round'}  />
          </div>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true}  size={15} shape={'round'} />
          </div>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true}  size={15} shape={'round'} />
          </div>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true}  size={15} shape={'round'} />
          </div>
          <div style={divStyle}>
            <Skeleton.Avatar active={true} size={156} shape={'circle'}/>
            <Skeleton.Input active={true}  size={15} shape={'round'} />
          </div>
        </Carousel>
        </>
      )
    }
    else{
      let categoryArray = Object.keys(category)
      return (
          <>
          <Carousel responsive={responsive}>
              {
                categoryArray.map((cat,index)=>{
                  return (
                    <div key={index}  style={divStyle} onClick={() => redirect(category[cat].name)}>
                    <CategoryCard title={category[cat].name} description="description" imageUrl={category[cat].image} /></div>
                  )
                })
              }     
          </Carousel>
        
          </>
    )
}
}
export default CategorySlider;