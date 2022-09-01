import { Dropdown } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import { MyDropdownProps } from './types';

type InlineDropdownToggleProps = {
  children?: React.ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
};

const CustomToggle = React.forwardRef(
  (props: InlineDropdownToggleProps, ref: React.Ref<HTMLButtonElement>) => (
    <button
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

type InlineDropdownMenuProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  labeledBy?: string;
};

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

const DropdownNice: React.FC<MyDropdownProps> = props => {
  const { data, label } = props;
  const [val, setVal] = useState(data[0]);
  // setVal(data[0])
  const handleOnClick = (param: any) => {
    setVal(param);
  };

  // handleOnClick(val);
  const listItems = data.map(d => (
    <Dropdown.Item
      className="overview dropdown item"
      key={d.id}
      onClick={() => handleOnClick(d)}
    >
      {d.name}
    </Dropdown.Item>
  ));
  return (
    <div className="d-flex align-items-center ml-50">
      <span className="overview dropdown label mt-0">{label}</span>
      <Dropdown className="ml-10">
        <Dropdown.Toggle as={CustomToggle} className="overview dropdown toggle">
          {val.name}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu} className="overview ml-10">
          {listItems}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownNice;
