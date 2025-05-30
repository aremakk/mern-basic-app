import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/users', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError(err.response.data.error);
        setShow(true);
        console.error('Ошибка при загрузке клиентов', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить пользователя?')) return;

    try {
      await axios
        .delete(`http://localhost:8081/api/users/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then(() => {
          setUsers((prev) => prev.filter((item) => item._id !== id));
        });
    } catch (err) {
      setError(err.response?.data.error);
      setShow(true);
      console.log(err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Пользователи</h3>
        <Button as={Link} to="/users/new">
          + Новый пользователь
        </Button>
      </div>
      {show && (
        <Alert
          variant="danger"
          onClose={() => {
            setShow(false);
          }}
          dismissible
        >
          <Alert.Heading>Упс! ошибочка вышла...</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Юзернейм</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Действия</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  as={Link}
                  to={`/users/${user._id}/edit`}
                  size="sm"
                  variant="outline-secondary"
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
