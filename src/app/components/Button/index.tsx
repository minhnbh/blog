import classnames from 'classnames';
import { isFunction } from 'lodash';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { BtnVariants, BtnSizes } from './constant';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariants;
  size?: BtnSizes;
  loading?: boolean;
  disabled?: boolean;
  selected?: boolean;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    variant = 'default',
    size,
    loading,
    disabled,
    selected: selectedProps,
    children,
    onClick,
    className: classNameProp,
    id,
    ...props
  },
  ref
) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    isFunction(onClick) && onClick(event);
  };

  // provides ref
  useImperativeHandle(ref, () => buttonRef.current!);

  const className = useMemo(() => {
    const result = [`btn btn-${variant}`];
    if (size) result.push(`btn-${size}`);
    if (loading) result.push('loading loading-sm');
    if (variant.indexOf('icon-') === 0) {
      result.push(`btn-${variant.replace('icon-', '')}`);
    }
    return result;
  }, [loading, size, variant]);

  return (
    <button
      ref={buttonRef}
      disabled={loading || !!disabled}
      onClick={handleOnClick}
      id={id}
      className={classnames(className, classNameProp)}
      {...props}
    >
      {children}
    </button>
  );
};

export * from './constant';
export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
