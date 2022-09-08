import React, { ReactNode } from 'react';
import Header from 'pages/_commons/Header';
// import Sidebar from 'pages/_commons/Sidebar';
import { Outlet } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';

interface IMainLayoutProps {
  className?: string;
  children?: ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ className, children }) => {
  return (
    <div className={classnames('h-100', className)}>
      <Header />
      <div className="flex-1">
        <SimpleBar>
          <div className="px-8 pb-8 pt-24">{children}</div>
          <Outlet />
        </SimpleBar>
      </div>
    </div>
  );
};

export default MainLayout;
