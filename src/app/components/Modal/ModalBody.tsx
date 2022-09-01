import React, { useRef, useLayoutEffect } from 'react';
import ModalBodyBase from 'react-bootstrap/ModalBody';
import { ModalBodyProps } from './types';
import classnames from 'classnames';
import classes from 'app/utils/classes';
import SimpleBar from 'simplebar-react';

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  noPadding
}) => {
  const divContainerRef = useRef<HTMLDivElement | null>(null);
  const divContentRef = useRef<HTMLDivElement | null>(null);
  const { innerHeight } = window;

  useLayoutEffect(() => {
    if (!divContainerRef.current || !divContentRef.current) return;
    if (divContentRef.current.clientHeight <= innerHeight / 2) {
      divContainerRef.current.style.height = '100%';
      return;
    }
    divContainerRef.current.style.height = `${innerHeight / 2}px`;
  }, [innerHeight, children]);

  return (
    <ModalBodyBase className={classnames(classes.modal.body)}>
      <div ref={divContainerRef} className='flex-1'>
        <SimpleBar
          className={classnames(
            'px-24',
            {
              'p-0': noPadding
            },
            className
          )}
        >
          <div ref={divContentRef}>{children}</div>
        </SimpleBar>
      </div>
    </ModalBodyBase>
  );
};

export default ModalBody;
