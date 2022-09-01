import React, { useCallback } from 'react';
import uniqueId from 'lodash/uniqueId';
import { DropdownMenuProps, MenuItem } from './types';
import { Dropdown, Form } from 'react-bootstrap';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ groupMenu, hiddenColumns }) => {

  const handleOnShow = useCallback(
    (menuItem: MenuItem) => {
      if (hiddenColumns && hiddenColumns?.includes(menuItem.keyEvent)) {
        return false;
      }
      return true;
    },
    [hiddenColumns],
  )

  const handleOnChange = (menuItem: MenuItem) => {
    (menuItem.onClick) && menuItem.onClick(menuItem.keyEvent);
  }

  groupMenu.menus.map((menuItem, index) => {
    if (groupMenu.multipleChoice) {
      return (
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
      );
    } else {
      
    }
  });
  return <></>;
};

export default DropdownMenu;
