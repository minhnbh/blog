import React, { useCallback } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import {
  ADMIN_MAIN_NAVIGATION,
  IRoute,
  MAIN_NAVIGATION
} from 'routes/constants';
import SidebarMenuItem from './SidebarMenuItem';
import SimpleBar from 'simplebar-react';
import { isAdmin, isSuperAdmin } from 'pages/Auth/helpers';

const Sidebar: React.FC = () => {
  const SidebarMenuRender = useCallback(
    (routeData: IRoute[]) =>
      routeData.map(route => <SidebarMenuItem key={route.key} route={route} />),
    []
  );

  return (
    <div id="sidebar-menu">
      <SimpleBar>
        <div className="sidebar-menu">
          <Nav className="flex-column">
            <NavItem className="p-16">
              <span className="color-primary-red fs-20 d-none d-md-block fw-700">
                Danh mục
              </span>
            </NavItem>
            {SidebarMenuRender(
              isAdmin() || isSuperAdmin()
                ? ADMIN_MAIN_NAVIGATION
                : MAIN_NAVIGATION
            )}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
