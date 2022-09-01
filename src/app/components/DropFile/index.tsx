import { COLORS } from 'app/constants/common';
import classNames from 'classnames';
import { isArray, isEmpty, isUndefined } from 'lodash';
import If from 'pages/_commons/If';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Image } from 'react-bootstrap';
import { DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { FaFileUpload, FaTimes } from 'react-icons/fa';
import Button from '../Button';
import FormLabel from '../FormLabel';

export interface IDropFile extends DropzoneOptions {
  label?: string;
  value?: File;
  containerClassName?: string;
  onError?: (files: FileRejection[]) => void;
  onDelete?: () => void;
  children?: ReactNode;
}

const DropFile: React.FC<IDropFile> = ({
  onError,
  onDelete,
  children,
  value,
  label,
  containerClassName,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [selected, setSelected] = useState<File | undefined>(value);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    ...props,
    onDrop: (files, fileRejections, event) => {
      props.onDrop && props.onDrop(files, fileRejections, event);
      setSelected(files[0]);
    }
  });

  useEffect(() => {
    if (!isEmpty(fileRejections)) {
      onError && onError(fileRejections);
    }
  }, [fileRejections, onError]);

  useEffect(() => {
    if (!imgRef.current || !selected) return;
    imgRef.current.style.height = `${(imgRef.current.clientWidth / 21) * 9}px`;
    imgRef.current.style.objectFit = 'cover';
  }, [selected]);

  const image = useMemo(
    () => (selected ? window.URL.createObjectURL(selected as any) : undefined),
    [selected]
  );

  const handleDelete = () => {
    setSelected(undefined);
    onDelete && onDelete();
  };

  return (
    <div className={classNames(containerClassName)}>
      <If condition={!isUndefined(label)}>
        <FormLabel>{label}</FormLabel>
      </If>
      <div className="position-relative">
        <If condition={isUndefined(selected)}>
          <div {...getRootProps({ className: 'dropzone br-radius-8' })}>
            <input {...getInputProps()} />
            <FaFileUpload size={32} color={COLORS.GRAY_L01} />
            <h5 className="mt-24">
              Kéo và thả file tại đây hoặc bấm vào để chọn file
            </h5>
            <div className="fs-14 color-gray-l01 fst-italic text-center mt-16">
              <If condition={!isUndefined(props.maxSize)}>
                Kích thước tối đa: {props.maxSize! / 1024000}MB
              </If>
              <br />
              <If condition={!isUndefined(props.accept)}>
                Loại file:&nbsp;
                {isArray(props.accept) ? props.accept.join(', ') : props.accept}
              </If>
            </div>
            {children}
          </div>
        </If>
        <If condition={!isUndefined(selected)}>
          <Image ref={imgRef} src={image} width="100%" rounded={true} />
          <Button
            className="position-absolute-top-end"
            variant="icon-secondary"
            size="sm"
            onClick={handleDelete}
          >
            <FaTimes />
          </Button>
        </If>
      </div>
    </div>
  );
};

export default DropFile;
