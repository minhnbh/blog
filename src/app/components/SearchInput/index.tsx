import React, { ReactNode } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

export interface SearchInputProps {
  onSubmit?: (searchText: string) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({ prefix, suffix }) => {
  return (
    <Form className="search-input-container ml-24 mr-16 mb-16 mb-lg-0">
      <InputGroup>
        {prefix && (
          <InputGroup.Text className="search-input-prefix">
            {prefix}
          </InputGroup.Text>
        )}
        <FormControl
          className="search-input"
          placeholder="Search by account, token"
        />
        {suffix && (
          <InputGroup.Text className="search-input-suffix">
            {suffix}
          </InputGroup.Text>
        )}
      </InputGroup>
    </Form>
  );
};

export default SearchInput;
