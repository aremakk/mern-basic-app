import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/clients', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setClients(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке клиентов', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [user.token]);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Клиенты</h3>
        <Button as={Link} to="/clients/new">+ Новый клиент</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Телефон</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client._id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>
        <Button
            as={Link}
            to={`/clients/${client._id}/edit`}
            size="sm"
            variant="outline-secondary"
        >
            ✏️
        </Button>
    </td>
            </tr>
          ))}
        </tbody>
        
      </Table>
      

    </Container>
  );
};

export default ClientList;
