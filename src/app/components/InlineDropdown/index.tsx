import { Dropdown } from 'react-bootstrap';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef
} from 'react';
import { useState } from 'react';
import {
  InlineDropdownProps,
  InlineDropdownMenuProps,
  InlineDropdownToggleProps
} from './types';
import SimpleBar from 'simplebar-react';
import { isEmpty, isUndefined, uniqueId } from 'lodash';
import { InlineDropdownItem } from '..';

const InlineDropdownToggle = React.forwardRef(
  (
    { onClick, className, children }: InlineDropdownToggleProps,
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <button
      className={className}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </button>
  )
);

const InlineDropdown: React.FC<InlineDropdownProps> = ({
  label,
  values: valuesProp,
  children,
  autoClose,
  dataField = 'name',
  allowAll = true,
  footer = null,
  onChange
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isToggle, setIsToggle] = useState(false);
  const optionLength = React.Children.toArray(children).length;
  const allOptions = React.Children.toArray(children).map(
    (item: any) => item.props.value
  );
  const [values, setValues] = useState(valuesProp);
  const isSelectedAll = useMemo(
    () => values?.length === optionLength,
    [optionLength, values?.length]
  );

  useEffect(() => {
    setValues(valuesProp);
  }, [valuesProp]);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (divRef.current && divRef.current.clientHeight > 300) {
        divRef.current.style.height = '300px';
      }
    }, 0);
  }, [isToggle, values]);

  const labelView = useMemo(() => {
    if (isUndefined(values) || isEmpty(values)) return '';
    if (values.length === 1) return values[0].name;
    if (isSelectedAll) return 'All';
    return `${values.length} of ${optionLength}`;
  }, [isSelectedAll, optionLength, values]);

  const handleSelect = useCallback(
    (selected: MagicKeyValue) => {
      let newValue = values;
      if (selected.id === 'All') {
        if (isSelectedAll) {
          newValue = [];
        } else {
          newValue = allOptions;
        }
        setValues(newValue);
        return;
      }
      if (values?.find(item => item.id === selected.id)) {
        newValue = values.filter(item => item.id !== selected.id);
      } else {
        newValue = values ? [...values, selected] : [selected];
      }
      setValues(newValue);
    },
    [allOptions, isSelectedAll, values]
  );

  const AllItem = useMemo(() => {
    if (!allowAll) return null;
    return (
      <div onClick={() => handleSelect({ id: 'All' })}>
        <InlineDropdownItem
          id={uniqueId('item-all')}
          name="All"
          checked={isSelectedAll}
          value={{ id: 'All' }}
          className="dropdown-checkbox-item"
        />
      </div>
    );
  }, [allowAll, handleSelect, isSelectedAll]);

  const InlineDropdownMenu = React.forwardRef(
    (menuProps: InlineDropdownMenuProps, ref: React.Ref<HTMLDivElement>) => {
      const [value] = useState('');
      const { style, className, labeledBy, children } = menuProps;

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value || child.children.toLowerCase().startsWith(value)
          )}
        </div>
      );
    }
  );

  const handleToggle = useCallback(
    (nextShow: boolean) => {
      setIsToggle(nextShow);
      if (!nextShow) {
        onChange && onChange(values || []);
      }
    },
    [onChange, values]
  );

  return (
    <div className="d-flex align-items-center ml-50">
      <span className="overview dropdown label mt-0">{label}</span>
      <Dropdown autoClose={autoClose} className="ml-10" onToggle={handleToggle}>
        <Dropdown.Toggle
          as={InlineDropdownToggle}
          className="overview dropdown toggle"
        >
          {labelView}
        </Dropdown.Toggle>
        <Dropdown.Menu
          as={InlineDropdownMenu}
          className="overview ml-10"
          renderOnMount={true}
        >
          <div ref={divRef}>
            <SimpleBar>
              {AllItem}
              {React.Children.toArray(children).map((item: any) =>
                React.cloneElement(item, {
                  ...item.props,
                  onClick: () => {
                    handleSelect(item.props.value);
                  },
                  checked: values?.includes(item.props.value)
                })
              )}
            </SimpleBar>
          </div>
          {footer ? <Dropdown.Item>{footer}</Dropdown.Item> : null}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default InlineDropdown;
