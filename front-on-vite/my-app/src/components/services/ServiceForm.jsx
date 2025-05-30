import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ServiceForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8081/api/services/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setName(res.data.name);
          setPrice(res.data.price);
        })
        .catch(() => setError('Не удалось загрузить данные услуги'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:8081/api/services/${id}`,
          { name, price },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
      } else {
        await axios.post(
          `http://localhost:8081/api/services`,
          { name, price },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
      }
      navigate('/services');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при сохранении услуги');
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h3>{isEdit ? 'Редактировать услугу' : 'Новая услуга'}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название услуги"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите цену"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default ServiceForm;
