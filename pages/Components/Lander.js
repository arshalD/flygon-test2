import { Row, Col } from 'antd';
import mainImg from '../Assets/Img/main.png'
import logo from '../Assets/Img/flygonLogo.svg'
const styles = {
    position: 'absolute',
    zIndex:2,
    width: '400px',
    display:'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin:'80px',
    padding:'50px',
    // backgroundimg:`url(${logo})`
}


const Lander = () => {
    return  (
        <Row style={{backgroundimg:mainImg.src}}>
            <Col span={24}>
                <div className="branding" style={styles} >{''}
                    <img alt ='' className="logo" src={logo.src} />
                     
                </div>
                <img className='lander-img' src={mainImg.src} alt='' style={{ width:'100%',display:'flex',justifyContent: 'center', position: 'relative',zIndex:1}}/>
            </Col>
        </Row>
    )
}

export default Lander ;