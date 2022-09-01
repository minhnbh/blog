import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IRoute } from 'routes/constants';

interface SidebarMenuItemProps {
  route: IRoute;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ route }) => {
  const { path, key, Icon, title } = route;
  return (
    <Nav.Link as={NavLink} to={path} eventKey={`sidebar-${key}`}>
      <div className="sidebar-menu-item">
        {Icon && <Icon />}
        <span className="fs-16 ml-12 btn-text">{title}</span>
      </div>
    </Nav.Link>
  );
};

export default SidebarMenuItem;
