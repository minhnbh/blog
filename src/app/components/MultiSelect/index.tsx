import classes from 'app/utils/classes';
import React, { Fragment, ReactElement, useMemo, useState } from 'react';
import { FormLabel, Tooltip } from 'app/components';
import Select, {
  components,
  MenuListProps,
  MultiValueRemoveProps
} from 'react-select';
import makeAnimated from 'react-select/animated';
import { includes, isEmpty, isString, isUndefined } from 'lodash';
import { selectStyles } from 'app/constants/common';
import Icon from '../Icon';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { ITooltipProps } from '../Tooltip';
import parse from 'html-react-parser';
import classNames from 'classnames';

export type LabelType = string | ((option: MagicKeyValue) => React.ReactNode);

export interface MultiSelectProps {
  id?: string;
  label?: string;
  name?: string;
  required?: boolean;
  value?: MagicKeyValue;
  options?: MagicKeyValue[];
  placeholder?: string;
  focus?: boolean;
  emptyMessage?: string;
  TextField?: LabelType;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: MagicKeyValue[]) => void;
  onChangeText?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  MenuHeader?: ReactElement;
  MenuFooter?: ReactElement;
  tooltipProps?: ITooltipProps;
  error?: FormError;
  dataField?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = props => {
  const {
    id,
    name,
    label,
    required,
    value: valueProp,
    options: optionsProp,
    placeholder = '',
    TextField = 'value',
    loading,
    emptyMessage = 'Không có dữ liệu',
    MenuHeader,
    MenuFooter,
    focus,
    tooltipProps,
    disabled,
    error = {
      status: false,
      message: ''
    },
    className,
    onChange,
    onFocus,
    onBlur,
    onChangeText
  } = props;

  const [filterText, setFilterText] = useState('');

  const handleChange = (changeValue: any) => {
    onChange && onChange(changeValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur && onBlur(e);
  };

  const handleInputChange = (value: string) => {
    setFilterText(value);
    onChangeText && onChangeText(value);
  };

  const LabelView = useMemo(
    () =>
      isString(TextField)
        ? (item: MagicKeyValue) => item[TextField]
        : TextField,
    [TextField]
  );

  const filterOptions = (
    option: FilterOptionOption<any>,
    inputValue: string
  ) => {
    const optionText = isString(TextField)
      ? String(option.data[TextField]).toLowerCase()
      : TextField(option)
          ?.toString()
          .replace(/(<([^>]+)>)/gi, '')
          .toLowerCase();
    return includes(optionText, inputValue.toLowerCase());
  };

  const MenuList = (props: MenuListProps) => {
    return (
      <Fragment>
        <div className="d-flex flex-column">
          <components.MenuList {...props}>
            {MenuHeader ? MenuHeader : null}
            {props.children}
            {MenuFooter ? MenuFooter : null}
          </components.MenuList>
        </div>
      </Fragment>
    );
  };

  const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
      <Fragment>
        <components.MultiValueRemove {...props}>
          <Icon name="close" className="multi-select-close" />
        </components.MultiValueRemove>
      </Fragment>
    );
  };

  const options = useMemo(() => {
    if (isString(TextField)) {
      return optionsProp?.filter(
        item =>
          item[TextField]?.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      );
    }
    return optionsProp;
  }, [TextField, filterText, optionsProp]);

  const isShowTooltip = useMemo(() => {
    if (!isUndefined(tooltipProps)) return undefined;
    if (!error.status || isEmpty(error.message) || !focus) return false;
    return true;
  }, [error.message, error.status, focus, tooltipProps]);

  const formatTooltipProps = useMemo<ITooltipProps>(
    () => ({
      ...tooltipProps,
      show: isShowTooltip,
      message: (
        <div>{parse((tooltipProps?.message || error.message) as string)}</div>
      ),
      variant: tooltipProps?.variant || 'danger',
      placement: tooltipProps?.placement || 'top-start',
      trigger: tooltipProps ? 'hover' : undefined
    }),
    [error.message, isShowTooltip, tooltipProps]
  );

  return (
    <Tooltip
      {...formatTooltipProps}
      className={classNames({
        'mb-n30': !isUndefined(label)
      })}
    >
      <div className={classNames(classes.comboBox.container, className)}>
        {label && (
          <FormLabel className={classes.textBox.label} required={required}>
            {label}
          </FormLabel>
        )}
        <div className={classes.comboBox.outline}>
          <Select
            isMulti
            isSearchable
            id={id}
            name={name}
            isDisabled={disabled}
            isClearable={false}
            value={valueProp}
            isLoading={loading}
            placeholder={placeholder}
            closeMenuOnSelect={false}
            components={{
              ...makeAnimated(),
              MenuList,
              MultiValueRemove
            }}
            options={options}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            filterOption={filterOptions}
            formatOptionLabel={LabelView}
            onInputChange={handleInputChange}
            styles={selectStyles}
            menuPortalTarget={document.body}
            noOptionsMessage={() => <div>{emptyMessage}</div>}
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default MultiSelect;
