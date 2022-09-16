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
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Sunil Wanjari" />
                    }
                    title="Sunil"
                    description={"The highest levels of customer service I have experienced. Information was accurate, responses to queries were turned around very fast. Answers were clear and where necessary detailed enough for me to make decisions quickly"}
                  />
                  <Rate style={rateStyle} disabled defaultValue={5} />
                </Card>
            </Col>
            <Col style={{margin:'5px'}}>
                <Card className="customer-review-card" style={{ width: 300, marginTop: '16px' }} >
                <Meta
                    avatar={
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Divya Thakre" />
                    }
                    title="Divya"
                    description={"Fantastic products! Great cutomer support from beginning to end of the process. The quality of the product is very good. I would recommend them unreservedly."}
                  />
                  <Rate style={rateStyle} disabled defaultValue={5} />
                </Card>
            </Col>
            <Col style={{margin:'5px'}}>
                <Card className="customer-review-card" style={{ width: 300, marginTop: 16 }} >
                <Meta
                    avatar={
                    <Avatar size={68} src="https://avatars.abstractapi.com/v1/?api_key=bec4cffd10234e27a13edd09e9671d8a&name=Jino Mathew" />
                    }
                    title="Jino"
                    description={"I got a pair of lanterns from here and I’m very satisfied. They are high-quality and worth the money. The store also offered free shipping at that price so that’s a plus!"}
                  />
                  <Rate style={rateStyle} disabled allowHalf  defaultValue={4.5} />
                </Card>
            </Col>
        </Row>
          
        </>
    )
}

export default CustomerReview