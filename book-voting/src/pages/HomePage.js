import React, { useContext } from "react";
import { Container, Row, Col, Alert, Badge } from "react-bootstrap";
import { BookAdd } from "../components/BookAdd";
import { BookList } from "../components/BookList";
import { SocketContext } from "../context/SocketContext";
import { BookChart } from "../components/BookChart";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const { online } = useContext(SocketContext);

  return (
    <Container className="mt-4">
      <Alert variant={online ? "success" : "danger"}>
        Service status:{" "}
        <Badge bg={online ? "success" : "danger"}>
          {online ? "Online" : "Offline"}
        </Badge>
      </Alert>
      {/*<h1 className="text-center mb-4">BookNames</h1>*/}
      <Row className="mb-4">
        <Col>
          <BookChart />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <BookList />
        </Col>
        <Col md={4}>
          <BookAdd />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
