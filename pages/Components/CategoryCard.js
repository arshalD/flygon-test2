import { Card } from 'antd';

const { Meta } = Card;  
const styles = {
    width: 240,
    height:300,
    marginTop: '45px'
}
const CategoryCard = (props) =>{

        return(
          
            <Card
               className='category-card'
               hoverable
               style={styles}
               cover={<img alt="example" src={props.imageUrl} />}
             >
               <Meta title={props.title}/>
             </Card>
            )
}

export default CategoryCard;
