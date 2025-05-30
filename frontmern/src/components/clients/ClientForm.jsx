import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8081/api/clients',
        { name, phone },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      navigate('/clients');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Ошибка при создании клиента');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h3>Новый клиент</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя клиента"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Телефон</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите номер"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default ClientForm;
