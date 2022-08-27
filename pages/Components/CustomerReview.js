import { Card, Avatar, Row, Col, Rate} from 'antd'

const {Meta} = Card

const review = 'A consumer review refers to a review written by the owner of a product or the user of a service who has sufficient experience to comment on reliability and whether or not the product or service delivers on its promises, otherwise known as product reviews '
const rateStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop:'15px'
}
const CustomerReview = (props) => {
    return (
        <>
        <Row style={{marginBottom:'150px'}} justify='space-around'>
            <Col style={{margin:'5px'}}>
                <Card className="customer-review-card" style={{ width: 300, marginTop: 16 }} >
                <Meta
                    avatar={
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Claire Florentz" />
                    }
                    title="Johnny"
                    description={review}
                  />
                  <Rate style={rateStyle} disabled defaultValue={5} />
                </Card>
            </Col>
            <Col style={{margin:'5px'}}>
                <Card className="customer-review-card" style={{ width: 300, marginTop: '16px' }} >
                <Meta
                    avatar={
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Claire Florentz" />
                    }
                    title="Django"
                    description={review}
                  />
                  <Rate style={rateStyle} disabled defaultValue={5} />
                </Card>
            </Col>
            <Col style={{margin:'5px'}}>
                <Card className="customer-review-card" style={{ width: 300, marginTop: 16 }} >
                <Meta
                    avatar={
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Claire Florentz" />
                    }
                    title="MSD"
                    description={review}
                  />
                  <Rate style={rateStyle} disabled allowHalf  defaultValue={4.5} />
                </Card>
            </Col>
        </Row>
          
        </>
    )
}

export default CustomerReview