import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Добро пожаловать, {user?.name || user?.email}!</h2>

      <Row>
        <Col md={4}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Клиенты</Card.Title>
              <Card.Text>Всего: ...</Card.Text> {/* Заменим позже API */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Услуги</Card.Title>
              <Card.Text>Всего: ...</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="warning" text="dark" className="mb-3">
            <Card.Body>
              <Card.Title>Записи</Card.Title>
              <Card.Text>Всего: ...</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
