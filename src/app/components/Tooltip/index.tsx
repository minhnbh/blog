import React, { ReactElement, useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Placement, Variant } from 'react-bootstrap/esm/types';
import classnames from 'classnames';
import { OverlayTriggerType } from 'react-bootstrap/esm/OverlayTrigger';
import { isUndefined } from 'lodash';

export interface ITooltipProps {
  show?: boolean;
  message?: string | ReactElement;
  placement?: Placement;
  variant?: Variant;
  className?: string;
  trigger?: OverlayTriggerType;
  children?: ReactElement;
}

const Tooltip: React.FC<ITooltipProps> = ({
  show: showProp,
  message = '',
  placement = 'top',
  children,
  variant = 'light',
  trigger,
  className
}) => {
  const [show, setShow] = useState<boolean | undefined>(
    showProp || !isUndefined(trigger)
  );

  useEffect(() => {
    setShow(showProp);
  }, [showProp]);

  return (
    <OverlayTrigger
      show={show}
      placement={placement}
      trigger={trigger}
      overlay={
        <Popover
          className={classnames(`br-radius-8 popover-${variant}`, className)}
          show={show}
          placement={placement}
        >
          <Popover.Body className={classnames(`fs-14`)}>{message}</Popover.Body>
        </Popover>
      }
    >
      <div>{children}</div>
    </OverlayTrigger>
  );
};

export default Tooltip;
