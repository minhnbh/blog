import classNames from 'classnames';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';

export interface IOptionDropdownProps {
  options: any[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const OptionDropdown: React.FC<IOptionDropdownProps> = ({
  value,
  options,
  className,
  onChange
}) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (eventKey: string | null) => {
    if (eventKey === null) return;
    setSelected(eventKey);
    onChange && onChange(eventKey);
  };

  return (
    <div className={className}>
      <Dropdown onSelect={handleChange}>
        <Dropdown.Toggle
          className="bg-transparent border-none dial-code-dropdown-btn"
          id="language-dropdown"
        >
          <b className="mx-2 color-primary-red">{selected}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-white">
          <div className="combo-box-menu">
            <SimpleBar>
              {(options || []).map(item => (
                <Dropdown.Item
                  className={classNames({
                    selected: item === selected
                  })}
                  key={item}
                  eventKey={item}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </SimpleBar>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default OptionDropdown;
