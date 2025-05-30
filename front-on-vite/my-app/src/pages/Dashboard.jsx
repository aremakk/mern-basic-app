import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [clientsToday, setClientsToday] = useState(0)
  const [nextApp, setApp] = useState(null)
  const [time, setTime] = useState(null)
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/clients/today', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const appointment = await axios.get('http://localhost:8081/api/appointments/nearest', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const rawTime = appointment.data.appointment.date
        setTime(new Date(rawTime))
        setApp(appointment.data.appointment)
        setClientsToday(res.data.res)
      } catch (err) {
        console.error('Ошибка при загрузке данных', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

    if (loading)
      return (
        <div className="text-center mt-5">
          <Spinner />
        </div>
    );


  return (
    <Container className="mt-4">
      <h2 className="mb-4">Добро пожаловать, {user.user.username }!</h2>

      <Row>
        <Col md={5}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body className='d-flex justify-content-between align-items-center'>
              <Card.Title >Клиентов зарегистрировано за сегодня</Card.Title>
              <div className='vr'></div>
              <Card.Text className='fs-1 ml-5'>{clientsToday}</Card.Text> {/* Заменим позже API */}
            </Card.Body>
          </Card>
          <Card bg="warning" text="dark" className="mb-3">
            <Card.Body>
              <Card.Title>Следующая запись:</Card.Title>
              <Card.Text>
                <p> <b>Клиент:</b> {nextApp?.client.name} </p>
                <p><b>Время:</b> {time.toLocaleString()}</p>
                <Button>Перейти к записи</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
