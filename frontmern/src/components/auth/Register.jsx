import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/auth/register', {
        name,
        username,
        email,
        password,
      });
      login(res.data); // { token, user info... }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Регистрация</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        

        <Button variant="success" type="submit" className="w-100">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
