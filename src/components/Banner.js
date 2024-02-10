import { Col, Container, Row, Carousel, Image } from "react-bootstrap";
import model1 from "../assets/images/model1.png";
import model2 from "../assets/images/model2.png";
import model3 from "../assets/images/model3.png";
import model4 from "../assets/images/model4.png";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  const { content1, content2, content3, content4, destination, label } = data;

  return (
    <>
      <Container fluid className="p-5 body">
        <Row className="d-flex flex-xs-column flex-lg-row text-center gap-5 w-75 mx-auto ">
          <Col
            className="d-flex flex-column justify-content-center align-items-center justify-content-lg-start mt-lg-5"
            xs={12}
            lg={5}
          >
            <h1 className="home-content1 display-4 display-xs-8">{content1}</h1>
            <h1 className="home-content2">{content2}</h1>
            <h1 className="home-content3">{content3}</h1>
            <h3>{content4}</h3>
            <Link className="btn btn-main mt-1" to={destination}>
              {label}
            </Link>
          </Col>

          <Col
            xs={12}
            lg={6}
            className="d-flex justify-content-center align-items-start align-items-lg-start  mt-lg-5"
          >
            <Carousel
              fade
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "400px",
                maxHeight: "500px",
              }}
            >
              <Carousel.Item>
                <Image
                  src={model1}
                  alt="Model 1"
                  className="img d-block w-100"
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src={model2}
                  alt="Model 2"
                  className="img d-block w-100"
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src={model3}
                  alt="Model 3"
                  className="img d-block w-100"
                />
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  src={model4}
                  alt="Model 4"
                  className="img d-block w-100"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
