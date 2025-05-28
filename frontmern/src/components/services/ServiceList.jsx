import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false)

  

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/services', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error('Ошибка при загрузке услуг:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsAdmin(user.user.role == 'admin')
    fetchServices();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner /></div>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Услуги</h3>
        {isAdmin && (
          <Button as={Link} to="/services/new">+ Новая услуга</Button>
        )}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Цена</th>
            {isAdmin && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service._id}>
              <td>{index + 1}</td>
              <td>{service.name}</td>
              <td>{service.price} ₸</td>
              {isAdmin && (
                <td>
                  <Button
                    as={Link}
                    to={`/services/${service._id}/edit`}
                    size="sm"
                    variant="outline-secondary"
                  >
                    ✏️
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ServiceList;
