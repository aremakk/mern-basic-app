import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ClientPanel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/appointments">
                  Записи
                </Nav.Link>
                <Nav.Link as={Link} to="/clients">
                  Клиенты
                </Nav.Link>
                <Nav.Link as={Link} to="/services">
                  Услуги
                </Nav.Link>
                {user && user.user.role === 'admin' && (
                  <Nav.Link as={Link} to="/users">
                    Пользователи
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown title={user.name || user.email} align="end">
                <NavDropdown.Item onClick={handleLogout}>
                  Выйти
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                Войти
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
