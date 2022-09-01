import classes from 'app/utils/classes';
import React, {
  Fragment,
  ReactElement,
  useMemo,
  useState,
  useCallback
} from 'react';
import { FormLabel } from 'app/components';
import Select, {
  components,
  MenuListProps,
  ControlProps,
  StylesConfig,
  GroupBase
  // createFilter
} from 'react-select';
import makeAnimated from 'react-select/animated';
import { isString, isEmpty, isUndefined } from 'lodash';
import { selectStyles } from 'app/constants/common';
import Tooltip, { ITooltipProps } from '../Tooltip';
import classnames from 'classnames';
import parse from 'html-react-parser';
import { removeVietnameseTones } from 'app/helpers/stringValidate';

export type LabelType = string | ((option: MagicKeyValue) => React.ReactNode);

export interface ComboBoxProps {
  id?: string;
  label?: string;
  name?: string;
  required?: boolean;
  value?: any;
  options?: MagicKeyValue[];
  placeholder?: string;
  focus?: boolean;
  emptyMessage?: string;
  TextField?: LabelType;
  loading?: boolean;
  className?: string;
  isAsync?: boolean;
  MenuHeader?: ReactElement;
  MenuFooter?: ReactElement;
  error?: FormError;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyText?: string;
  tooltipProps?: ITooltipProps;
  styles?: StylesConfig<any, boolean, GroupBase<unknown>>;
  dataField?: string;
  onChange?: (value: any) => void;
  onChangeText?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const ComboBox: React.FC<ComboBoxProps> = props => {
  const {
    id,
    name,
    label,
    required,
    value: valueProp = '',
    options: optionsProp,
    placeholder = '',
    TextField = 'value',
    loading: loadingProp = false,
    emptyMessage = 'No Options',
    MenuHeader,
    MenuFooter,
    isAsync = false,
    error = {
      status: false,
      message: ''
    },
    className,
    disabled = false,
    readOnly = false,
    readOnlyText,
    tooltipProps,
    styles,
    onChange,
    onFocus,
    onBlur,
    onChangeText
  } = props;

  const { MenuList: MenuListBase, Control: ControlBase } = components;

  const [focus, setFocus] = useState(false);
  const [filterText, setFilterText] = useState('');

  const options = useMemo(() => {
    if (isString(TextField)) {
      return optionsProp?.filter(
        item =>
          removeVietnameseTones(item[TextField] || '')
            ?.toLowerCase()
            .indexOf(removeVietnameseTones(filterText).toLowerCase()) >= 0
      );
    }
    return optionsProp;
  }, [TextField, filterText, optionsProp]);

  const handleChange = (changeValue: any) => {
    setFilterText('');
    onChange && onChange(changeValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(false);
    onBlur && onBlur(e);
  };

  const LabelView = useMemo(
    () =>
      isString(TextField)
        ? (item: MagicKeyValue) => item[TextField]
        : TextField,
    [TextField]
  );

  const handleInputChange = (value: string) => {
    setFilterText(value);
    onChangeText && onChangeText(value);
  };

  const MenuList = useCallback(
    (props: MenuListProps) => (
      <Fragment>
        <div className="d-flex flex-column">
          <MenuListBase {...props}>
            {MenuHeader ? MenuHeader : null}
            {props.children}
            {MenuFooter ? MenuFooter : null}
          </MenuListBase>
        </div>
      </Fragment>
    ),
    [MenuFooter, MenuHeader, MenuListBase]
  );

  const Control = useCallback(
    (props: ControlProps) => (
      <ControlBase
        {...props}
        className={classnames({
          [classes.textBox.error]: error.status
        })}
      >
        {props.children}
      </ControlBase>
    ),
    [ControlBase, error.status]
  );

  const isShowTooltip = useMemo(() => {
    if (!isUndefined(tooltipProps)) return undefined;
    if (!error.status || isEmpty(error.message) || !focus) return false;
    return true;
  }, [error.message, error.status, focus, tooltipProps]);

  const selectComponents: Partial<any> = useMemo(
    () => ({
      ...makeAnimated(),
      MenuList,
      Control
    }),
    [Control, MenuList]
  );

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

  // const filterOption = createFilter({
  //   ignoreCase: false,
  //   ignoreAccents: false,
  //   trim: true,
  //   matchFrom: 'any'
  // })

  return (
    <div className={classnames(className)}>
      <Tooltip
        {...formatTooltipProps}
        className={classnames({
          'mb-n30': !isUndefined(label)
        })}
      >
        <div className={classnames(classes.comboBox.container)}>
          {label && (
            <FormLabel
              className={classes.textBox.label}
              required={required}
              readOnly={readOnly}
              readOnlyText={readOnlyText}
            >
              {label}
            </FormLabel>
          )}
          <div className={classes.comboBox.outline}>
            <Select
              isSearchable
              id={id}
              name={name}
              isClearable={false}
              isDisabled={disabled || readOnly}
              value={valueProp}
              isLoading={loadingProp}
              placeholder={placeholder}
              filterOption={isAsync ? () => true : null}
              styles={{ ...selectStyles, ...styles }}
              options={options}
              menuPortalTarget={document.body}
              components={selectComponents}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              formatOptionLabel={LabelView}
              onInputChange={handleInputChange}
              noOptionsMessage={() => <div>{emptyMessage}</div>}
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default ComboBox;
