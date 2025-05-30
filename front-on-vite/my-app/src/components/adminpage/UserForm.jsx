import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8081/api/users/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          console.log(res)
          setUsername(res.data.user.username);
          setEmail(res.data.user.email);
          setRole(res.data.user.role);
        })
        .catch((err) => { console.log(err)})
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isEdit) {
    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:8081/api/users/${id}`,
          { username, email, role },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );

      } else {
        await axios.post(
          `http://localhost:8081/api/users`,
          { username, email, role },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          },
        );
      }
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при сохранении услуги');
    }
  };}

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h3>{isEdit ? 'Редактировать юзера' : 'Новый юзер'}</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Юзернейм</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите юзернейм"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Роль</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Сохранить
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
