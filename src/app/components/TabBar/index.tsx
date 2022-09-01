import classNames from 'classnames';
import { isUndefined } from 'lodash';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane
} from 'react-bootstrap';

export interface TabBarProps {
  items?: TabBarItem[];
  activeIndex?: number;
  actionButtons?: ReactElement[];
  onChangeTab?: (id: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

export interface TabBarItem {
  id: string;
  label: string;
  component: ReactElement;
}

const TabBar: React.FC<TabBarProps> = ({
  items,
  activeIndex = 0,
  actionButtons,
  className,
  tabClassName,
  activeTabClassName,
  onChangeTab
}) => {
  const [activeTab, setActiveTab] = useState(items?.[activeIndex]);

  const handleChangeTab = useCallback(
    (tab: TabBarItem) => {
      setActiveTab(tab);
      onChangeTab && onChangeTab(tab.id);
    },
    [onChangeTab]
  );

  useEffect(() => {
    if (!isUndefined(items)) {
      setActiveTab(items[activeIndex]);
    }
  }, [activeIndex, items]);

  return (
    <TabContainer
      defaultActiveKey={`tab-${activeIndex || 0}`}
      activeKey={`tab-${activeIndex}`}
    >
      <div className="d-flex align-items-center flex-wrap flex-column-reverse flex-lg-row">
        <div className={classNames('mt-16 mt-lg-0 mr-auto')}>
          <Nav
            variant="pills"
            className={classNames('tab-bar flex-nowrap', className)}
          >
            {items?.map((item, index) => (
              <NavItem
                className={classNames('flex-fill')}
                key={index}
                onClick={() => {
                  handleChangeTab(item);
                }}
              >
                <NavLink
                  className={classNames(
                    'text-center text-lg-left',
                    tabClassName,
                    {
                      [`${activeTabClassName}`]: activeTab?.id === item.id
                    }
                  )}
                  eventKey={`tab-${index}`}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
        {actionButtons && (
          <div className="ml-auto">
            <div className="ml-auto d-flex flex-wrap justify-content-end action-buttons mt-n4">
              {actionButtons.map((btn, index) => (
                <div key={index} className="mt-8 ml-8">
                  {btn}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <TabContent className="mt-16">
        {items?.map((item, index) => (
          <TabPane key={`tab-pane-${index}`} eventKey={`tab-${index}`}>
            {item.component}
          </TabPane>
        ))}
      </TabContent>
    </TabContainer>
  );
};

export default TabBar;
