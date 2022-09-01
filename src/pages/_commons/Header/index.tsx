import { Button } from 'app/components';
import {
  getAuthUser,
  removeAccessToken,
  removeAuthUser,
  removeRefreshToken
} from 'pages/Auth/helpers';
import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const profile = getAuthUser();

  const handleLogout = () => {
    removeAuthUser();
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/login';
  };

  return (
    <Navbar expand={true} fixed="top" className="header-navigation-container">
      <Container fluid>
        <Navbar.Brand className="flex-center justify-content-start ml-16">
          <Image src="images/logo192.png" />
          <div className="fs-20 fw-700 ml-8 color-primary-red">
            Trang quản trị
          </div>
        </Navbar.Brand>
        <Nav className="justify-content-end w-50">
          <div className="w-50 d-flex align-items-center justify-content-end">
            <Navbar.Text>{profile?.fullName}</Navbar.Text>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="mx-24"
            onClick={handleLogout}
          >
            <span className="mr-4 d-none d-lg-block">Đăng xuất</span>
            <FaSignOutAlt size={14} />
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
