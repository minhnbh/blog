import { uniqueId } from 'lodash';
import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  ReactNode
} from 'react';
import { Dropdown, Form } from 'react-bootstrap';

export interface IInlineDropdownItemProps {
  id?: string;
  name: string;
  checked?: boolean;
  value?: MagicKeyValue;
  suffix?: ReactElement;
  className?: string;
  children?: ReactNode;
}

const InlineDropdownItem: React.FC<IInlineDropdownItemProps> = props => {
  const { id, name, checked = false, suffix, className } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [suffixVisible, setSuffixVisible] = useState(false);

  const handleMouseOver = () => {
    setSuffixVisible(true);
  };
  const handleMouseOut = () => {
    setSuffixVisible(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('mouseenter', handleMouseOver);
      inputRef.current.addEventListener('mouseleave', handleMouseOut);
    }
  }, [inputRef]);

  return (
    <Dropdown.Item
      eventKey={name}
      {...props}
      ref={inputRef}
      className={className}
    >
      <Form.Check
        className="inline-dropdown py-0"
        type="checkbox"
        id={uniqueId(id)}
      >
        <Form.Check.Input
          type="checkbox"
          isValid
          className="cursor-pointer ml-0"
          checked={checked}
          onChange={e => {}}
        />
        <Form.Check.Label className="cursor-pointer d-flex">
          <span className="ml-12 inline-dropdown-label mr-auto">{name}</span>
          {suffix && suffixVisible ? suffix : null}
        </Form.Check.Label>
      </Form.Check>
    </Dropdown.Item>
  );
};

export default InlineDropdownItem;
