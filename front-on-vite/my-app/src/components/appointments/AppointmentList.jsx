import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/appointments', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(res)
      setAppointments(res.data);
    } catch (err) {
      console.error('Ошибка загрузки записей:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту запись?')) return;

    try {
      await axios.delete(`http://localhost:8081/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAppointments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Ошибка при удалении:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Записи</h3>
        <Button as={Link} to="/appointments/new">
          + Новая запись
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Клиент</th>
            <th>Услуги</th>
            <th>Дата</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr key={appt._id}>
              <td>{idx + 1}</td>
              <td>{appt.client?.name || '—'}</td>
              <td>{appt.services.map((s) => s.name).join(', ')}</td>
              <td>{new Date(appt.date).toLocaleString()}</td>
              <td>
                <Button
                  as={Link}
                  to={`/appointments/${appt._id}/edit`}
                  size="sm"
                  variant="outline-secondary"
                  className="me-2"
                >
                  ✏️
                </Button>
                <Button variant="danger" onClick={() => handleDelete(appt._id)}>
                  Удалить
                </Button>
                {/* Удаление можно добавить позже */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AppointmentList;
