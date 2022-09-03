import { IconButton } from 'app/components';
import useTranslation from 'app/hooks/useTranslation';
import classNames from 'classnames';
import { isArray } from 'lodash';
import React from 'react';
import { SOCIAL_LINKS, TOP_MENU_ROUTE } from './constants';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="header-default">
      <nav className="navbar navbar-expand-lg">
        <div className="container-xl">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {TOP_MENU_ROUTE.map((item, index) => (
                <li
                  key={item.key}
                  className={classNames('nav-item', {
                    active: index === 0,
                    dropdown: isArray(item.routes)
                  })}
                >
                  <a
                    href={isArray(item.routes) ? '#' : item.path}
                    className={classNames('nav-link', {
                      'dropdown-toggle': isArray(item.routes)
                    })}
                  >
                    {t(item.title)}
                  </a>
                  <ul className="dropdown-menu">
                    {item.routes &&
                      item.routes.map(childRoute => (
                        <li key={childRoute.key}>
                          <a className="dropdown-item" href={childRoute.path}>
                            {t(childRoute.title)}
                          </a>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="header-right">
            <ul className="social-icons list-unstyled list-inline mb-0">
              {SOCIAL_LINKS.map(item => (
                <li className="list-inline-item" key={item.key}>
                  <a href={item.link}>
                    <i className={item.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
            <div className="header-buttons">
              <IconButton name="icon-magnifier" />
              <IconButton name="burger-icon" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
