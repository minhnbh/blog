import classnames from 'classnames';
import React, { useImperativeHandle } from 'react';
import { HTMLAttributes, useRef } from 'react';
import { IconNames } from './constants';

export interface IconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'size'> {
  name: IconNames;
  color?: string;
}

const Icon: React.RefForwardingComponent<HTMLSpanElement, IconProps> = (
  { name, className, color, id, ...props },
  ref
) => {
  const iconRef = useRef<HTMLSpanElement | null>(null);
  useImperativeHandle(ref, () => iconRef.current!);

  return (
    <span
      ref={iconRef}
      id={id}
      className={classnames(
        `ico ico-${name}`,
        color && `color-${color}`,
        className
      )}
      {...props}
    ></span>
  );
};

export * from './constants';
export default React.forwardRef<HTMLSpanElement, IconProps>(Icon);
