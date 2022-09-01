import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Icon from '../../../app/components/Icon';
import {
  InlineDropdownMenuProps,
  InlineDropdownToggleProps,
  GroupMenu,
  MenuItem,
  TableDropdownProps
} from './types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';

const CustomToggle = React.forwardRef(
  (props: InlineDropdownToggleProps, ref: React.Ref<HTMLButtonElement>) => (
    <button
      ref={ref}
      className={props.className}
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </button>
  )
);

const CustomMenu = React.forwardRef(
  (props: InlineDropdownMenuProps, ref: React.Ref<HTMLDivElement>) => {
    const [value] = useState('');
    return (
      <div
        ref={ref}
        style={props.style}
        className={props.className}
        aria-labelledby={props.labeledBy}
      >
        {React.Children.toArray(props.children).filter(
          (child: any) =>
            !value || child.props.children.toLowerCase().startsWith(value)
        )}
      </div>
    );
  }
);

const TableDropdown: React.FC<TableDropdownProps> = ({
  size = 'small',
  toggleChildren,
  dropdownHeaderTitle,
  groupMenus,
  autoClose,
  toggleClassName,
  align,
  columnId,
  hiddenColumns,
  onClick
}) => {
  const [localGroupMenus, setLocalGroupMenus] =
    useState<GroupMenu[]>(groupMenus);
  const [localHiddenColumns, setLocalHiddenColumns] = useState<string[]>(
    hiddenColumns || []
  );
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setLocalGroupMenus(groupMenus);
    setLocalHiddenColumns(hiddenColumns || []);
  }, [groupMenus, isShow, hiddenColumns]);

  const handleApply = () => {
    onClick && onClick(localHiddenColumns);
  };

  const handleOnClick = (menuItem: MenuItem) => {
    if (!menuItem.onClick) return;
    if (columnId) {
      menuItem.onClick(columnId);
    } else {
      menuItem.onClick('');
    }
  };

  const handleOnShow = useCallback(
    (menuItem: MenuItem) => {
      if (
        localHiddenColumns &&
        localHiddenColumns?.includes(menuItem.keyEvent)
      ) {
        return false;
      }
      return true;
    },
    [localHiddenColumns]
  );

  const handleShowOrHideColumn = (columnId: string) => {
    let tmpHiddenColumns = [...localHiddenColumns];
    if (localHiddenColumns.includes(columnId)) {
      tmpHiddenColumns = tmpHiddenColumns.filter(_v => _v != columnId);
    } else {
      tmpHiddenColumns.push(columnId);
    }
    setLocalHiddenColumns(tmpHiddenColumns);
  };

  const handleOnChange = (menuItem: MenuItem) => {
    handleShowOrHideColumn(menuItem.keyEvent);
  };

  const onToggle = (nextShow: boolean) => {
    setIsShow(nextShow);
  };

  const GenerateMenuContent = localGroupMenus.map(
    (groupMenu, i, groupMenus) => (
      <React.Fragment key={uniqueId(`group-menu-${i}`)}>
        {groupMenu?.groupTitle && (
          <Dropdown.Header
            className="group-menu__title px-14"
            key={uniqueId(`group-menu-${i}-`)}
          >
            {groupMenu.groupTitle.toUpperCase()}
          </Dropdown.Header>
        )}
        {groupMenu.menus.map((menuItem, index) =>
          groupMenu?.multipleChoice ? (
            <div
              className="menu-item__form"
              key={uniqueId(`menu-item__form-${index}-`)}
            >
              <Form.Check type="checkbox">
                <Form.Check.Input
                  type="checkbox"
                  isValid
                  checked={handleOnShow(menuItem)}
                  onChange={() => handleOnChange(menuItem)}
                />
                <Form.Check.Label>
                  <span className="ml-12">{menuItem.label}</span>
                </Form.Check.Label>
              </Form.Check>
            </div>
          ) : (
            <Dropdown.Item
              className="menu-item__label px-14"
              key={uniqueId(`menu-item-${index}-`)}
              eventKey={menuItem.keyEvent}
              icon={menuItem.icon}
              onClick={() => handleOnClick(menuItem)}
            >
              {menuItem?.icon && (
                <Icon key={uniqueId(`icon-${index}-`)} name={menuItem.icon} />
              )}
              <span className="ml-6">{menuItem.label}</span>
            </Dropdown.Item>
          )
        )}
        {groupMenus.length > 1 && i + 1 !== groupMenus.length && (
          <Dropdown.Divider key={uniqueId(`hr-${i}-`)} />
        )}
        {onClick && (
          <button className="btn btn-apply float-end" onClick={handleApply}>
            Apply
          </button>
        )}
      </React.Fragment>
    )
  );

  return (
    <Dropdown onToggle={onToggle} align={align} autoClose={autoClose}>
      <Dropdown.Toggle as={CustomToggle} className={toggleClassName}>
        {toggleChildren}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={classnames(
          {
            'table-dropdown__menu': true,
            medium: size === 'medium'
          },
          'px-0'
        )}
        as={CustomMenu}
      >
        {dropdownHeaderTitle && (
          <>
            <Dropdown.Header
              className={classnames({
                header__title: true,
                'text-center': size === 'medium'
              })}
            >
              {dropdownHeaderTitle}
            </Dropdown.Header>
            <Dropdown.Divider />
          </>
        )}
        {GenerateMenuContent}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TableDropdown;
