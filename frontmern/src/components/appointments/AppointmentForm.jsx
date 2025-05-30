import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppointmentForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);

  const [clientId, setClientId] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Загрузка клиентов и услуг
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:8081/api/clients', {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get('http://localhost:8081/api/services', {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);
        setClients(clientsRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        setError('Ошибка загрузки клиентов или услуг');
      }
    };
    fetchData();
  }, [user.token]);

  // Если редактируем — загрузим данные записи
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8081/api/appointments/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setClientId(res.data.client?._id || '');
          setSelectedServices(res.data.services.map((s) => s._id));
          setDate(new Date(res.data.date).toISOString().slice(0, 16)); // формат для datetime-local
        })
        .catch(() => setError('Ошибка загрузки данных записи'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        client: clientId,
        services: selectedServices,
        date,
      };
      if (isEdit) {
        await axios.put(
          `http://localhost:8081/api/appointments/${id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
      } else {
        await axios.post(`http://localhost:8081/api/appointments`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при сохранении записи');
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedServices((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value],
    );
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4" style={{ maxWidth: 700 }}>
      <h3>{isEdit ? 'Редактировать запись' : 'Новая запись'}</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Клиент</Form.Label>
          <Form.Select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="">Выберите клиента</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Услуги</Form.Label>
          {services.map((service) => (
            <Form.Check
              key={service._id}
              type="checkbox"
              label={`${service.name} (${service.price} ₸)`}
              value={service._id}
              checked={selectedServices.includes(service._id)}
              onChange={handleServiceChange}
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата и время</Form.Label>
          <Form.Control
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

export default AppointmentForm;
