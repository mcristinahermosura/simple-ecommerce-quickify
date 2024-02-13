import { Button, Col, Container, Image, Row } from "react-bootstrap";

import NotFoundSrc from "../assets/images/404.png";

export default function NotFound() {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center h-100 mt-5"
    >
      <Row className="text-center mt-5 gap-5 ">
        <Col>
          <h1 className="display-4 fw-bold ">
            Oops! We couldn't find that page.
          </h1>
          <p className="lead">
            It looks like you might have mistyped the URL or the page has been
            moved. Don't worry, we'll help you get back on track.
          </p>
          <Button variant="primary" href="/">
            Go Home
          </Button>
        </Col>
        <Col xs={12}>
          <Image
            src={NotFoundSrc}
            fluid
            alt="Not Found"
            className="mb-4"
            style={{
              width: "100%",
              maxWidth: "750px",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}
