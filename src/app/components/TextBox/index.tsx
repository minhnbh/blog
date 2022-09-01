import classes from 'app/utils/classes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import classnames from 'classnames';
import { isEmpty, isUndefined } from 'lodash';
import { FormLabel, Tooltip } from 'app/components';
import { ITooltipProps } from '../Tooltip';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import parse from 'html-react-parser';

export interface TextBoxProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  textBoxRequired?: boolean;
  readOnly?: boolean;
  readOnlyText?: string;
  disabled?: boolean;
  prefix?: React.ReactElement | string;
  suffix?: React.ReactElement | string;
  autoFocus?: boolean;
  className?: string;
  containerClassName?: string;
  error?: FormError;
  focus?: boolean;
  name?: string;
  type?: string;
  tooltipProps?: ITooltipProps;
  minLength?: number;
  maxLength?: number;
  showHidePassword?: boolean;
  as?: React.ElementType;
  rows?: number;
  regex?: RegExp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
  (
    {
      label,
      name,
      value: valueProp,
      placeholder = '',
      required = false,
      textBoxRequired = false,
      readOnly = false,
      readOnlyText,
      disabled = false,
      autoFocus,
      error = {
        status: false,
        message: ''
      },
      prefix,
      suffix,
      className = '',
      containerClassName,
      focus = false,
      type,
      tooltipProps,
      showHidePassword = type === 'password',
      as,
      onChange,
      onClick,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(valueProp || '');
    const [isFocus, setIsFocus] = useState(autoFocus || focus);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const textBoxType = useMemo(() => {
      if (type !== 'password') return type;
      if (isShowPassword) return 'text';
      return 'password';
    }, [isShowPassword, type]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newValue } = e.target;
        setValue(newValue);
        onChange && onChange(e);
      },
      [onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onClick && onClick();
        onFocus && onFocus(e);
        setIsFocus(true);
      },
      [onClick, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e);
        setIsFocus(false);
      },
      [onBlur]
    );

    useEffect(() => {
      setValue(valueProp || '');
    }, [valueProp]);

    const isShowTooltip = useMemo(() => {
      if (!isUndefined(tooltipProps)) return undefined;
      if (!error.status || isEmpty(error.message) || !isFocus) return false;
      return true;
    }, [error.message, error.status, isFocus, tooltipProps]);

    const formatTooltipProps = useMemo<ITooltipProps>(
      () => ({
        ...tooltipProps,
        show: isShowTooltip,
        message: (
          <div>{parse((tooltipProps?.message || error.message) as string)}</div>
        ),
        variant: tooltipProps?.variant || 'danger',
        placement: tooltipProps?.placement || 'top-start'
      }),
      [error.message, isShowTooltip, tooltipProps]
    );

    const showHidePasswordView = useMemo(
      () => (
        <span
          className="cursor-pointer mr-8"
          onClick={_ => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      ),
      [isShowPassword]
    );

    return (
      <div className={classnames(containerClassName)}>
        <Tooltip
          {...formatTooltipProps}
          className={classnames({
            'mb-n30': !isUndefined(label)
          })}
        >
          <FormGroup
            className={classnames({
              [classes.textBox.container]: true,
              [classes.textBox.focus]: isFocus
            })}
          >
            {label && (
              <FormLabel
                required={textBoxRequired ? textBoxRequired : required}
                readOnly={readOnly}
                readOnlyText={readOnlyText}
              >
                {label}
              </FormLabel>
            )}
            <InputGroup>
              {prefix && (
                <InputGroup.Text
                  className={classnames(
                    classes.textBox.prefix,
                    'fs-14 fw-500',
                    {
                      [classes.textBox.error]: error.status,
                      [classes.textBox.readOnly]: readOnly
                    }
                  )}
                >
                  {prefix}
                </InputGroup.Text>
              )}
              <FormControl
                ref={ref}
                {...props}
                className={classnames(
                  {
                    [classes.textBox.input]: true,
                    [classes.textBox.hasPrefix]: !isUndefined(prefix),
                    [classes.textBox.hasSuffix]:
                      !isUndefined(suffix) || showHidePassword,
                    [classes.textBox.error]: error.status,
                    [classes.textBox.readOnly]: readOnly
                  },
                  className
                )}
                as={as}
                readOnly={readOnly}
                placeholder={placeholder}
                required={textBoxRequired ? textBoxRequired : required}
                disabled={disabled}
                autoFocus={isFocus}
                value={value}
                name={name}
                type={textBoxType}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {suffix && (
                <InputGroup.Text
                  className={classnames(
                    classes.textBox.suffix,
                    'fs-14 fw-500',
                    {
                      [classes.textBox.error]: error.status,
                      [classes.textBox.readOnly]: readOnly
                    }
                  )}
                >
                  {suffix}
                </InputGroup.Text>
              )}
              {showHidePassword && (
                <InputGroup.Text
                  className={classnames(
                    classes.textBox.suffix,
                    'fs-14 fw-500',
                    {
                      [classes.textBox.error]: error.status,
                      [classes.textBox.readOnly]: readOnly
                    }
                  )}
                >
                  {showHidePasswordView}
                </InputGroup.Text>
              )}
            </InputGroup>
          </FormGroup>
        </Tooltip>
      </div>
    );
  }
);

export default TextBox;
